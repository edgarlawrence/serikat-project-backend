const {CategoryTables} = require('../models/index');

const getAllCategoryData = async (req, res) => {
    try {
        const categories = await CategoryTables.findAll();
        res.json(categories);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const getCategoryDataById = async (req, res) => {
  try {
      const categories = await CategoryTables.findAll({
          where: {
              id: req.params.id
          }
      });
      res.json(categories[0]);
  } catch (error) {
      res.json({ message: error.message });
  }  
}

const createCategoryData = async (req, res) => {
      try {
        await CategoryTables.create(req.body);
        res.json({
            "message": "Category Created"
        });
    } catch (error) {
        res.json({ message: error.message });
      }  
}

 const updateCategoryData = async (req, res) => {
  try {
      await CategoryTables.update(req.body, {
          where: {
              id: req.params.id
          }
      });
      res.json({
          "message": "Category Updated"
      });
  } catch (error) {
      res.json({ message: error.message });
  }  
}

 const deleteCategoryData = async (req, res) => {
  try {
      await CategoryTables.destroy({
          where: {
              id: req.params.id
          }
      });
      res.json({
          "message": "Category Deleted"
      });
  } catch (error) {
      res.json({ message: error.message });
  }  
}

module.exports = { getAllCategoryData, getCategoryDataById, createCategoryData, updateCategoryData, deleteCategoryData }