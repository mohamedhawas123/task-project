import express from 'express';
import { createTask, getAllTask, updatCompleteTask, deleteTask, getMyTasks, editMyTasks } from '../controller/taskController';


export const router = express.Router();



router.route('/tasks').post(createTask)
router.route('/tasks').get(getAllTask)
router.route('/user/tasks').get(getMyTasks)
router.route('/user/:taskId/edit').patch(editMyTasks)

router.route('/tasks/:id').put(updatCompleteTask)
router.route('/tasks/:id').delete(deleteTask)

