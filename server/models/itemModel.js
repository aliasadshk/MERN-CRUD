//Schema data ka structure define karta hai. 
// Jaise ke kaunse fields honge, unka data type kya hoga, aur koi validation rules hain ya nahi.

//Flow: Routes → Controller → Model


const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
 title: String,
 description: String
});

//Model schema ka istemal karke MongoDB collection se interact karta ha
//Yeh data ko create, read, update, aur delete karne ke liye methods provide karta hai.

module.exports = mongoose.model('Item', itemSchema);