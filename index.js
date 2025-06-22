const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// A middleware to parse incoming JSON payloads
app.use(express.json({ extended: false }));

// Trust proxy to get the real IP address
app.set('trust proxy', true);

const Link = require('./models/Link');

// Redirect route
app.get('/:shortId', async (req, res) => {
  try {
    const link = await Link.findOne({ shortUrlId: req.params.shortId });

    if (link) {
      const newClick = {
        ipAddress: req.ip,
      };

      const targetParamName = link.targetParamName || 't';
      if (req.query[targetParamName]) {
        newClick.targetParamValue = req.query[targetParamName];
      }

      link.clicks.push(newClick);
      await link.save();
      return res.redirect(link.originalUrl);
    } else {
      return res.status(404).json('No link found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/links', require('./routes/links'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
