//Controller as a bridge:
//handling requests
//Fetching data from model then sending response to Client  
//handles  API logic like fetching
//getAllItems- createItem- updateItem- deleteItem
const Item = require('../models/itemModel');

// Fetch all items
const getAllItems = async (req, res) => {
   {
    const items = await Item.find();         // Model se data fetch kiya
    res.status(200).json(items);             //  Response send kiya
  } 
};

// Create new item
const createItem = async (req, res) => {
   {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } 
};

// Update existing item
const updateItem = async (req, res) => {
   {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(updatedItem);
  } 
};

// Delete item
const deleteItem = async (req, res) => {
   {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted' });
  } 
};

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem
};