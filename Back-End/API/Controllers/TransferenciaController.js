const connection = require('../DB/dbconnection').config()

exports.Transferir = function (req, res) {
    connection.query(`SELECT *
                    FROM Cuenta
                    WHERE idCuenta = ?;`,
                    [req.body.idCuentaD],
        function (error, results, fields) {
            if (error) throw error;            
            if (results.length > 0) {//Aqui la cuenta existe y se puede completar la transferencia
                connection.query(`UPDATE Cuenta
                                SET 
                                    SaldoTotal = SaldoTotal-?
                                WHERE
                                    idCuenta = ?;
                                UPDATE Cuenta
                                SET 
                                    SaldoTotal = SaldoTotal+?
                                WHERE
                                    idCuenta = ?;`,
                [req.body.SaldoTotal, req.body.idCuenta, req.body.SaldoTotal, req.body.idCuentaD],
                    function (error, results) {
                    if (error) throw error;
                    res.json(
                    {
                        status: 1,
                        info: results.insertId
                    });
                });
            }else{//Aqui la cuenta no existe y se no puede completar la transferencia
                res.json(
                    {
                        status: 0,
                        info: 'Cuenta destino no existe'
                    });
            } 
        });//Fin funcion cuenta destino existe
}

exports.Saldo = function (req, res){    
    connection.query(`SELECT *
                    FROM Cuenta 
                    WHERE idCuenta = ?
                    AND SaldoTotal >= ?;`,
        [req.body.idCuenta, req.body.SaldoTotal],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json(
                    {
                        status: 1,
                        info: 'Es posible hacer la transferencia.'
                    }                    
                );
            }else{
                res.json(
                    {
                        status: 0,
                        info: 'Saldo insuficiente.'
                    }
                );
            }            
    });
}