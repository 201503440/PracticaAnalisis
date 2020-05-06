const connection = require('../DB/dbconnection').config()

exports.Registrar = function (req, res) {
    connection.query(   `INSERT INTO Usuario(Nombre, UserName, Password, Correo)
                        VALUES(?, ?, ?, ?);`,
        [req.body.Nombre, req.body.UserName, req.body.Password, req.body.Correo],
        function (error, results, fields) {
            if (error) throw error;            
                connection.query(`INSERT INTO Cuenta(TipoCuenta,SaldoTotal,Usuario_idUsuario) 
                VALUES('Monetaria',0,last_insert_id());`,
                function (error, results) {
                   if (error) throw error;
                   res.json(
                    {
                        status: 1,
                        info: results.insertId
                    }                    
                );
            });            
        });
}