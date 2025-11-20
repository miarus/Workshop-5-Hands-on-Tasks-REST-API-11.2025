require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ws5_movies';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Schema & Model
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: Number,
    director: String,
    rating: Number
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

// Health route
app.get('/', (req, res) => {
  res.json({ message: 'WS-5 Movie API running' });
});

/* ==================================================
   📌 CRUD ROUTES
   ================================================== */

// GET all movies
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({}).limit(50).lean();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// GET one movie by ID
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// POST create new movie
app.post('/api/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Invalid movie data' });
  }
});

// PUT update movie
app.put('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: 'Invalid update data' });
  }
});

// DELETE movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.status(200).json({ message: 'Deleted', id: movie._id });
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});