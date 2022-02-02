import express, { Application } from 'express';
const session = require("express-session");
import passport = require('passport');
const MemoryStore = require('memorystore')(session);

import morgan from 'morgan';

//Routes
//import {signInRoute} from "./apis/sign-in/sign-in.route";
//import {signOutRoute} from "./apis/sign-out/sign-out.route";
import {signUpRoute} from "./apis/sign-up/sign-up.route";
import {userRoute} from "./apis/user/user.route";
import {passportStrategy} from "./apis/sign-in/sign-in.controller";
import {signInRoute} from "./apis/sign-in/sign-in.route";
//import {userRoute} from "./apis/user/user.route";

//import {passportStrategy} from "./apis/sign-in/sign-in.controller";

export class App {
    app: Application;

    constructor (
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    public settings () : void {
        this.app.set('port', this.port || process.env.PORT || 4200);
    }

    private middlewares () : void {
        const sessionConfig = {
            store: new MemoryStore({
                checkPeriod: 100800
            }),
            secret: "secret",
            saveUninitialized: true,
            resave: true,
            maxAge: "3h"
        };
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(session(sessionConfig));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        passport.use(passportStrategy);
    }

    private routes () : void {
        this.app.use('/sign-up', signUpRoute);
        this.app.use('/sign-in', signInRoute);
        //this.app.use('/sign-out', signOutRoute);
        this.app.use('/user', userRoute);
    }

    public async listen () : Promise <void> {
        await this.app.listen(this.app.get('port'));
        console.log('Express application built successfully');
    }
}