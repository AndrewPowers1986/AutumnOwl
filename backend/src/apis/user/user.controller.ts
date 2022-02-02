import {Request, Response} from "express";
import {User} from "../../utils/interfaces/User";
import {Status} from "../../utils/interfaces/Status";
import {deleteUser} from "../../utils/user/deleteUser";
import {selectUserByUserEmail} from "../../utils/user/selectUserByUserEmail";

export async function deleteUserByUserEmailController(request: Request, response: Response): Promise <Response<string>> {
    try {
        const {userEmail} = request.params;
        const result = await selectUserByUserEmail(userEmail) as User;

        await deleteUser(result);

        const status: Status = {
            status: 200,
            message: 'User successfully deleted',
            data: null
        };

        return response.json(status);
    } catch (error: any) {
        return (
            response.json({
                status: 500,
                message: error.message,
                data: null
            })
        );
    }
}