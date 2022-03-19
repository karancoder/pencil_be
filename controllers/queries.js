import Questions from "../models/question.js";
import Topics from "../models/topic.js";

async function getQuestions(prefixForPrint, topic) {
    let questionsSet = new Set();
    const topicItems = await Topics.find({ annotation: topic });
    console.log(prefixForPrint + topic);
    for await (const item of topicItems) {
        for await (const annotats of item.childAnnotations) {
            if (annotats.length > 0) {
                let childQuestionsSet = await getQuestions(
                    prefixForPrint + "---",
                    annotats
                );
                questionsSet = new Set([...questionsSet, ...childQuestionsSet]);
            }
        }
    }
    const questionItems = await Questions.find({ annotations: topic });
    for await (const item of questionItems) {
        questionsSet.add(item.questionNumber);
    }
    return questionsSet;
}

export function get_questions_from_topics(req, res) {
    console.log(req.params.q);
    getQuestions("", req.params.q)
        .then((result) => {
            res.status(200).json({ ok: true, questionsList: [...result] });
            console.log([...result]);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(501);
        });
}
