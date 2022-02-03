import {connect} from "../database.utils";

export async function selectUserByUserEmail(userEmail: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userEmail, userHash FROM user WHERE userEmail = :userEmail', {userEmail});
        // @ts-ignore is required so that rows can be interacted with like the array it is
        return rows.length !== 0 ? {...rows[0]} : undefined;
    } catch (error: any) {
        throw error;
    }
}