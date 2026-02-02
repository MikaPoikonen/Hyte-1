import express from 'express';
import {
  deleteItemById,
  getItemById,
  getItems,
  postItem,
  putItemById,
} from '../controllers/item-controller.js';

const itemRouter = express.Router();

itemRouter
  .route('/')
  .get(getItems) //get items
  .post(postItem); // post item

//GET ites based it
itemRouter
  .route('/:id')
  .get(getItemById) //hakee controllerista
  //Put route for items
  .put(putItemById)
  //DELETE item by id
  .delete(deleteItemById);

export default itemRouter;
