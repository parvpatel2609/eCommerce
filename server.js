import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from "cors";
import multer from "multer";
import path from "path"

//configure before app 
dotenv.config();

//connnect database
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

export const upload_profile = multer({
    storage: storage
});

//route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);

//rest apis
app.get('/', (req, res) => {
    res.send("<h1>Welcome </h1>");
});

//Checking for backend server is running or not 
// if (result.error) {
//     throw result.error
// }
// console.log(result.parsed);


//app listening port
const PORT = process.env.PORT || 8080;
// console.log("Port: "+PORT);

//run to listen the app
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
})
