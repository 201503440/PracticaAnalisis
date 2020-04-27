const connection = require('../DB/dbconnection').config()
exports.setUser = function (req, res) {

    var username = req.body.username;

    connection.query(   `INSERT INTO MyGuests(firstname)
                        VALUES(?);`,
        [username],
        function (error, results, fields) {
            if (error) throw error;

            res.json(
                {
                    status: 'correcto',
                    info: 'Usuario insertado correctamente'
                }
            );

        });


}

exports.getUser = function (req, res) {

    connection.query(`SELECT *
                      FROM MyGuests`,
        [/*PARAMETROS A,B,C*/],
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