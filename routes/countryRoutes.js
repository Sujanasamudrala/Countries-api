const express = require('express');
const router = express.Router();
const {
  createCountry,
  getCountries,
  getCountryById,
  updateCountry,
  deleteCountry
} = require('../controllers/countryController');
const auth = require('../middleware/authMiddleware');
const { countryValidationRules, validate } = require('../middleware/validateMiddleware');

router.get('/', getCountries);              // public: search/filter/sort/pagination via query params
router.get('/:id', getCountryById);         // public

router.post('/', auth, countryValidationRules, validate, createCountry);     // protected
router.put('/:id', auth, countryValidationRules, validate, updateCountry);   // protected
router.delete('/:id', auth, deleteCountry);                                  // protected

module.exports = router;