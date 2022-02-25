const express = require('express');
const { upload, getAllData, createData, getDataById, deleteData, updateData } = require('../controller/news')
const { authJwt } = require("../middleware/index")

const router = express.Router();

router.get('/',     [authJwt.verifyToken], getAllData);
router.post('/',    [authJwt.verifyToken],upload, createData);
router.get('/:id',  [authJwt.verifyToken], getDataById)
router.put('/:id',  [authJwt.verifyToken], updateData)
router.post('/:id', [authJwt.verifyToken],  deleteData)

module.exports = router