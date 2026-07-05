const { body, validationResult } = require('express-validator');

exports.countryValidationRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('region').notEmpty().withMessage('Region is required'),
  body('population').optional().isNumeric().withMessage('Population must be a number'),
  body('area').optional().isNumeric().withMessage('Area must be a number')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};