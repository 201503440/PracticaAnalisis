const connection = require('../DB/dbconnection').config()

exports.Login = function (req, res) {

    connection.query(   `select *
                        from Usuario u inner join Cuenta c
                        on u.idUsuario = c.Usuario_idUsuario
                        where u.UserName = ? 
                        and u.password = ?
                        and c.idCuenta = ?;`,
                        [req.body.UserName,req.body.Password, req.body.idUsuario],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                res.json(results[0]);
            }else{
                res.json(
                    {
                        status: 0,
                        info: 'Informacion no valida.'
                    }
                )
            }
    });
}
