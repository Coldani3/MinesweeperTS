import BoardSize from "./Config/BoardSize";
import Bomb from "./Bomb";
import Flag from "./Flag";
import GridObject from "./GridObject";

function searchGridObjList(x: number, y: number, list: GridObject[]) : boolean
{
    for (let object of list) 
    {
        if (object.xPos === x && object.yPos === y)
        {
            return true;
        }
    }

    return false;
}

export default class Board 
{
    size: BoardSize;
    bombs: Bomb[];
    flags: Flag[];

    constructor(boardSize: BoardSize)
    {
        this.size = boardSize;
    }

    bombAt(x: number, y: number) : boolean
    {
        return searchGridObjList(x, y, this.bombs);
    }

    placeBombAt(x: number, y: number)
    {
        this.bombs.push(new Bomb(x, y));
    }

    isFlagAt(x: number, y: number) : boolean
    {
        return searchGridObjList(x, y, this.flags);
    }

    placeFlagAt(x: number, y: number)
    {
        this.flags.push(new Flag(x, y));
    }

    inBounds(x: number, y: number): boolean
    {
        return 
            x <= this.size.columns - 1 &&
            x >= 0 &&
            y <= this.size.rows - 1 &&
            y >= 0;
    }

    searchForBombsAround(x: number, y: number) : number 
    {
        let bombsFound = 0;

        for (let boardX = -1; boardX <= 1; boardX++)
        {
            for (let boardY = -1; boardY <= 1; boardY++)
            {
                if (boardX == 0 && boardY == 0)
                {
                    continue;
                }
                else
                {
                    let currX = x + boardX;
                    let currY = y + boardY;
    
                    if (this.inBounds(currX, currY))
                    {
                        if (this.bombAt(currX, currY))
                        {
                            bombsFound++;
                        }
                    }
                }
            }
        }
    
        return bombsFound;
    }
}