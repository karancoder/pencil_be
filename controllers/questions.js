import Questions from "../models/question.js";

export function get_questions(req, res) {
    Questions.find(function (err, items) {
        if (err) {
            console.log(err);
            res.status(500).json({ err: err });
            return;
        } else {
            console.log("questionList: ", items);
            res.status(200).json({ questionList: items });
        }
    });
}

export function post_question(req, res) {
    const question_number = parseInt(req.body.question_number);
    const annotations = req.body.annotations;
    let newQuestion = new Questions({
        questionNumber: question_number,
        annotations: annotations,
    });
    newQuestion.save(function (err) {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }
    });
    console.log("Created quesiton: ", newQuestion);
    res.status(200).json({ ok: true });
}

export function get_question(req, res) {
    console.log(parseInt(req.params.q));
    Questions.find(
        { questionNumber: parseInt(req.params.q) },
        function (err, items) {
            if (err) {
                console.log(err);
                res.status(500).json({ err: err });
                return;
            } else {
                console.log("questionList: ", items);
                res.status(200).json({ questionList: items });
            }
        }
    );
}
