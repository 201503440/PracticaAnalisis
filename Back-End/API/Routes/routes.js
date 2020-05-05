module.exports  = function(app) {
    var main = require('../Controllers/MainController.js');
    var test = require('../Controllers/TestController.js');
    var login = require('../Controllers/LoginController.js');
    var request = require('../Controllers/RequestCreditController');

    app.route('/').get(main.initMain);

    // ===================================== RUTAS ARIELBM =====================================
    app.route('/test/getUser').get(test.getUser);
    app.route('/test/setUser').post(test.setUser);
    app.route('/requestCredit').post(request.requestCredit);
    // =================================== FIN RUTAS ARIELBM ===================================

    // ===================================== RUTAS CESAR =======================================
    app.route('/login').post(login.Login);
    // =================================== FIN RUTAS CESAR =====================================

}