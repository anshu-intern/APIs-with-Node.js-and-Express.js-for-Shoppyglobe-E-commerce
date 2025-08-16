import userModel from "../Model/user.model.js";


//Global error handler
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

//check existing user
export async function checkExistingUser(req,res,next){
    try{
        const {id, userName, password} = req.body;
        const user = await userModel.findOne({id: id});
        if(user){
            return res.status(409).json({message: "User with given ID already exists."});
        }
        next();
    } catch(err) {
        return res.status(500).json({ message: err.message || "Internal server error" });
    }

}

//check login input
export function validateLoginInput(req,res,next){
    if(!req.body){
        return res.status(400).json({message: "user details not entered"});
    }
    if(!req.body.userName){
        return res.status(400).json({message: "userName not entered"});
    }
    if(!req.body.password){
        return res.status(400).json({message: "password not entered"});
    }
    next();
}

//check register input
export function validateRegisterInput(req,res,next){
    if(!req.body){
        return res.status(400).json({message: "user details not entered"});
    }
    if(!req.body.id){
        return res.status(400).json({message: "id not entered"});
    }
    if(!req.body.userName){
        return res.status(400).json({message: "userName not entered"});
    }
    if(!req.body.password){
        return res.status(400).json({message: "password not entered"});
    }
    next();
}