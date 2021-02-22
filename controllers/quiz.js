const path = require('path');
const Quiz = require('../models/quiz');
const Question = require('../models/questions');

// Create and Save a new Test
exports.createQuizFull = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Nieprawidłowa zawartość żądania!" });
        return;
    }

    // Create a Test
    const quiz = new Quiz({
        name: req.body.name,
        questions: req.body.questions
    });

    // Save Test in the database
    quiz
        .save(quiz)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Nastąpił jakiś błąd przy tworzeniu obiektu."
            });
        });
};

// Retrieve all Quizes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Quiz.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Nastąpił jakiś błąd przy pozyskiwaniu obiektu."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Quiz.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Obiekt o id: " + id + "nie znaleziony" });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Błąd przy pozyskiwaniu obiektu o id=" + id });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Nieprawidłowe dane żądania!"
        });
    }

    const id = req.params.id;

    Quiz.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Nie można zmienić obiektu o id=${id}.`
                });
            } else res.send({ message: "Obiekt zaktualizowany pomyślnie." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Błąd przy zmianie obiektu o id=" + id
            });
        });
};

exports.addQuestion = (req, res) => {
    if (!req.body.questions) {
        return res.status(400).send({
            message: "Nieprawidłowe dane żądania!"
        });
    }

    const id = req.params.id;
    Quiz.findByIdAndUpdate(id,{$push:req.body.questions}).exec()
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Quiz.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Nie można usunąć obiektu o id=${id}!`
                });
            } else {
                res.send({
                    message: "Obiekt pomyślnie usunięty!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Nie udało się usunąć obiektu o id=" + id
            });
        });
};

exports.deleteQuestion = (req, res) => {
    const id = req.params.id;

    Question.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Nie można usunąć obiektu o id=${id}!`
                });
            } else {
                res.send({
                    message: "Obiekt pomyślnie usunięty!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Nie udało się usunąć obiektu o id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Quiz.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Quizy usunięte pomyślnie!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Błąd przy usuwaniu Quizów."
            });
        });
};
