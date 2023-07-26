import mongoose from 'mongoose'



export const connect =  async () => {
    try {

        const conn = await mongoose.connect("mongodb+srv://saif:panzer123@cluster0.0ko53uh.mongodb.net/?retryWrites=true&w=majority", {
        })
        console.log(`mongoose is connected ${conn.connection.host}`)


    }catch(e:any) {
        console.log(`Error: ${e.message}`)
        process.exit(1)
    }
}


