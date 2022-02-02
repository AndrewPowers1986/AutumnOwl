import {User} from "./utils/interfaces/User";
import {App} from "./App";

declare module 'express-session' {
    export interface SessionData {
        user: User|undefined;
        signature: string|undefined;
        jwt: string|undefined
    }
}
async function main () {
    try {
        const app = new App(4200);
        await app.listen();
    } catch (error: any) {
        console.log(error);
    }
}

main().catch(error => console.error(error));