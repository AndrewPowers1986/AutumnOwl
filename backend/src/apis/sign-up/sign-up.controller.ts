import {Request, Response} from "express";
import "express-session";
import {setActivationToken, setHash} from "../../utils/auth.utils";
import {User} from "../../utils/interfaces/User";
import {insertUser} from "../../utils/user/insertUser";
import MailComposer from "nodemailer/lib/mail-composer";
import {Status} from "../../utils/interfaces/Status";


const mailgun = require("mailgun-js");

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)

export async function signupUserController(request: Request, response: Response) : Promise<Response|undefined> {
    try {
        const {userEmail, userPassword} = request.params;
        const userHash = await setHash(userPassword);
        const userActivationToken = setActivationToken();
        let date = new Date();
        const userStartDate = date.toISOString().slice(0, 19).replace('T', ' ');
        const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}/activation/${userActivationToken}`;
        const message = `<p>In order to sign in, your account must be confirmed by an administrator.</p><p><a href="${basePath}">${basePath}</a></p>`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "Autumn Owl -- Account Activation",
            text: 'Test email text',
            html: message
        };

        const user: User = {
            userId: null,
            userActivationToken,
            userEmail,
            userHash
        };

        await insertUser(user);

        const emailComposer: MailComposer = new MailComposer(mailgunMessage);

        emailComposer.compile().build((error: any, message: Buffer) => {
            const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

            const compiledEmail = {
                to: userEmail,
                message: message.toString("ascii")
            }

            const status: Status = {
                status: 200,
                message: "User successfully created. Contact administrator for access.",
                data: null
            };

            mg.messages().sendMime(compiledEmail, (sendError: any, body: any) => {
                if(sendError) {
                    return response.json({
                        status: 418,
                        message: "Error sending email.",
                        data: null
                    });
                }
                return response.json(status);
            });
        });
    } catch (error: any) {
        return response.json({
            status: 500,
            message: error.message,
            data: null
        });
    }
}