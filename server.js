const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const rootRoutes = require("./routes/rootRoutes")

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3003;

//Connect DB
mongoose.connect(process.env.MONGO_URI, {}
).then(() => console.log('MongoDB connected')).catch(err => console.log(err));


//Current api version V1
app.use("/api/v1", rootRoutes)

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
