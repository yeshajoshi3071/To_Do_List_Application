const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://yeshaj3001:Meera%402477@cluster0.omtvhi2.mongodb.net/test')

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;

    TodoModel.create({task: task})
    .then(result => res.send(result))
    .catch(err => console.log(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Backend server is running on port 3001');
})

