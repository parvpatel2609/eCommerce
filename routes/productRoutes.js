import express from "express";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductsController, getSingleProductController, productFilterController, updateProductController, updateProductWithImageController } from "../controllers/productController.js";
import { upload } from "../middlewares/multer_middleware.js";

const router = express.Router();

//all routes related to product are here
//creating product || Admin Method
router.post("/create-product", requireSignin, isAdmin, upload.single("image"), async (req, res, next) => {
    if (req.file) {
        next();
    }
    else {
        console.log("we are here inside product create routes")
        res.status(400).send('No file uploaded.');
    }
}, createProductController);

//Get products || Public method
router.get("/get-products", getProductsController);

//Get Single Product || Public method
router.get("/get-products/:slug", getSingleProductController);

//Delete Product || Admin Method 
router.delete("/delete-product/:pid", requireSignin, isAdmin, deleteProductController);

//update product with image || Admin method
router.put("/update-product-with-image/:pid", requireSignin, isAdmin, upload.single("photo"), async (req, res, next) => {
    if (req.file) {
        next();
    }
    else {
        res.status(400).send('No file uploaded.');
    }
}, updateProductWithImageController);

//update product without changing the image || Admin Method
router.put("/update-product/:pid", requireSignin, isAdmin, updateProductController);

//filter-product
router.post("/product-filter", productFilterController);

export default router;