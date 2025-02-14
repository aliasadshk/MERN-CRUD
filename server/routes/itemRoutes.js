const express = require('express');
const { getAllItems, createItem, updateItem, deleteItem } = require('../controller/itemController');
const router = express.Router();

// GET all items
router.get('/api/items', getAllItems);

// POST new item
router.post('/api/items', createItem);

// PUT update item
router.put('/api/items/:id', updateItem);

// DELETE item
router.delete('/api/items/:id', deleteItem);

module.exports = router;