const express = require('express');
const { getCategoryDataById, createCategoryData, updateCategoryData, deleteCategoryData, getAllCategoryData } = require('../controller/category')
const { authJwt } = require("../middleware/index")

const router = express.Router();

router.get('/', [authJwt.verifyToken], getAllCategoryData);
router.post('/', [authJwt.verifyToken], createCategoryData);
router.get('/:id', [authJwt.verifyToken], getCategoryDataById)
router.put('/:id', [authJwt.verifyToken], updateCategoryData)
router.post('/:id', [authJwt.verifyToken], deleteCategoryData)

module.exports = router