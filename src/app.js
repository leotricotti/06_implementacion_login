import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import __dirname from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import CartsRouter from "./routes/carts.routes.js";
import LoginRouter from "./routes/login.routes.js";
import SignUpRouter from "./routes/signup.routes.js";
import SessionRouter from "./routes/session.routes.js";
import ProductsRouter from "./routes/products.routes.js";

dotenv.config();

//Variables
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser("C0d3rS3cr3t"));
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.engine(
  "handlebars",
  handlebars.engine({
    defaultLayout: "main.handlebars",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);

// Connect to MongoDB
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30 * 60,
    }),
    secret: "codersecret",
    resave: false,
    saveUninitialized: true,
  })
);

const enviroment = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

enviroment();

// Routes
app.use("/", LoginRouter);
app.use("/signup", SignUpRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/session", SessionRouter);
app.use("/api/products", ProductsRouter);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
