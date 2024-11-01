const { Router } = require("express");
const { getConnection } = require("./config");
const router = Router();

router.get('/', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const result = await connection.execute(`SELECT * FROM datasoft.ciclo`);
        res.status(200)
            .json(result.rows);
    } catch (err) {
        return res.send(err.message);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

router.post('/', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { nombre, fechaInicio, fechaFin } = req.body;
        const sql = `INSERT INTO datasoft.ciclo (nombre, fecha_inicio, fecha_fin) VALUES (:nombre, TO_DATE(:fechaInicio, 'DD/MM/YYYY'), TO_DATE(:fechaFin, 'DD/MM/YYYY'))`;
        connection.execute(sql, [nombre, fechaInicio, fechaFin], { autoCommit: true });
        res.json({
            message: "Data has been saved."
        });
    } catch (err) {
        return res.status(500).send(err.message);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

router.put('/:id', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { id } = req.params;
        const { nombre, fechaInicio, fechaFin } = req.body;
        const sql = `UPDATE datasoft.ciclo SET nombre = :nombre, fecha_inicio = TO_DATE(:fechaInicio, 'DD/MM/YYYY'), fecha_fin = TO_DATE(:fechaFin, 'DD/MM/YYYY') WHERE identificador = :id`;
        await connection.execute(sql, { nombre, fechaInicio, fechaFin, id }, { autoCommit: true });
        res.json({
            message: "Data has been updated."
        })
    } catch (err) {
        res.status(500).send(err.message);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

router.delete('/:id', [], async (req, res) => {
    let connection = await getConnection();
    try {
        const { id } = req.params;
        await connection.execute(`DELETE FROM datasoft.ciclo WHERE identificador = :id`, [id], { autoCommit: true });
        res.send({
            message: "Data has been deleted."
        })
    } catch (err) {
        res.status(err).json({ message: "Error at delete data." });
    } finally {
        if (connection) {
            await connection.close();
        }
    }
});

module.exports = router;