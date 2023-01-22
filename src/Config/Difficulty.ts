import BoardSize from "./BoardSize";

export class Difficulty {
    name: string;
    bombCount: number;
    boardSize: BoardSize;

    constructor(bombCount: number, boardSize: BoardSize, difficultyName: string)
    {
        this.bombCount = bombCount;
        this.boardSize = boardSize;
        this.name = difficultyName;
    }
}

export let EasyDifficulty = new Difficulty(10, new BoardSize(9, 9), "Easy");
export let MediumDifficulty = new Difficulty(40, new BoardSize(16, 16), "Hard");
export let HardDifficulty = new Difficulty(99, new BoardSize(30, 16), "Hard");