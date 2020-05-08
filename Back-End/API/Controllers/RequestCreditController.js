const connection = require('../DB/dbconnection').config()

exports.requestCredit = function (req, res) {

    var monto = req.body.monto;
    var descripcion = req.body.descripcion;
    var cuenta = req.body.cuenta;
    var usuario = req.body.usuario;

    connection.query(`INSERT INTO Credito(MontoASolicitar,Descripcion,NumeroCuenta,Usuario_idUsuario,estado,fecha_solicitud,fecha_resolucion,fecha_pago,cancelado)
                        VALUES(?,?,?,?,2,CURRENT_TIMESTAMP(),null,null,false);`,
        [monto, descripcion, cuenta, usuario],
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

    connection.query(`SELECT c.idCredito, u.UserName, c.MontoASolicitar, c.fecha_solicitud, c.estado FROM Credito c, Usuario u
                            WHERE c.Usuario_idUsuario=u.idUsuario
                            ORDER BY c.fecha_solicitud DESC;`,
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

    connection.query(`SELECT c.idCredito, c.MontoASolicitar, c.Descripcion, c.estado,c.fecha_resolucion,c.fecha_solicitud,c.fecha_pago,c.NumeroCuenta,u.Nombre,u.UserName, c.cancelado FROM Credito c, Usuario u
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
    var fechaPago = req.body.fechaPago
    var idCredito = req.body.idCredito;

    
    connection.query(   `UPDATE Cuenta
                        SET 
                            SaldoTotal = SaldoTotal+?
                        WHERE
                            idCuenta = ?;
                        UPDATE Credito
                        SET
                            estado = 1,
                            fecha_resolucion=CURRENT_TIMESTAMP,
                            fecha_pago=?
                        WHERE
                            idCredito=?;`,
                        [monto,cuenta,fechaPago,idCredito],
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

    connection.query(`UPDATE Credito
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


exports.getCreditsToPay = function (req, res) {

    connection.query(`SELECT c.idCredito, c.MontoASolicitar, c.NumeroCuenta, u.UserName, u.Nombre, c.fecha_pago, c.fecha_resolucion, c.fecha_solicitud, r.SaldoTotal, (CASE WHEN c.MontoASolicitar <= r.SaldoTotal THEN 1 ELSE 0 END) AS posible_cobrar  FROM Credito c, Usuario u, Cuenta r
                        WHERE c.cancelado=0
                        AND c.fecha_pago<CURDATE()
                        AND c.Usuario_idUsuario=u.idUsuario
                        AND c.NumeroCuenta=r.idCuenta;`,
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


exports.payCredit = function (req, res) {

    var monto = req.body.monto;
    var cuenta = req.body.cuenta;
    var idCredito = req.body.idCredito;
    var idUsuario = req.body.idUsuario
    var descripcion = req.body.descripcion

    
    connection.query(   `UPDATE Cuenta
                        SET 
                            SaldoTotal = SaldoTotal-?
                        WHERE
                            idCuenta = ?;
                        UPDATE Credito
                        SET
                            cancelado = 1
                        WHERE
                            idCredito=?;
                        INSERT INTO Debito(MontoDebitar,Usuario_idUsuario,descripcion)
                        VALUES(?,?,?)`,
                        [monto,cuenta,idCredito,monto,idUsuario,descripcion],
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


exports.getBalance = function (req, res) {

    var monto = req.body.monto;
    var idCuenta = req.body.idCuenta;

    connection.query(`SELECT u.idUsuario, (CASE WHEN c.SaldoTotal>=? THEN 1 ELSE 0 END) AS posible_pagar FROM Cuenta c, Usuario u
                        WHERE u.idUsuario=c.Usuario_idUsuario
                        AND c.idCuenta=?;`,
                        [monto,idCuenta],
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


exports.debitBalance = function (req, res) {

    var monto = req.body.monto;
    var cuenta = req.body.cuenta;
    var idUsuario = req.body.idUsuario
    var descripcion = req.body.descripcion

    
    connection.query(   `UPDATE Cuenta
                        SET 
                            SaldoTotal = SaldoTotal-?
                        WHERE
                            idCuenta = ?;
                        INSERT INTO Debito(MontoDebitar,Usuario_idUsuario,descripcion)
                        VALUES(?,?,?)`,
                        [monto,cuenta,monto,idUsuario,descripcion],
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