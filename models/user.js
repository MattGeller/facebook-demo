const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    facebook_id: String,
    display_name: String
});

//create a new model called users, using the userSchema
mongoose.model('users', userSchema);