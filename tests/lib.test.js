test("Our first test", () => {
    throw new Error("something failed");
});

//testing objects

describe("getCharacters", () => {
    it("should return a character with the given id", () => {
        const result = lib.getCharacters(1);
        except(result).toBe({ id: 1 });
    });
});

describe("getEspisodes", () => {
    it("should return an espisode with the given id", () => {
        const result = lib.getEspisodes(1);
        except(result).toBe({ id: 1 });
    });
});
