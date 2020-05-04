const connection = require('../DB/dbconnection').config()

exports.Login = function (req, res) {

    connection.query(   `select * 
                        from Usuario 
                        where UserName = ? and password = ?;`,
                        [req.body.UserName,req.body.Password],
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
