import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
var Schema = _Schema;

var QuestionSchema = new Schema({
    questionNumber: { type: String },
    annotations: [{ type: String }],
});

export default model("Questions", QuestionSchema);
