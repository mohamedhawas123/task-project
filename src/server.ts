import express, { Request, Response } from 'express';
import cors from 'cors';
import {connect} from './database/db'
import { router } from './routes/taskRoute';
import {routerAuth} from './routes/userRoutes'

const app = express()

app.use(express.json())


app.use(cors())


connect()





app.use('/api', router)
app.use('/api/auth', routerAuth)





app.listen(4000, () => console.log("i am running"))
