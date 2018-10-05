const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);

const Character = require("../models/characters");

// const { message } = require('../helpers')

describe("Character Endpoints", () => {
    describe("/GET All characters", () => {
        it("should get all characters", done => {
            chai.request(server)
                .get("/portlandia/character")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.info.should.be.a("object");
                    res.body.results.should.be.a("array");
                    res.body.results.length.should.be.eql(20);
                    done();
                });
        });
    });

    describe("/GET Single character with id: 1", () => {
        it("should get one character with id: 1", done => {
            chai.request(server)
                .get("/portlandia/character/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.id.should.be.eql(1);
                    done();
                });
        });

        it("should have a keys", done => {
            chai.request(server)
                .get("/api/character/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    Object.keys(res.body).should.be.eql(["id", "name"]);
                    done();
                });
        });
    });

    describe("/GET Error messages", () => {
        it("should get an error message with id:12345", done => {
            chai.request(server)
                .get("/portlandia/character/12345")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.noCharacter);
                    done();
                });
        });

        it("should get an error message with id:asdads", done => {
            chai.request(server)
                .get("/portlandia/character/asdasd")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.badParam);
                    done();
                });
        });

        it("should get an error message with id:1,2]", done => {
            chai.request(server)
                .get("/portlandia/character/1,2]")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.badArray);
                    done();
                });
        });

        it("should get an error message with id:[1,2", done => {
            chai.request(server)
                .get("/portlandia/character/[1,2")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.badArray);
                    done();
                });
        });

        it("should get an error message with id:[1,asdasd]", done => {
            chai.request(server)
                .get("/portlandia/character/[1,asdasd]")
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.badArray);
                    done();
                });
        });
    });

    describe("/GET characters with single query", () => {
        it("should get characters with name: Candance", done => {
            chai.request(server)
                .get("/portlandia/character?name=Candance")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.info.should.be.a("object");
                    res.body.results.should.be.a("array");
                    res.body.results.forEach(char => {
                        char.should.have.property("name").include("Rick");
                    });
                    done();
                });
        });
    });
});
