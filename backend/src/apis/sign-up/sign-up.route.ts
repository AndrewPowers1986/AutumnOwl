import { Router } from 'express';
import { signupUserController } from './sign-up.controller';
import { signupValidator } from './sign-up.validator';
import { asyncValidatorController } from '../../utils/controllers/asyncValidator.controller';
import {activationController}from "./activation.controller";
import {param} from "express-validator";

const { checkSchema } = require('express-validator');

export const signUpRoute = Router();

signUpRoute.route('/:userEmail/:userPassword')
    .post(
        asyncValidatorController(checkSchema(signupValidator)),
        signupUserController
    );

signUpRoute.route('/activation/:activation')
    .get(
        asyncValidatorController([param("activation", "invalid activation link").isHexadecimal().notEmpty()]),
        activationController
    );