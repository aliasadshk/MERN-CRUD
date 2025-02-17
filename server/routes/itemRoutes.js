//Flow: Routes → Controller → Model


//Routes request ka address define karte hain. for ex- get and post.
//Define Endpoints
//get //post //put//delete

const express = require('express');
const { getAllItems,
        createItem, 
        updateItem, 
        deleteItem } = require('../controller/itemController');

const router = express.Router();
//Routes: Yeh sirf endpoints define karte hain (e.g., /api/users, /api/products).

// // Route define kiya
router.get('/', getAllItems);       // GET /api/items → handled here
router.post('/', createItem);      
router.put('/:id', updateItem);     
router.delete('/:id', deleteItem);  

module.exports = router;