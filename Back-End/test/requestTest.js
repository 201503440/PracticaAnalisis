var chai = require('chai'), chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var app = 'localhost:3000';

describe("Pruebas Unitarias del Controlador RequestCredit", function () {
    describe("Solicitar un credito a la administración", function () {

        it("Solicitar Crédito", function (done) {
            // Send some Form Data
            chai.request(app)
                .post('/requestCredit')
                .send({
                    'monto': 1000,
                    'descripcion': 'Esta es una descripción desde mocha',
                    'cuenta': 1,
                    'usuario': 1
                })
                .end(function (err, res) {
                    expect(res.body.status).to.equal("correcto");
                    done();
                });
        });



    });
});
