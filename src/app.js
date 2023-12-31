require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-rote");
const productRoute = require("./routes/product-route");
const cartRoute = require("./routes/cart-route");
const addressRoute = require("./routes/address-route");
const orderRoute = require("./routes/order-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const authenticate = require("./middlewares/authenticate");

const app = express();

if (process.env.NODE_ENV === "develop") {
  app.use(morgan("combined"));
}

// app.use(
//   rateLimit({
//     windowMs: 1000 * 60 * 15,
//     max: 1000,
//     message: { message: "too many request" },
//   })
// );
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", authenticate, cartRoute);
app.use("/api/address", authenticate, addressRoute);
app.use("/api/order", authenticate, orderRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server running in port " + port));
