import { authenticateUser } from "../Middleware/auth.middleware.js";
import cartRoutes from "./cart.routes.js";
import productRoutes from "./products.routes.js";
import userRoutes from "./user.routes.js";

//Global error handler
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
  });
}

//invalid route handler
function invalidRoute(req, res, next){
  res.status(404).json({ message: "Route not found" });
}

export function routes(app) {
  app.use("/api/user", userRoutes)
  app.use("/api/cart", authenticateUser, cartRoutes);
  app.use("/api/products", productRoutes);

  //handle invalid routes
  app.use(invalidRoute);
  //global error handler
  app.use(errorHandler);
}