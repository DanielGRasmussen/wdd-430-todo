const express = require("express");
const router = express.Router();
module.exports = router;
const sequenceGenerator = require("./sequenceGenerator");
const Todo = require("../models/todo");

router.get("/", (req, res, _) => {
	Todo.find()
		.then(todos => {
			res.status(200).json({
				todos: todos,
			});
		})
		.catch(error => {
			res.status(500).json({
				message: "An error occurred",
				error: error,
			});
		});
});

router.post("/", async (req, res, _) => {
	const maxTodoId = await sequenceGenerator("todos");

	const todo = new Todo({
		id: maxTodoId,
		title: req.body.title,
		description: req.body.description,
		status: "Incomplete",
	});

	console.log(maxTodoId, todo);

	if (!todo.title) {
		console.log("Invalid title");
		res.status(400).json({
			message: "Todo title is required.",
		});
		return;
	}

	todo.save()
		.then(createdTodo => {
			res.status(201).json({
				todo: createdTodo,
			});
		})
		.catch(error => {
			console.log("An error occured");
			res.status(500).json({
				todo: "An error occurred",
				error: error,
			});
		});
});

router.put("/:id", (req, res, _) => {
	Todo.findOne({ id: req.params.id })
		.then(todo => {
			todo.title = req.body.title;
			todo.description = req.body.description;
			todo.status = req.body.status;

			if (todo.status !== "Complete" && todo.status !== "Incomplete") {
				res.status(400).json({
					message: "Status must be set to Complete or Incomplete",
				});
				return;
			}

			Todo.updateOne({ id: req.params.id }, todo)
				.then(_ => {
					res.status(204).json({
						message: "Todo updated successfully",
					});
				})
				.catch(error => {
					res.status(500).json({
						message: "An error occurred",
						error: error,
					});
				});
		})
		.catch(error => {
			res.status(500).json({
				message: "Todo not found.",
				error: error,
			});
		});
});

router.delete("/:id", (req, res, _) => {
	Todo.findOne({ id: req.params.id })
		.then(_ => {
			Todo.deleteOne({ id: req.params.id })
				.then(_ => {
					res.status(204).json({
						message: "Todo deleted successfully",
					});
				})
				.catch(error => {
					res.status(500).json({
						message: "An error occurred",
						error: error,
					});
				});
		})
		.catch(error => {
			res.status(500).json({
				message: "Todo not found.",
				error: error,
			});
		});
});
