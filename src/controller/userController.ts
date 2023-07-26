import { Request, Response } from 'express'
import User from '../models/user'
import generateToken from '../utilites/token'


export const userAuth =async   (req:Request, res:Response) => {


    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password)) ) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id) 
        })
    } else {
        res.status(401)
        throw new Error("InValid email or Password")
    }

    
}


export const registerUser = async (req:Request, res:Response) => {
    console.log("got here")
    const {name, email, password} = req.body

    const userExist = await User.findOne({email})

    if (userExist) {
        res.status(400)
        throw new Error("User already Exist")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email:user.email,
            token: generateToken(user._id) 
        })
        console.log(user)
    }else {
        res.status(400)
        throw new Error("something went wrong")
    }

}
