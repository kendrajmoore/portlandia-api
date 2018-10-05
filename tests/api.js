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
                .get("/portlania")
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

    describe("Info Object", () => {
        it("should GET an Info object with determinated keys", done => {
            chai.request(server)
                .get("/api/character")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.info.should.be.a("object");
                    Object.keys(res.body.info).should.be.eql([
                        "count",
                        "pages",
                        "next",
                        "prev"
                    ]);
                    res.body.info.count.should.be.a("number");
                    res.body.info.pages.should.be.a("number");
                    res.body.info.next.should.be.a("string");
                    res.body.info.prev.should.be.a("string");
                    done();
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
                    res.body.should.have
                        .property("error")
                        .include(message.noPage);
                    done();
                });
        });
    });
