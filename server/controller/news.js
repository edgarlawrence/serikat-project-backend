const {Tables, CategoryTables} = require('../models/index');
const multer = require('multer');
const path = require('path');

//upload images
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../Images'))
    },
    filename: (req, file, callback) => {
        callback(null, + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType  = fileTypes.test(file.mimetype)
        const extname   = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return callback(null, true)
        }
        callback('sorry, it accapts image format file')
        console.log(file)
    }
}).single('images')

const getAllData = async (req, res) => {
    try {
        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.size)

        let page = 0
        if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
            page = pageAsNumber
        }

        // const nextPage = pageAsNumber + 1
        // const prevPage = pageAsNumber - 1

        let size = 5
        if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 5) && !(sizeAsNumber < 1)) {
            size = sizeAsNumber
        }

        const tables = await Tables.findAndCountAll({ 
            limit: size,
            offset: page * size
         });
        res.json({
            content: tables.rows,
            totalPages: Math.ceil(tables.count / size)
        });
        // console.log(JSON.stringify(tables, null, 2));
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const getDataById = async (req, res) => {
  try {
      const tables = await Tables.findAndCountAll({
          where: {
              id: req.params.id
          }
      });
      res.json(tables[0]);
  } catch (error) {
      res.json({ message: error.message });
  }  
}

const createData = async (req, res) => {
    let data = { 
        images: req.body.path,
        title: req.body.title,
        content: req.body.content,
        newsCategoryId: req.body.newsCategoryId
     }
      try {
        await Tables.create(data);
        res.json({
            "message": "Product Created"
        });
    } catch (error) {
        res.json({ message: error.message });
      }  
}

 const updateData = async (req, res) => {
  try {
      await Tables.update(req.body, {
          where: {
              id: req.params.id
          }
      });
      res.json({
          "message": "Product Updated"
      });
  } catch (error) {
      res.json({ message: error.message });
  }  
}

 const deleteData = async (req, res) => {
  try {
      await Tables.destroy({
          where: {
              id: req.params.id
          }
      });
      res.json({
          "message": "Product Deleted"
      });
  } catch (error) {
      res.json({ message: error.message });
  }  
}

module.exports = { upload, getAllData, createData, getDataById, updateData, deleteData }