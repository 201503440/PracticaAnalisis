const connection = require('../DB/dbconnection').config()

exports.requestCredit = function (req, res) {

    var username = req.body.username;
    var monto = req.body.monto;
    var descripcion = req.body.descripcion;
    var cuenta = req.body.cuenta;
    var usuario = req.body.usuario;

    connection.query(   `INSERT INTO Credito(MontoASolicitar,Descripcion,NumeroCuenta,Usuario_idUsuario,estado)
                        VALUES(?,?,?,?,2);`,
        [monto,descripcion,cuenta,usuario],
        function (error, results, fields) {
            if (error) throw error;

            res.json(
                {
                    status: 'correcto',
                    info: 'Solicitud ingresada correctamente'
                }
            );

        });


}