module.exports  = function(app) {
    var main = require('../Controllers/MainController.js');
    app.route('/').get(main.initMain);
    app.route('/testRoute').get(main.Test);
}