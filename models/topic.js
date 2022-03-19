import pkg from "mongoose";
const { Schema: _Schema, model } = pkg;
var Schema = _Schema;

var TopicSchema = new Schema({
    annotation: { type: String },
    childAnnotations: [{ type: String }],
});

export default model("Topics", TopicSchema);
