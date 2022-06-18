const express = require('express');
const { getCategoryDataById, createCategoryData, updateCategoryData, deleteCategoryData, getAllCategoryData } = require('../controller/category')

const router = express.Router();

router.get('/',     getAllCategoryData);
router.post('/',    createCategoryData);
router.get('/:id',  getCategoryDataById)
router.put('/:id',  updateCategoryData)
router.post('/:id', deleteCategoryData)

module.exports = router