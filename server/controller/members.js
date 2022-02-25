const { MemberTable } = require('../models/index');


const getMemberAllData = async (req, res) => {
    try {
        const tables = await MemberTable.findAll();
        res.json(tables);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

const getMemberDataById = async (req, res) => {
  try {
      const tables = await MemberTable.findAll({
          where: {
              id: req.params.id
          }
      });
      res.json(tables[0]);
  } catch (error) {
      res.json({ message: error.message });
  }  
}

const createMemberData = async (req, res) => {
      try {
        const user = await MemberTable.create(req.body);
        res.json({
            "message": "Product Created"
        });
        console.log(user.total)
    } catch (error) {
        res.json({ message: error.message });
      }  
}

 const updateMemberData = async (req, res) => {
  try {
      await MemberTable.update(req.body, {
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

 const deleteMemberData = async (req, res) => {
  try {
      await MemberTable.destroy({
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

module.exports = { getMemberAllData, createMemberData, getMemberDataById, updateMemberData, deleteMemberData }