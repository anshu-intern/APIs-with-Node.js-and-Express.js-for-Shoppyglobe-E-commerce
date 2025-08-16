import express from "express";
import { addToCart, deleteFromCart, updateCartQuantity } from "../Controller/cart.controller.js";
import { checkProductExists, errorHandler, invalidRoute, validateCartInput, validateQuantity, checkProduct } from "../Middleware/cart.middleware.js";

const router = express.Router();

//cart routes
router.post("/", validateCartInput, checkProductExists, addToCart);
router.delete("/:id", checkProduct, deleteFromCart);
router.put("/:id", checkProduct, validateQuantity, updateCartQuantity); 

 
// Catch undefined routes
router.use(invalidRoute);

// Global error handler
router.use(errorHandler);

export default router;