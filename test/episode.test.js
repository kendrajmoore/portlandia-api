const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(server);

const Episode = require("../models/episodes");

// const { message } = require("../helpers");

describe("Episode Endpoints", () => {
    describe("/GET All episodes", () => {
        it("should get all episodes", done => {
            chai.request(server)
                .get("/portlandia/episode")
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

    describe("/GET Single episode with id: 1", () => {
        it("should get one episode with id: 1", done => {
            chai.request(server)
                .get("/portlandia/episode/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.id.should.be.eql(1);
                    done();
                });
        });

        it("should have a keys", done => {
            chai.request(server)
                .get("/api/episode/1")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    Object.keys(res.body).should.be.eql([
                        "image",
                        "title",
                        "summary"
                    ]);
                    done();
                });
        });
    });

    describe("/GET Error messages", () => {
        it("should get an error message with id:12345", done => {
            chai.request(server)
                .get("/portlandia/episode/12345")
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a("object");
                    res.body.should.have
                        .property("error")
                        .include(message.noEpisode);
                    done();
                });
        });

        it("should get an error message with id:asdasd", done => {
            chai.request(server)
                .get("/portlandia/episode/asdasd")
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
                .get("/portlandia/episode/1,2]")
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
                .get("/portlandia/episode/[1,2")
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
                .get("/portlandia/episode/[1,asdasd]")
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
});
