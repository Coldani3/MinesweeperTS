import BoardSize from "./BoardSize";

export class Difficulty {
    name: string;
    bombCount: number;
    boardSize: BoardSize;
    customDifficultyDescription: string = "";

    constructor(bombCount: number, boardSize: BoardSize, difficultyName: string)
    {
        this.bombCount = bombCount;
        this.boardSize = boardSize;
        this.name = difficultyName;
    }

    setCustomDifficultyDescription(description: string)
    {
        this.customDifficultyDescription = description;
        return this;
    }
}

export let EasyDifficulty = new Difficulty(10, new BoardSize(9, 9), "Easy");
export let MediumDifficulty = new Difficulty(40, new BoardSize(16, 16), "Medium");
export let HardDifficulty = new Difficulty(99, new BoardSize(30, 16), "Hard");
export let RussianRouletteDifficulty = new Difficulty((30 * 16) / 2, new BoardSize(30, 16), "Russian Roulette").setCustomDifficultyDescription("50% of tiles are bombs");