import { Op } from "sequelize";
import db from "../../models/MySQL/index.js";
import CategoryModel from "../../models/MySQL/categoryModel_MySQL.js";
import slugify from "slugify";
const sequelize = db.sequelize;
const Category = CategoryModel(sequelize);
export const createCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(401).send({ message: "Name is required" });
      }
      const existingCategory = await Category.findOne({ where: { name: { [Op.eq]: name } } });
      if (existingCategory) {
        return res.status(200).send({
          success: false,
          message: "Category Already Exists",
        });
      }
      const category = await Category.create({
        name,
        slug: slugify(name),
      });
      res.status(201).send({
        success: true,
        message: "New category created",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Category",
      });
    }
  };

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const [updatedRows] = await Category.update(
      { name, slug: slugify(name) },
      { where: { id } }
    );
    if (updatedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    const category = await Category.findByPk(id);
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send({
      success: true,
      message: "All Categories List",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await Category.findOne({
      where: { slug: req.params.slug },
    });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Get Single Category Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single category",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRows = await Category.destroy({ where: { id } });
    if (deletedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};