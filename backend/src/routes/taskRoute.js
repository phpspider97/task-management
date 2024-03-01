import express from 'express'
const router = express.Router() 
import { taskController } from '../controllers/taskController.js'
import {authCheck} from '../middlewares/authMiddleware.js'

router.get('/task-analysis/:id?',authCheck,taskController.analysisTask)
router.get('/perticular-task-list/:id',authCheck,taskController.perticularTask)
router.get('/task-list',authCheck,taskController.allTask)
router.post('/add-task',authCheck,taskController.addTask)
router.put('/edit-task/:id',authCheck,taskController.editTask)
router.delete('/delete-task/:id',authCheck,taskController.deleteTask)
router.put('/update-task-status/:id',authCheck,taskController.editTaskStatus)
router.post('/search-task',authCheck,taskController.searchTask)
router.get('/sort-task/:id',authCheck,taskController.sortTask)
router.get('/incoming-task',authCheck,taskController.incomingTask)

export default router