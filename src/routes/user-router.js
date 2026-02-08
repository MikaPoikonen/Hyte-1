import express from 'express';
import {getUsersController, postLogin, postUser,getUSerByIdController} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter.route('/')
// GET all users
.get(getUsersController)
// POST new user
userRouter.post('/',postUser);

userRouter.get('/:id',getUSerByIdController)
// POST user login
userRouter.post('/login', postLogin);

//add new user


// TODO: get user by id
// app.get('/api/users/:id');
// TODO: put user by id
// TODO: delete user by id

export default userRouter;
