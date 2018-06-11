// connect to database
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/originalTodo');

db.once('open', () => {
    console.log('Connected to MongoDB')
})

db.on('error', (error) => {
    console.error(error);
})

const userSchema = new Schema({
    username: String,
    password: String, 
    todo: String,
    todos: [{ todo: String }],
    complete: Boolean
})

const User = mongoose.model('User', userSchema);
module.exports.User = User;

