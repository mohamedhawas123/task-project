import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    taskId: {
        type:  mongoose.Schema.Types.ObjectId,
        unique:true,
        


    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User  '
    },

    taskName:{
        type:String,
        required: true,

    },

    description :{
        type:String,
        required: true,
        
    },
    dueDate :{
        type: Date,
    },
    isCompleted : {
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
    
    }

)


const TaskModels = mongoose.model('Task',  TaskSchema)
export default TaskModels

