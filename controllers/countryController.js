const Country = require('../models/Country');

// CREATE
exports.createCountry = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    res.status(201).json(country);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL - with search, filter, sort, pagination
exports.getCountries = async (req, res) => {
  try {
    const { name, region, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: 'i' }; // search by name
    if (region) query.region = { $regex: `^${region}$`, $options: 'i' }; // filter by region

    let sortOption = {};
    if (sort === 'asc') sortOption.name = 1;
    if (sort === 'desc') sortOption.name = -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [countries, total] = await Promise.all([
      Country.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Country.countDocuments(query)
    ]);

    res.json({
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: countries
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json(country);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json(country);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ message: 'Country not found' });
    res.json({ message: 'Country deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};