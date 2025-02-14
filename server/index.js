require('dotenv').config();

//Yeh ek web framework hai jo server banane mein madad karta hai.
const express = require('express');
//Yeh MongoDB ke sath connection aur data models banane ke liye use hota hai.
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// Cross-Origin Resource Sharing ko enable karta hai taake front-end aur back-end ke darmiyan data share ho sake.
app.use(cors());
app.use(express.json());

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Mongoose Schema and Model
const itemSchema = new mongoose.Schema({
  title: String,
  description: String
});
const Item = mongoose.model('Item', itemSchema);

// GET all items
//Jab user /api/items par GET request bhejta hai, toh yeh function MongoDB se saare items uthata hai aur unhein JSON format mein response mein bhej deta hai.

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});



// POST new item
app.post('/api/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// Update item by ID
//Yeh endpoint kisi specific item ko uski id se update karta hai.
//req.params.id: URL se id ko get karta hai.
//findByIdAndUpdate(): Is function se item update hota hai. { new: true } ka matlab hai ke updated item ko return kare.

app.put('/api/items/:id', async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(updatedItem);
});

// // Delete item by ID
//Yeh endpoint kisi specific item ko uski id se delete karta hai.
//findByIdAndDelete(): Is function se item delete hota hai.
//Response mein success message bheja jata hai.

app.delete('/api/items/:id', async (req,res)=>{
  await Item.findByIdAndDelete(req.params.id);
  res.json({message: 'Item Deleted'})
})



 const PORT = process.env.PORT || 4000;
 app.listen(PORT,()=>{
  console.log( `Server is running on PORT ${PORT}`)
 })