import express  from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

//router object
const router = express.Router();

//routing

//create category controller route || Post Method
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

//update category controller route || Put Method
router.put('/update-category/:id',requireSignin, isAdmin, updateCategoryController);

//get all categories of eCommerce Website || Get Method
router.get('/getallcategory', categoryController);

//get only one particular Item || Get Method with params id
router.get('/single-category/:slug', singleCategoryController);

//delete  a Category || Delete Method with params id
router.delete("/delete-category/:id", requireSignin ,isAdmin, deleteCategoryController);

export default router;