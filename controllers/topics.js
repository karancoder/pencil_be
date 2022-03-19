import Topics from "../models/topic.js";

export function get_topics(req, res) {
    Topics.find(function (err, items) {
        if (err) {
            console.log(err);
            res.status(500).json({ err: err });
            return;
        } else {
            console.log("topicsList: ", items);
            res.status(200).json({ topicsList: items });
        }
    });
}

export function post_topic(req, res) {
    const annotation = req.body.annotation;
    const children_annotations = req.body.childAnnotations;
    let newTopic = new Topics({
        annotation: annotation,
        childAnnotations: children_annotations,
    });
    newTopic.save(function (err) {
        if (err) {
            res.status(500).json({ err: err });
            return;
        }
    });
    console.log("Created topic: ", newTopic);
    res.status(200).json({ ok: true });
}

export function get_topic(req, res) {
    Topics.find({ annotation: parseInt(req.params.q) }, function (err, items) {
        if (err) {
            console.log(err);
            res.status(500).json({ err: err });
            return;
        } else {
            console.log("topic: ", items);
            res.status(200).json({ topic: items });
        }
    });
}
