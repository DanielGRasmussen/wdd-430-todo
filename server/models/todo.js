const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	id: { type: String, required: true },
	title: { type: String, required: true },
	description: { type: String },
	status: {
		type: String,
		enum: ["Incomplete", "Complete"],
		default: "Incomplete",
	},
});

module.exports = mongoose.model("Todo", todoSchema);
