const express = require('express');
const router = express.Router();
const quiz = require("../controllers/quiz.js");

// Create a new Quiz
router.post("/", quiz.createQuizFull);

// Retrieve all Quizes
router.get("/", quiz.findAll);

// Retrieve a single Quiz with id
router.get("/:id", quiz.findOne);

// Update a Quiz with id
router.put("/:id", quiz.update);

// Update a Quiz with id
router.post("/:id", quiz.addQuestion);

// Delete a Quiz with id
router.delete("/:id", quiz.delete);

router.delete("/questions/:id", quiz.deleteQuestion)

//Delete all Quizes
router.delete("/", quiz.deleteAll);

module.exports = router;
