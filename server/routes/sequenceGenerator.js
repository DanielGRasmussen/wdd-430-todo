const Sequence = require("../models/sequence");

async function SequenceGenerator(collectionType) {
	const sequenceList = await Sequence.find();
	let sequence = sequenceList[0];
	let nextId;

	switch (collectionType) {
		case "todos":
			sequence.maxTodoId++;
			nextId = sequence.maxTodoId;
			break;
		default:
			return -1;
	}

	Sequence.updateOne({ _id: sequence._id }, sequence).then(
		(response, error) => {
			if (error) {
				console.log("Error: " + error);
				return null;
			}
		}
	);

	return nextId;
}

module.exports = SequenceGenerator;
