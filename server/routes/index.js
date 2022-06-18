const express = require('express');
const { upload, getAllData, createData, getDataById, deleteData, updateData } = require('../controller/news')

const router = express.Router();

router.get('/',     getAllData);
router.post('/',   upload, createData);
router.get('/:id',  getDataById)
router.put('/:id',  updateData)
router.post('/:id',  deleteData)

module.exports = router