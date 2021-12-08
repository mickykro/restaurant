const express = require('express');
const { addPosts, getOrders, getFloor } = require('../posts');
const utils = require('../utils'); 
const router =express.Router();

router.get('/getOrders',getOrders );
router.get('/getFloor',getFloor );
router.post('/add', addPosts);


exports.router =router;
