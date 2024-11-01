const { Router } = require("express");
const { getConnection } = require("../controller/config");
const router = Router();

router.get('/', [], async (req, res) => {
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
});

router.post('/', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { identificador, nombre, descripcion } = req.body;
        const sql = `INSERT INTO datasoft.carrera (identificador, nombre, descripcion) VALUES (:identificador, :nombre, :descripcion)`;
        connection.execute(sql, [identificador, nombre, descripcion], { autoCommit: true });
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
});

router.put('/:id', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const sql = `UPDATE datasoft.carrera SET nombre = :nombre, descripcion = :descripcion WHERE identificador = :id`;
        await connection.execute(sql, { nombre, descripcion, id }, { autoCommit: true });
        res.json({ message: 'Data has been updated.' })
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        if (connection) {
            await connection.close()
        }
    }
});

router.delete('/:id', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { id } = req.params;
        await connection.execute(`DELETE FROM datasoft.carrera WHERE identificador = :id`, [id], { autoCommit: true });
        res.send({
            message: "Data has been deleted."
        })
    } catch (err) {
        res.status(500).json({ message: "Error at delete data." });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

module.exports = router;