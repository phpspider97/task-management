import express from 'express'
const router = express.Router() 
import { userConstroller } from '../controllers/userController.js'
import {authCheck} from '../middlewares/authMiddleware.js'
import {uploadMiddleware} from '../middlewares/uploadMiddleware.js'
 
router.get('/list',userConstroller.getAllUser)
router.post('/register',userConstroller.registerUser)
router.post('/login',userConstroller.loginUser)
router.post('/update',[authCheck,uploadMiddleware.single('userImage')],userConstroller.updateUser)
router.get('/user-detail',authCheck,userConstroller.getUser)

export default router