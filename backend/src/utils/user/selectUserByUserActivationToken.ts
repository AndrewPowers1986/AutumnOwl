import {connect} from "../database.utils";

export async function selectUserByUserActivationToken(userActivationToken: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userEmail, userHash FROM user WHERE userActivationToken = :userActivationToken', {userActivationToken});
        // @ts-ignore is required so that rows can be interacted with like the array it is
        return rows.length !== 0 ? {...rows[0]} : undefined;
    } catch (error: any) {
        throw error;
    }
}