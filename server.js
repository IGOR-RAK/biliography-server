require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:"https://biblio-admin.vercel.app"}));
// app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/yearRouter'));
app.use('/api', require('./routes/cardRouter'));
app.use('/api', require('./routes/itemRouter'));


// Connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res) => {
  res.send("Biblio Server");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});