import cartModel from "../Model/cart.model.js";

//add item to cart
export function addToCart(req,res) {
    const {id,name,quantity} = req.body;

    const newItem = new cartModel({
        id : id,
        name : name,
        quantity : quantity
    });

    newItem.save().then(data => {
        if(!data){
            return res.status(400).json({message: "something went wrong."})
        }
        res.status(201).json(data);
    }).catch(err => {
            res.status(500).json({ message: err.message || "Something went wrong" });
    });
}


//delete item from cart
export function deleteFromCart(req,res){
    const id = req.params.id;
    cartModel.findOneAndDelete({ id: id }).then(data => {
        if(!data){
            return res.status(404).json({message: "Product not found for deletion"});
        }
        res.status(200).json({ message: "Product deleted successfully", deletedItem: data });
    }).catch(err => res.status(500).json({message: err.message|| "Internal server error"}));
}


//update quantity in cart
export function updateCartQuantity(req, res) {
    const id = req.params.id;          
    const { quantity } = req.body;

    if (quantity == null || quantity < 0) {
        return res.status(400).json({ message: "Invalid quantity" });
    }

    cartModel.findOneAndUpdate(
        { id: id },
        { $set: { quantity: quantity } },
        { new: true }                      
    )
    .then(updatedItem => {
    if (!updatedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    res.status(200).json({ message: "Quantity updated successfully", updatedItem });
    })
    .catch(err => res.status(500).json({ message: err.message || "Internal server error" }));
}