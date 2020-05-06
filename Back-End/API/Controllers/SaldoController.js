const connection = require('../DB/dbconnection').config()

exports.getSaldo = function (req, res) {

    connection.query(`SELECT SaldoTotal
                    FROM Cuenta
                    WHERE idCuenta = ?;`,
        [req.body.idCuenta],
        function (error, results, fields) {
            if (error) throw error;           
            if (results.length > 0) {
                res.json(
                    {
                        status: 1,
                        info: results[0].SaldoTotal
                    }
                );
            } else {
                console.log(results)
                res.json(
                    {
                        status: 0,
                        info: results
                    }
                );
            }
        });
}