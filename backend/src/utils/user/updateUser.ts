import {User} from "../interfaces/User";
import {connect} from "../database.utils";

export async function updateUser(user: User|null) {
    try {

        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userActivationToken = :userActivationToken, userEmail = :userEmail, userHash = :userHash WHERE userId = UUID_TO_BIN(:userId)';

        await mysqlConnection.execute(query, user);
        return 'User successfully updated';

    } catch (error: any) {
        throw error;
    }
}