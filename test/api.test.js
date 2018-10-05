// process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);
// const { site, message } = require("../helpers");

describe("Generic API", () => {
    describe("Endpoints list", () => {
        it("should GET a list of endpoints", done => {
            chai.request(server)
                .get("/portlandia")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("characters")
                        .include("/portlandia/character");
                    res.body.should.have
                        .property("episodes")
                        .include("/portlandia/episode");
                    done();
                });
        });
    });
});

describe("API 404", () => {
    it("should get an error message", done => {
        chai.request(server)
            .get("/portlandia/ifc")
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a("object");
                res.body.should.have.property("error").include(message.noPage);
                done();
            });
    });
});
