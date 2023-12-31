const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const path = require("path");
const multer = require("multer");
const { uploadFileToStorage } = require("../gcp");
const { checkAuthenticated } = require("../auth");
const GroceryList = require("../models/GroceryList");
const LikedRecipe = require("../models/LikedRecipe");

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/",
    checkAuthenticated,
    upload.single("image"),
    async (req, res) => {
        try {
            const { name, instructions, ingredients, category, source } = req.body;
            const user = req.user._id;

            const imageUrl = await uploadFileToStorage(req.file);

            const newRecipe = new Recipe({
                user: user,
                name: name,
                ingredients: ingredients,
                instructions: instructions,
                source: source,
                category: category,
                image: imageUrl,
            });

            await newRecipe.save();

            res.status(201).json({
                message: "Recipe added successfully",
                recipe: newRecipe,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                msg: err,
                error: "An error occurred while saving the recipe.",
            });
        }
    }
);

router.get("/", checkAuthenticated, async (req, res) => {
    try {
        const userRecipes = await Recipe.find({ user: req.user._id });

        res.status(200).json({
            recipes: userRecipes,
        });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while getting recipes." });
    }
});

router.get("/:id", checkAuthenticated, async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await Recipe.findOne({ _id: recipeId, user: req.user._id });

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        res.json({ success: true, recipe });
    } catch (error) {
        res.status(500).json({ message: error.message || "Error Occurred" });
    }
});

router.get("/recipes/search", checkAuthenticated, async (req, res) => {
    req.isAuthenticated();
    const searchQuery = req.query.query;

    try {
        const foundRecipes = await Recipe.find({
            name: { $regex: searchQuery, $options: "i" },
        });
        res.status(200).json({ recipes: foundRecipes });
    } catch (error) {
        console.error("Error searching recipes:", error);
        res.status(500).json({ error: "Error searching recipes" });
    }
});

router.put("/:id", checkAuthenticated, async (req, res) => {
    const recipeId = req.params.id;
    const updatedData = req.body;

    try {
        const recipe = await Recipe.findOne({ _id: recipeId, user: req.user._id });

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        recipe.set(updatedData);
        await recipe.save();

        res.status(200).json({
            message: "Recipe updated successfully",
            updatedRecipe: recipe,
        });
    } catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while updating the recipe." });
    }
});

router.delete("/:id", checkAuthenticated, async (req, res) => {
    const recipeId = req.params.id;

    try {
        await Recipe.findByIdAndDelete(recipeId);
        await LikedRecipe.deleteMany({ recipe: recipeId });

        res.json({ success: true, message: "Recipe deleted successfully." });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ success: false, message: "Error deleting recipe." });
    }
});


router.get("/category/:category", checkAuthenticated, async (req, res) => {
    try {
        const category = req.params.category;

        const userRecipesInCategory = await Recipe.find({
            category: category,
            user: req.user._id,
        });

        res.status(200).json({
            success: true,
            recipes: userRecipesInCategory,
        });
    } catch (err) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching recipes by category." });
    }
});

router.post("/:recipeId/like", checkAuthenticated, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const isLiked = await LikedRecipe.findOne({
            user: req.user._id,
            recipe: recipeId,
        });

        if (isLiked) {
            return res.status(400).json({ message: "Recipe is already liked" });
        }

        const likedRecipesCount = await LikedRecipe.countDocuments({
            user: req.user._id,
        });
        if (likedRecipesCount >= 7) {
            return res
                .status(400)
                .json({ message: "You have already liked 7 recipes." });
        }

        recipe.liked = true;
        await recipe.save();

        const groceryList = await GroceryList.findOneAndUpdate(
            { user: req.user._id },
            {
                $addToSet: { likedRecipeIngredients: { $each: recipe.ingredients } },
            },
            { upsert: true, new: true }
        );

        const likedRecipe = new LikedRecipe({
            user: req.user._id,
            recipe: recipeId,
        });

        await likedRecipe.save();

        res.json(groceryList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/:recipeId/unlike", checkAuthenticated, async (req, res) => {
    try {
        const recipeId = req.params.recipeId;

        await LikedRecipe.findOneAndDelete({
            user: req.user._id,
            recipe: recipeId,
        });

        const recipe = await Recipe.findById(recipeId);
        if (recipe) {
            recipe.liked = false;
            await recipe.save();

            await GroceryList.findOneAndUpdate(
                { user: req.user._id },
                {
                    $pull: {
                        likedRecipeIngredients: { $in: recipe.ingredients },
                        recipes: { recipeId },
                    },
                },
                { new: true }
            );
        }

        res.json({ message: "Recipe unliked successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/reset", async (req, res) => {
    try {
        await Recipe.updateMany({}, { liked: false });
        await LikedRecipe.deleteMany({});
        res.json({ success: true, message: "Liked recipes reset successfully." });
    } catch (error) {
        console.error("Error resetting liked recipes:", error);
        res
            .status(500)
            .json({ success: false, message: "Error resetting liked recipes." });
    }
});

module.exports = router;
