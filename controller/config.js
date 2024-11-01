const OracleDB = require("oracledb");

const config = {
    connectionString: "localhost:1521/xe",
    user: "system",
    password: "Ora1234",
};

const checkConnection = async () => {
    let connection;
    try {
        connection = await OracleDB.getConnection(config);
        console.log(`Connected to db`);
    } catch (err) {
        console.error(err.message);
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log(`Connection closed`);
            } catch (err) {
                console.error(err.message);
            }
        }
    }
};

const getConnection = async () => {
    let connection;
    try {
        connection = await OracleDB.getConnection(config);
        return connection;
    } catch (error) {
        console.error("Error al obtener conexión: ", error);
        throw error;
    }
};

module.exports = { getConnection };
