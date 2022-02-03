import {connect} from "../database.utils"
import {User} from "../interfaces/User"

export async function insertUser(user: User) {
    try {
        const mySqlConnection = await connect();
        const query : string = 'INSERT INTO user(userId, userActivationToken, userEmail, userHash) VALUES (UUID_TO_BIN(UUID()), :userActivationToken , :userEmail, :userHash)';

        await mySqlConnection.execute(query, user);

        return "User successfully created."
    }
    catch (error: any) {
        throw error;
    }
}