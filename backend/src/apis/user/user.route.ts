import {Router} from "express";
import {isAdmin} from "../../utils/controllers/isAdmin";
import {deleteUserByUserEmailController} from "./user.controller";

export const userRoute = Router();

userRoute.route('/email/:userEmail')
    .delete(isAdmin, deleteUserByUserEmailController)