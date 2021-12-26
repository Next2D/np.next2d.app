import { Logic } from "../../../src/model/game/Logic";

describe("LogicTest", () =>
{
    test("initialize test", () => {
        const logic = new Logic();
        expect(logic.pieceList.length).toBe(4);
        expect(logic.score).toBe(0);
        expect(logic.moveDisplayObject).toBe(null);
    });
});
