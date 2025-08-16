import cartModel from "../Model/cart.model.js";

// Global error handler
export function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
}
 
// Catch undefined routes
export function invalidRoute(req, res, next){
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    next(error);
}

// Validate input for cart
export function validateCartInput(req, res, next) {
    if(!req.body){
        return res.status(400).json({ message: "No data provided" });
    }
    const { id, name, quantity } = req.body;

    if (!id || typeof id !== "number" || id < 0) {
        return res.status(400).json({ message: "Invalid or missing 'id'" });
    }

    if (name !== undefined && (typeof name !== "string" || name.trim().length < 1)) {
        return res.status(400).json({ message: "Invalid 'name'" });
    }

    if (quantity == null || typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid 'quantity'" });
    }
    next();
}

// Check if product exists before adding
export async function checkProductExists(req, res, next) {
    try {
        if(!req.body.id){
            return res.status(400).json({ message: "No id provided" });
        }
        const product = await cartModel.findOne({ id: req.body.id });
        if (product) {
            return res.status(409).json({ message: "Product with given ID already exist!!!" });
        }
        next();
    } catch (err) {
        next(err);
    }
}

// Middleware to validate quantity for update
export function validateQuantity(req, res, next) {
    if(!req.body.quantity){
        return res.status(400).json({ message: "No quantity provided" });
    }
    const { quantity } = req.body;
    if (quantity == null || typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({ message: "Invalid or missing 'quantity'" });
    }
    next();
}

//Check product exists for update or delete
export async function checkProduct(req,res,next){
    try {
        const product = await cartModel.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: "Product with given ID does not exist!!!" });
        }
        next();
    } catch (err) {
        next(err);
    }
}
