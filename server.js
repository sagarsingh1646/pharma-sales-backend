const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rootRoutes = require("./src/routes/rootRoutes");
const passport = require('./src/config/passport');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());

const PORT = process.env.PORT || 3003;

// Connect DB
mongoose.connect(process.env.MONGO_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Current api version V1
app.use("/api/v1", rootRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
