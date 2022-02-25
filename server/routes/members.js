const express = require('express');
const { getMemberAllData, createMemberData, updateMemberData, deleteMemberData } = require('../controller/members')
const { authJwt } = require("../middleware/index")

const router = express.Router();

router.get('/', [authJwt.verifyToken], getMemberAllData);
router.post('/', [authJwt.verifyToken], createMemberData);
router.get('/:id', [authJwt.verifyToken], getMemberAllData)
router.put('/:id', [authJwt.verifyToken], updateMemberData)
router.post('/:id', [authJwt.verifyToken], deleteMemberData)

module.exports = router