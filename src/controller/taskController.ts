import { ObjectId } from "mongodb";
import  TaskModels  from "../models/task";
import { Request, Response } from 'express'
import User from "../models/user";

export const createTask =async (req:Request, res: Response) => {

    const {name, descrption, date, is_completed, duoTime} = req.body;

    const {userId} = req.query;


    try{

        const user = await User.findOne({
            _id: userId
        })

        if(!user) {
            throw new Error('user not found');

        }


        const task =  await TaskModels.create({
            user:user,
            taskId: new ObjectId,
            taskName:name,
            description: descrption,
            isCompleted:false,
            dueDate:duoTime
        })
        res.status(201).json(task);
    }catch(e) {
        console.log(`error ${e}`)
    }


}


export const getAllTask = async(req:Request, res:Response) => {
    const { page, perPage } = req.query;
    
    const pageNumber = parseInt(page as string)
    const itemsPerPage = parseInt(perPage as string);
    const totalTasks = await TaskModels.countDocuments({});
    const totalPages = Math.ceil(totalTasks / itemsPerPage);
    const skip = (pageNumber - 1) * itemsPerPage;

    console.log(skip)
    console.log(itemsPerPage)

    const tasks = await TaskModels.find({}).skip(skip).limit(itemsPerPage);

    res.status(200).json({
        tasks,
        totalPages
    });



}

export const getMyTasks = async(req:Request, res:Response) => {
    
    const {userId} = req.query;
    const user = await User.findOne({
        _id: userId
    })

    if(!user) {
        throw new Error('user not found');

    }


    const tasks = await TaskModels.find({
        user:user
    })

    res.status(200).json({
        tasks,
    });



}



export const updatCompleteTask = async(req:Request, res:Response) => {

    const taskId = req.params.id    
    console.log(taskId)

    const task = await TaskModels.findOne({
        taskId:taskId
    })
        if(!task) {
            throw new Error('Task not found');

        }else{
            task.isCompleted =!task.isCompleted;
         await   task.save();
            res.status(200).json(task)
        }

    


}

export const editMyTasks = async(req:Request, res:Response) => {

    const taskId = req.params.taskId    
    const {taskTitle, taskDescription} = req.body

    const task = await TaskModels.findOne({
        taskId:taskId
    })
        if(!task) {
            throw new Error('Task not found');

        }else{
            task.taskName = taskTitle
            task.description = taskDescription
            
         await   task.save();
            res.status(200).json(task)
        }

    


}


export const deleteTask = async(req:Request, res:Response) => {

    const taskId = req.params.id    
    console.log(taskId)

    const task = await TaskModels.findOne({
        taskId:taskId
    })
        if(!task) {
            throw new Error('Task not found');

        }else{
            
            await task.deleteOne()
            res.status(200).json({'success': 'deleted'})
        }

    


}