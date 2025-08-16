import express from "express";
import { getAllProducts, getProductById } from "../Controller/products.controller.js";
import { errorHandler, invalidRoute } from "../Middleware/product.middleware.js";

const router = express.Router();

//product routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);


// Catch undefined routes
router.use(invalidRoute);

// Global error handler
router.use(errorHandler);

export default router;