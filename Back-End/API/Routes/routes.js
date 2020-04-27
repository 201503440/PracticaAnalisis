module.exports  = function(app) {
    var main = require('../Controllers/MainController.js');
    var test = require('../Controllers/TestController.js');

    app.route('/').get(main.initMain);

    // ===================================== RUTAS ARIELBM =====================================
    app.route('/test/getUser').get(test.getUser);
    app.route('/test/setUser').post(test.setUser)
    // =================================== FIN RUTAS ARIELBM ===================================

}