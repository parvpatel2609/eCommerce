import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        // console.log(req.body);

        if (!req.body.name) {
            return res.status(400).send({ message: "Name of category is required" });
        }

        //check existting category
        const existingCategory = await categoryModel.findOne({ name: req.body.name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "This Category already exists."
            });
        }

        const category = await new categoryModel({
            name: req.body.name,
            slug: slugify(req.body.name)
        });

        category.save();

        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error in creating category',
            error
        });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send({ message: "Name of category is required" });
        }

        const { id } = req.params;
        const { name } = req.body;
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error in updating category',
            error
        });
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All categories list are send",
            category
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error in getting category',
            error
        });
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Get one category succesfully",
            category
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error in getting category',
            error
        });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            message: "Category is deleted successfully"
        });
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error in deletign category',
            error
        });
    }
}