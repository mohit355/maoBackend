require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");


// import routes
const authRoutes = require("./routes/auth");
const addressRoutes = require("./routes/address");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const discountRoutes = require("./routes/discount");





const app = express();

// routes middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", authRoutes);
app.use("/api", addressRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", discountRoutes);


app.listen(process.env.PORT ,()=>{
    console.log(`Server started at port ${process.env.PORT} `)
})