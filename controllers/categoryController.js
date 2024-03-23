import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
    try {
        // console.log(req.body);

        if(!req.body.name){
            return res.status(400).send({message: "Name of category is required"});
        }

        //check existting category
        const existingCategory = await categoryModel.findOne({name: req.body.name});
        if(existingCategory){
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