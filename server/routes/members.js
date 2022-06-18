const express = require('express');
const { getMemberAllData, createMemberData, updateMemberData, deleteMemberData } = require('../controller/members')

const router = express.Router();

router.get('/',    getMemberAllData);
router.post('/',   createMemberData);
router.get('/:id', getMemberAllData)
router.put('/:id', updateMemberData)
router.post('/:id',deleteMemberData)

module.exports = router