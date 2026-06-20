import express from "express";
const Router = express.Router(); 
import { addexpense , getexpense, deleteexpense , updateexpense, searchexpense} from "../controller/expenseController.js";
import {auth} from "../middlewares/userAuth.js"

Router.post("/",auth,addexpense);
Router.get("/",auth,getexpense);
Router.put("/:id",auth,updateexpense)
Router.delete("/:id",auth,deleteexpense);
Router.get("/search",auth,searchexpense)



export default Router;
