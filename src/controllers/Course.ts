import { Request, Response } from "express";
import Course from "../models/Course";
import mongoose from "mongoose";


export const addCourse = async (req: Request, res: Response) => {
    try{
        const {name, description} = req.body
        const course = new Course({
            _id: new mongoose.Types.ObjectId(), 
            name, 
            description,
        })

        const savedCourse = await course.save()
        res.sendResponse({
            message: "Course data added successfully",
            course: savedCourse
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while adding a new course"
        }, 500)
    }
}

export const getCourse = async (req: Request, res: Response) => {
    try{
        const courseId = req.params.courseId
        const savedCourse = await Course.findOne({courseId})
        if(savedCourse){
            res.sendResponse({
                message: "Course data fetched successfully",
                course: savedCourse
            })
        }else {
            res.sendResponse({
                message: "No course found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching course data"
        }, 500)
    }
}


export const getCourses = async (req: Request, res: Response) => {
    try{
        const savedCourse = await Course.find({}).sort({createdAt: -1})
        if(savedCourse){
            res.sendResponse({
                message: "Courses data fetched successfully",
                courses: savedCourse
            })
        }else {
            res.sendResponse({
                message: "No course found",
            }, 404)
        }

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while fetching courses data"
        }, 500)
    }
}



export const updateCourse = async (req: Request, res: Response) => {
    try{
        const {name, description} = req.body
        const course = {
            name, 
            description,
        }

        const updatedCourse = await Course.findOneAndUpdate({courseId: req.params.courseId}, course, {
            new: true
        })
        
        res.sendResponse({
            message: "Course data updated successfully",
            course: updatedCourse
        })

    }catch(err){
        console.log(err)
        res.sendResponse({
            message: "Error occurs while updaing course data"
        }, 500)
    }
}
