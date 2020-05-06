module.exports  = function(app) {
    var main = require('../Controllers/MainController.js');
    var test = require('../Controllers/TestController.js');
    var login = require('../Controllers/LoginController.js');
    var request = require('../Controllers/RequestCreditController');
    var registro = require('../Controllers/RegistroController.js');

    app.route('/').get(main.initMain);

    // ===================================== RUTAS ARIELBM =====================================
    app.route('/test/getUser').get(test.getUser);
    app.route('/test/setUser').post(test.setUser);
    app.route('/requestCredit').post(request.requestCredit);
    app.route('/getRequestCredit').get(request.getRequestCredit);
    app.route('/getRequestDetails/:id').get(request.getRequestDetails);

    app.route('/acceptRequest').post(request.acceptRequest);
    app.route('/cancelRequest').post(request.cancelRequest);
    // =================================== FIN RUTAS ARIELBM ===================================

    // ===================================== RUTAS CESAR =======================================
    app.route('/login').post(login.Login);
    app.route('/signup').post(registro.Registrar);
    // =================================== FIN RUTAS CESAR =====================================

}