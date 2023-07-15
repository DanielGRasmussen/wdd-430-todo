const mongoose = require("mongoose");

const sequenceSchema = mongoose.Schema({
	maxTodoId: { type: Number, required: true },
});

module.exports = mongoose.model("Sequence", sequenceSchema);
