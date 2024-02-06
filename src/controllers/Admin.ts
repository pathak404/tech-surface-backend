import { Request, Response } from "express";
import Admin from "../models/Admin";
import mongoose from "mongoose";


export const addAdmin = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        const admin = new Admin({
            _id: new mongoose.Types.ObjectId(), 
            name, 
            email,
        })

        admin.setPassword(password)
        const savedAdmin = await admin.save()
        res.sendResponse({
            message: "Admin data added successfully",
            admin: savedAdmin
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new admin"
        }, 500)
    }
}

export const getAdmin = async (req: Request, res: Response) => {
    try{
        const adminId = req.params.adminId
        // projection - (0 to exclude, 1 to include only that key in the result)
        const savedAdmin = await Admin.findOne({adminId}, { password: 0 }) 
        if(savedAdmin && savedAdmin.password){
            res.sendResponse({
                message: "Admin data fetched successfully",
                admin: savedAdmin
            })
        }else {
            res.sendResponse({
                message: "No admin found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching admin data"
        }, 500)
    }
}


export const updateAdmin = async (req: Request, res: Response) => {
    try{
        if(req.isAdmin && req.userId === req.params.adminId){
            const {name, email, password} = req.body
            const admin = {
                name, 
                email,
                password,
            }

            const updatedAdmin = await Admin.findOneAndUpdate({adminId: req.params.adminId}, admin, {
                new: true
            })
            
            res.sendResponse({
                message: "Admin data updated successfully",
                admin: updatedAdmin
            })
        }else{
            res.sendResponse({message: "You cannot modify other admins data"}, 403)
        }
    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing admin data"
        }, 500)
    }
}

