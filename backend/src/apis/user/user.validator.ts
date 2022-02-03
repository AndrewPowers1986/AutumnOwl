import {Schema} from "express-validator";

export const userValidator: Schema = {
    userId: {
        isUUID: {
            errorMessage: 'Please provide a valid userId.'
        }
    },
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email.'
        }
    }
}