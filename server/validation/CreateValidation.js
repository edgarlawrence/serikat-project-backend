const { check, validationResult } = require('express-validator')

const runValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    next()
}

const createValidate = [
    check('title', 'tolong title diisi').notEmpty(),
    check('content', 'tolong content diisi').notEmpty(),
    check('newsCategoryId', 'tolong newsCategoryId diisi').notEmpty(),
    check('images', 'tolong images diisi').notEmpty()
]

module.exports = { runValidation, createValidate }