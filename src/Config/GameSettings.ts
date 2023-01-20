import BoardSize from "./BoardSize";

class Difficulty {
    name: string;
    bombCount: number;
    boardSize: BoardSize;

    constructor(bombCount: number, width: number, height: number, difficultyName: string)
    {
        this.bombCount = bombCount;
        this.boardSize = new BoardSize(width, height);
        this.name = difficultyName;
    }
}

export let EasyDifficulty = new Difficulty(10, 9, 9, "Easy");
export let MediumDifficulty = new Difficulty(40, 16, 16, "Hard");
export let HardDifficulty = new Difficulty(99, 30, 16, "Hard");

export default class GameSettings 
{
    size: BoardSize;
    bombCount: number;
    difficulty: Difficulty;

    constructor(gameDifficulty: Difficulty) 
    {
        switch (gameDifficulty)
        {
            case EasyDifficulty:
        }
    }
}