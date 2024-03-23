import express  from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";

//router object
const router = express.Router();

//routing

//create category controller
router.post('/create-category', requireSignin, isAdmin, createCategoryController);




export default router;