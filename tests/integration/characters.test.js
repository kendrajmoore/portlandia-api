const request = require("supertest");
const { Character } = require("../../models/character");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/character", () => {
    beforeEach(() => {
        server = require("../../index");
    });
    afterEach(async () => {
        await server.close();
        await Genre.remove({});
    });

    describe("GET /", () => {
        it("should return all characters", async () => {
            const character = [{ name: "Carrie" }, { name: "Fred" }];

            await character.collection.insertMany(characters);

            const res = await request(server).get("/api/characters");

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === "Carrie")).toBeTruthy();
            expect(res.body.some(g => g.name === "Fred")).toBeTruthy();
        });
    });

    describe("GET /:id", () => {
        it("should return a genre if valid id is passed", async () => {
            const character = new Character({ name: "Carrie" });
            await character.save();

            const res = await request(server).get(
                "/api/character/" + character._id
            );

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", character.name);
        });

        it("should return 404 if invalid id is passed", async () => {
            const res = await request(server).get("/api/characters/1");

            expect(res.status).toBe(404);
        });

        it("should return 404 if no genre with the given id exists", async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get("/api/characters/" + id);

            expect(res.status).toBe(404);
        });
    });

    describe("POST /", () => {
        // Define the happy path, and then in each test, we change
        // one parameter that clearly aligns with the name of the
        // test.
        let token;
        let name;

        const exec = async () => {
            return await request(server)
                .post("/api/characters")
                .set("x-auth-token", token)
                .send({ name });
        };

        beforeEach(() => {
            token = new User().generateAuthToken();
            name = "Carrie";
        });

        it("should return 401 if client is not logged in", async () => {
            token = "";

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it("should save the character if it is valid", async () => {
            await exec();

            const character = await Character.find({ name: "character" });

            expect(character).not.toBeNull();
        });

        it("should return the character if it is valid", async () => {
            const res = await exec();

            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name", "character");
        });
    });

    describe("PUT /:id", () => {
        let token;
        let newName;
        let character;
        let id;

        const exec = async () => {
            return await request(server)
                .put("/api/character/" + id)
                .set("x-auth-token", token)
                .send({ name: newName });
        };

        beforeEach(async () => {
            // Before each test we need to create a genre and
            // put it in the database.
            character = new Character({ name: "Carrie" });
            await character.save();

            token = new User().generateAuthToken();
            id = character._id;
            newName = "updatedName";
        });

        it("should return 401 if client is not logged in", async () => {
            token = "";

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it("should return 404 if id is invalid", async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it("should return 404 if character with the given id was not found", async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it("should update the character if input is valid", async () => {
            await exec();

            const updatedCharacter = await Character.findById(character._id);

            expect(updatedCharacter.name).toBe(newName);
        });

        it("should return the updated character if it is valid", async () => {
            const res = await exec();

            expect(res.body).toHaveProperty("_id");
            expect(res.body).toHaveProperty("name", newName);
        });
    });

    describe("DELETE /:id", () => {
        let token;
        let genre;
        let id;

        const exec = async () => {
            return await request(server)
                .delete("/api/characters/" + id)
                .set("x-auth-token", token)
                .send();
        };

        beforeEach(async () => {
            // Before each test we need to create a genre and
            // put it in the database.
            character = new Character({ name: "Carrie" });
            await character.save();

            id = character._id;
            token = new User({ isAdmin: true }).generateAuthToken();
        });

        it("should return 401 if client is not logged in", async () => {
            token = "";

            const res = await exec();

            expect(res.status).toBe(401);
        });

        it("should return 403 if the user is not an admin", async () => {
            token = new User({ isAdmin: false }).generateAuthToken();

            const res = await exec();

            expect(res.status).toBe(403);
        });

        it("should return 404 if id is invalid", async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it("should return 404 if no genre with the given id was found", async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it("should delete the character if input is valid", async () => {
            await exec();

            const genreInDb = await Character.findById(id);

            expect(characterInDb).toBeNull();
        });

        it("should return the removed character", async () => {
            const res = await exec();

            expect(res.body).toHaveProperty("_id", character._id.toHexString());
            expect(res.body).toHaveProperty("name", character.name);
        });
    });
});
