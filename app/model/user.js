const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true},  
	phoneNumber: { type: Number, required: true, unique: true},
	password: { type: String}, 
},{  timestamps: true});


module.exports = mongoose.model('mern-auth', userSchema);