import productModel from "../Model/product.model.js";

//get all product
export function getAllProducts(req,res){
    productModel.find().then(data => {
        if(!data || data.length === 0){
            return res.status(404).json({message: "No data found"});
        }
        res.status(200).json(data);
    }).catch(err => res.status(500).json({message: err.message || "Internal server error" }));
}
 
//get single product by id
export function getProductById(req,res){
    const id = req.params.id;
    productModel.findOne({ id: id }).then(data => {
        if(!data){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(data);
    }).catch(err => res.status(500).json({message: err.message || "Internal server error" }));
}