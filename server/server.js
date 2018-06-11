// express server
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); // define our app using express
const db = require('./db').mongoose;
const User = require('./db').User;
const router = express.Router();
const mongoose = require('mongoose');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    next();
});

// Routes
app.post('/api/getTodos', function(req, res) {
    User.find({}, function(error, data) {
        if (error) {
            console.log('Error getting the data!!')
            res.status(404).send('Error retrieving data')
        }
        res.status(200).send(data)
    })
})

app.post('/api/saveTodo', function(req, res) {
    const todo = req.body.newTodo;
    var saveTodo = new User({
        todo: todo
    });
    saveTodo.save(function(error, user) {
         if (error) {
            console.log('Error adding todo!')
            res.status(404).send('Error saving to database');
         } 
         res.status(200).send(user);
    })
})

// Delete a todo with todoId
app.post('/api/deleteTodo', function(req, res) {
    User.find({todo: req.body.todo}, function(req, data) {
        User.remove({_id: data[0]._id}, function(error) {
            if(error) {
                res.status(404).send('Error in deleting todo')
            }
            User.find({}, function(error, todos){
                if(error) {
                    res.status(404).send('Error in retrieving todos')
                }
                res.status(200).send(todos)
            })
        })
    })
});

// Update a todo with todoId
app.post('/api/updateTodo', function(req, res) {
    User.find({todos: req.body.todo}, function(req, data) {
        User.findByIdAndUpdate({_id: data[0]._id}, { $set: {todo: 'different'}}, { new: true }, function(error, todos) {
             if (error) {
              res.status(404).send('Error in updating todo')
             } 
             res.status(200).send(todos)
        })
    })
});

// Add/Save User to Database
app.post('/api/checkUsername', function(req, res) {
    User.find({username: req.body.username, password: req.body.password}, function(error, user) {
        //if user found.
        //console.log(req.body.username)
        //console.log(req.body.password)
        console.log(user)
        if (user.length != 0) {
          if(user[0].username){
            console.log('Username already exists, username: ' + username);  
            res.status(404).send(user)                       
        } else { 
            var testUser = new User({
                username: req.body.username,
                password: req.body.password
            });
            testUser.save(function (error, user) {
                if (error) {
                    console.log('Error saving username and password in database!')
                }
                console.log('Saved user to database!!')
                res.status(200).send(user)
          })}}
})})

app.listen(4300, () => {
    console.log('Server is connected on 4300!')
})

