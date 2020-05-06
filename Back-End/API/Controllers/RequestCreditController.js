const connection = require('../DB/dbconnection').config()

exports.requestCredit = function (req, res) {

    var username = req.body.username;
    var monto = req.body.monto;
    var descripcion = req.body.descripcion;
    var cuenta = req.body.cuenta;
    var usuario = req.body.usuario;

    connection.query(   `INSERT INTO Credito(MontoASolicitar,Descripcion,NumeroCuenta,Usuario_idUsuario,estado,fecha_solicitud,fecha_resolucion)
                        VALUES(?,?,?,?,2,CURRENT_TIMESTAMP(),null);`,
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


exports.getRequestCredit = function (req, res) {

    connection.query(   `SELECT c.idCredito, u.UserName, c.MontoASolicitar, c.fecha_solicitud, c.estado FROM Credito c, Usuario u
                            WHERE c.Usuario_idUsuario=u.idUsuario;`,
                            [],
        function (error, results, fields) {
            if (error) throw error;

            res.json(
                {
                    status: 'correcto',
                    info: results
                }
            );

        });


}


exports.getRequestDetails = function (req, res) {

    var id = req.params.id;

    connection.query(   `SELECT c.idCredito, c.MontoASolicitar, c.Descripcion, c.estado,c.fecha_resolucion,c.fecha_solicitud,c.NumeroCuenta,u.Nombre,u.UserName FROM Credito c, Usuario u
                        WHERE c.Usuario_idUsuario=u.idUsuario
                        AND c.idCredito=?;`,
                        [id],
        function (error, results, fields) {
            if (error) throw error;

            res.json(
                {
                    status: 'correcto',
                    info: results
                }
            );

        });


}

exports.acceptRequest = function (req, res) {

    var monto = req.body.monto;
    var cuenta = req.body.cuenta;
    var idCredito = req.body.idCredito;

    connection.query(   `UPDATE Cuenta
                        SET 
                            SaldoTotal = SaldoTotal+?
                        WHERE
                            idCuenta = ?;
                        UPDATE Credito
                        SET
                            estado = 1,
                            fecha_resolucion=CURRENT_TIMESTAMP
                        WHERE
                            idCredito=?;`,
                        [monto,cuenta,idCredito],
        function (error, results, fields) {
            if (error) throw error;

            res.json(
                {
                    status: 'correcto',
                    info: 'Crédito creado correctamente'
                }
            );

        });


}

exports.cancelRequest = function (req, res) {

    var idCredito = req.body.idCredito;

    connection.query(   `UPDATE Credito
                        SET
                            estado = 0,
                            fecha_resolucion=CURRENT_TIMESTAMP
                        WHERE
                            idCredito=?;`,
                        [idCredito],
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