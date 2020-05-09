var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = 'localhost:3000';

describe("Pruebas Unitarias del Controlador RequestCredit", function () {
    describe("Debitar dinero de cuenta", function () {

        it("Debitar", function (done) {
            // Send some Form Data
            chai.request(app)
                .post('/debitBalance')
                .send({
                    'monto': 10,
                    'cuenta': 1,
                    'idUsuario': 1,
                    'descripcion': 'Esta es una descripción desde mocha'
                })
                .end(function (err, res) {
                    expect(res.body.status).to.equal("correcto");
                    done();
                });
        });
    });
});
