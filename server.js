const express = require("express")

const mongo = require("mongodb").MongoClient


function connectAndFetchDBs(){
    const url = "mongodb+srv://pencil_be:pencil_be@pencilbeproject.8wvex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    let db, questions, topics;
    console.log("Connecting to MongoDB...");
    mongo.connect(
        url,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        (err, client) => {
            if (err) {
                console.error(err)
                return
            }
            db = client.db("pencil_be")
            questions = db.collection("questions")
            topics = db.collection("topics")
        }
    );
    const app = express()
    app.use(express.json());

    app.get("/question", (req, res) => {
        questions.find().toArray((err, items) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ questionList: items })
        })
    })

    app.get("/question/:q", (req, res) => {
        console.log(parseInt(req.params.q))
        questions.find({ questionNumber : parseInt(req.params.q) }).toArray((err, items) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ questionList: items })
        })
    })

    async function getQuestions(prefixForPrint, topic) {
        let questionsSet = new Set()
        const dbTopicsResults = await topics.find({ annotation : topic })
        items = await dbTopicsResults.toArray()
        console.log(prefixForPrint + topic)
        for await (const item of items) {
            for await (const annotats of item.childAnnotations) {
                if (annotats.length > 0) {
                    childQuestionsSet = await getQuestions(prefixForPrint + "---", annotats)
                    questionsSet = new Set([...questionsSet, ...childQuestionsSet])
                }
            }
        }
        const dbQuestionsResults = await questions.find({ annotations : topic })
        items = await dbQuestionsResults.toArray()
        for await (const item of items) {
            await questionsSet.add(item.questionNumber)
        }
        return questionsSet
    }

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get("/search/:q", (req, res) => {
        console.log(req.params.q)
        getQuestions("", req.params.q).then((result) => {
            res.status(200).json({ ok: true , questionsList: [...result] });
            console.log([...result])
        }).catch(err => {
            console.log(err);
            res.sendStatus(501);
        });
    })

    app.get("/topic", (req, res) => {
        topics.find().toArray((err, items) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ topics: items })
        })
    })

    app.post("/question", (req, res) => {
        const question_number = parseInt(req.body.question_number)
        const annotations = req.body.annotations
        questions.insertOne({ questionNumber: question_number, annotations: annotations }, (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log(result)
            res.status(200).json({ ok: true })
        })
    })

    app.post("/topic", (req, res) => {
        const annotation = req.body.annotation
        const children_annotations = req.body.childAnnotations
        topics.insertOne({ annotation: annotation, childAnnotations: children_annotations }, (err, result) => {
            if (err) {
                console.error(err)
                res.status(500).json({ err: err })
                return
            }
            console.log(result)
            res.status(200).json({ ok: true })
        })
    })

    app.listen(process.env.PORT || 3000, () => console.log("Server ready"))
}

connectAndFetchDBs()

