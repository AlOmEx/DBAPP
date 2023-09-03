import express from "express";
import colors from "colors";
import dotenv from 'dotenv'
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import cors from "cors";
import { connectDB_Mongo } from "./config/db.js";
import db from "./models/MySQL/index.js";
//Configure env
dotenv.config();

//REST Object
const app = express();



//database config
connectDB_Mongo();

//middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//REST API
app.get('/', (req,res) =>{
    res.send("<h1>Welcome to Minh's ecommerce app</h1>");
});


// Port
const MONGO_PORT = process.env.MONGO_PORT || 8080;
const MYSQL_PORT = process.env.MYSQL_PORT || 3306; // Use the desired MySQL port

// Run listen

    app.listen(MONGO_PORT, () => {
        // console.log(`Server Running on ${process.env.DEV_MODE} mode.`);
        // console.log(`MongoDB Server Running on Port ${MONGO_PORT}`.bgCyan.white);
        console.log(`MySQL Server Running on Port ${MYSQL_PORT}`.bgGreen.white);
    });

