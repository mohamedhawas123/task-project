import mongoose, { Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'


export interface IUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
  }

  export interface IUserModel extends Model<IUserDocument> {
  }
  

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },


}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function(enterdPassword:string) {
    return await bcrypt.compare(enterdPassword, this.password)
}

userSchema.pre('save', async function(next) {

    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export default User