import { Logic } from "../../../src/model/game/Logic";

describe("LogicTest initialize test", () =>
{
    test("params default value", () => {
        const logic = new Logic(10);
        expect(logic.pieceList.length).toBe(4);
        expect(logic.score).toBe(0);
        expect(logic.number).toBe(10);
        expect(logic.subNumber).toBe(0);
        expect(logic.maxX).toBe(0);
        expect(logic.lock).toBe(false);
        expect(logic.moveDisplayObject).toBe(null);
    });
});
