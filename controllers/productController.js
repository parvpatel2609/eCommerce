import slugify from "slugify";
import productModel from "../models/productModel.js";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import categoryModel from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

//Controller to create product
export const createProductController = async (req, res) => {
    try {

        //validatation
        if (!req.body.name) {
            return res.send({ error: "Name of product is Required" });
        }
        if (!req.body.description) {
            return res.send({ error: "Product description is Required" });
        }
        if (!req.body.price) {
            return res.send({ error: "Price of product is Required" });
        }
        if (!req.body.category) {
            return res.send({ error: "Category of product is Required" });
        }
        if (!req.body.quantity) {
            return res.send({ error: "Quantity of product is Required" });
        }
        if (!req.file) {
            return res.send({ error: "Image of product is Required" });
        }

        const existing_product = await productModel.findOne({ slug: slugify(req.body.name) });

        if (existing_product) {
            return res.status(200).send({
                success: false,
                message: 'Product Already Exists'
            });
        }

        const cat = await categoryModel.findOne({ slug: slugify(req.body.category) });

        if (!cat) {
            return res.status(404).send({
                success: false,
                message: "Entered type of category is not in database"
            });
        }

        // console.log(cat)

        const upload = await uploadOnCloudinary(req.file.path);

        const product = new productModel({
            name: req.body.name,
            slug: slugify(req.body.name),
            description: req.body.description,
            price: req.body.price,
            category: cat._id,
            quantity: req.body.quantity,
            image: upload?.secure_url
        });
        product.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating new product",
            error
        });
    }
}

//controller to gets all products
export const getProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").limit(12).sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "All products are send here",
            products,
            tot_product: products.length
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products from server",
            error
        });
    }
}

//Getting single product 
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: slugify(req.params.slug) }).populate("category");

        res.status(200).send({
            success: true,
            message: "Single product details is send to client",
            product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting single product from server",
            error
        });
    }
}

//deleting product
export const deleteProductController = async (req, res) => {
    try {
        // console.log("Params pid: ", req.params.pid);
        const result = await productModel.findByIdAndDelete(req.params.pid);
        // console.log(result);
        const imagepath = result.image;
        const urlArray = imagepath.split("/");
        const image = urlArray[urlArray.length - 1];
        const imageName = image.split(".")[0];
        // console.log(imageName);
        cloudinary.uploader.destroy(imageName, (error, result) => {
            // console.log("Deleting image from database and show status ok message here");
            // console.log(error, result);
        });

        res.status(200).send({
            success: true,
            message: "Product deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in removing product from server",
            error
        });
    }
}

//updating product details 
export const updateProductWithImageController = async (req, res) => {
    try {
        console.log(req.body);
        //validation
        if (!req.body.name) {
            return res.send({ error: "Name of product is Required" });
        }
        if (!req.body.description) {
            return res.send({ error: "Product description is Required" });
        }
        if (!req.body.price) {
            return res.send({ error: "Price of product is Required" });
        }
        if (!req.body.category) {
            return res.send({ error: "Category of product is Required" });
        }
        if (!req.body.quantity) {
            return res.send({ error: "Quantity of product is Required" });
        }
        if (!req.file) {
            return res.send({ error: "Image of product is Required" });
        }

        const existing_product = await productModel.findById(req.params.pid);

        const cat = await categoryModel.findOne({ slug: slugify(req.body.category) });

        if (!cat) {
            return res.status(404).send({
                success: false,
                message: "Entered type of category is not in database"
            });
        }

        //deleting image of from the database
        const imagepath = existing_product.image;
        const urlArray = imagepath.split("/");
        const image = urlArray[urlArray.length - 1];
        const imageName = image.split(".")[0];
        console.log("imageName: ", imageName);
        cloudinary.uploader.destroy(imageName, (error, result) => {
            console.log("Deleting image from database and show status ok message here");
            console.log(error, result);
        });

        //uploading image to databse
        const upload = await uploadOnCloudinary(req.file.path);
        console.log("Newly updated image details: ", upload);

        const up = await productModel.findByIdAndUpdate(req.params.pid, {
            name: req.body.name,
            slug: slugify(req.body.name),
            description: req.body.description,
            price: req.body.price,
            category: cat._id,
            quantity: req.body.quantity,
            image: upload?.secure_url
        },{new: true});
        await up.save();

        res.status(200).send({
            success: true,
            msg: 'Product updated with image successfully',
            up
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product with image in server",
            error
        });
    }
}

export const updateProductController = async (req, res) => {
    try {
        //validation
        if (!req.body.name) {
            return res.send({ error: "Name of product is Required" });
        }
        if (!req.body.description) {
            return res.send({ error: "Product description is Required" });
        }
        if (!req.body.price) {
            return res.send({ error: "Price of product is Required" });
        }
        if (!req.body.category) {
            return res.send({ error: "Category of product is Required" });
        }
        if (!req.body.quantity) {
            return res.send({ error: "Quantity of product is Required" });
        }

        const cat = await categoryModel.findOne({ slug: slugify(req.body.category) });

        if (!cat) {
            return res.status(404).send({
                success: false,
                message: "Entered type of category is not in database"
            });
        }

        const update_product = await productModel.findByIdAndUpdate(req.params.pid, {
            name: req.body.name,
            slug: slugify(req.body.name),
            description: req.body.description,
            price: req.body.price,
            category: cat._id,
            quantity: req.body.quantity 
        },{new: true});
        await update_product.save();

        console.log("Updated Product: ",update_product);

        if(update_product.save()){
            res.status(200).send({
                success: true,
                message: "Product updated successfully",
                update_product
            });
        }

    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating product in server",
            error
        });
    }
}