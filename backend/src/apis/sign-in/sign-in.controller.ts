import {NextFunction, Request, Response} from "express";
import passport from "passport";
import {User} from "../../utils/interfaces/User";

import {v4 as uuidv4} from 'uuid';
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import passportLocal, {Strategy} from "passport-local";
import {selectUserByUserEmail} from "../../utils/user/selectUserByUserEmail";

export async function signInController(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const {userEmail, userPassword} = request.params;

        passport.authenticate(
            'local',
            {session: false},
            async (err: any, passportUser: User) => {
                const {userId} = passportUser;
                const signature: string = uuidv4();
                const authorization: string = generateJwt({userId, userEmail}, signature);

                const signInFailed = (message: string) => response.json({
                    status: 400,
                    message,
                    data: null
                });

                const signInSuccessful = () => {
                    if (request.session) {
                        request.session.user = passportUser;
                        request.session.jwt = authorization;
                        request.session.signature = signature;
                    }

                    response.header({
                        authorization
                    });

                    return response.json({
                        status: 200,
                        message: "Sign in successful.",
                        data: null
                    });
                };

                const isPasswordValid: boolean = passportUser && await validatePassword(passportUser.userHash, userPassword);

                return isPasswordValid ? signInSuccessful() : signInFailed("Invalid email or password.");
            }
        )(request, response, nextFunction)
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: null
        })
    }
}

const LocalStrategy = passportLocal.Strategy;

export const passportStrategy: Strategy = new LocalStrategy(
    {
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    },
    async (email, password, done) => {
        try {
            const user: User | undefined = await selectUserByUserEmail(email);
            return user ? done(null, user) : done(undefined, undefined, {message: 'Incorrect email or password.'});
        } catch (error: any) {
            return done(error);
        }
    }
);