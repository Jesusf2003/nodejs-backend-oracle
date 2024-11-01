const { getConnection } = require("./config")

async function getAll(req, res) {
    let connection = await getConnection();
    try {
        const result = await connection.execute(`SELECT * FROM datasoft.carrera`);
        res.status(200)
            .json(result.rows);
    } catch (error) {
        return res.send(error.message);
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log("Connection closed success");
            } catch (err) {
                console.error(err.message)
            }
        }
    }
}

async function saveData(req, res) {
    let connection = await getConnection();
    try {
        const {identificador, nombre, descripcion} = req.body;
        const sql = `INSERT INTO datasoft.carrera (identificador, nombre, descripcion) VALUES (:identificador, :nombre, :descripcion)`;
        connection.execute(sql, [identificador, nombre, descripcion], {autoCommit: true});
        res.json({
            message: "Data has been saved."
        })
    } catch (error) {
        return res.status(500)
        .send(error.message)
    } finally {
        if (connection) {
            await connection.close()
        }
    }
}

async function updateData(req, res) {
    let connection = await getConnection();
    try {
        const {identificador, nombre, descripcion, id} = req.body;
        const sql = `UPDATE datasoft.carrera SET identificador = :identificador, nombre = :nombre, descripcion = :descripcion WHERE id = :id`;
        await connection.execute(sql, {identificador, nombre, descripcion, id}, {autoCommit: true});
        res.json({message: 'Data has been updated.'})
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        if (connection) {
            await connection.close()
        }
    }
}

module.exports = { getAll, saveData, updateData }