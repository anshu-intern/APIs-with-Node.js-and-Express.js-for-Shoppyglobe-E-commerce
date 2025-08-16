import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

//register user
export function registerUser(req,res){
    const {id, userName, password} = req.body;
    const user = new userModel({
        id : id,
        userName: userName,
        password: password
    });
    user.save().then(data => {
        res.status(201).json({message: "user created successfully." , user: data});
    })
    .catch(e => res.status(500).json({message: e.message || "Oops something went wrong"}));
}

 
//login user 
export async function loginUser(req,res){
    try {
        const JWT_secret = "userSecretKey";
        const {userName, password} = req.body;
        const user = await userModel.findOne({ userName });

        if (!user) {
            return res.status(401).json({ message: "Invalid userName or User not registered" });
        }

        if (password !== user.password){ 
            return res.status(401).json({ message: "Invalid password for the given username" })
        } 

        const payload = { userName: user.userName, id: user.id }
        const accessToken =  jwt.sign(payload, JWT_secret , {expiresIn: '10m'}); 

        res.status(200).json({message: "login successful",accessToken: accessToken});
    } 
    catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }

}