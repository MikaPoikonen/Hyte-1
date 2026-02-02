import express from 'express';
import { deleteUserById, getUserid, getUsers, postLogin, postUser } from '../controllers/user-contoller.js';
const userRouter = express.Router();


userRouter.route('/')
.get(getUsers)
.post(postUser);
// post user
userRouter.post('/login',postLogin);
// getuser by id
userRouter.get('/login',getUserid);
// update / put user
userRouter.put('/login',getUserid);
// delete user by id
userRouter.delete('/login',deleteUserById);


  export default userRouter;