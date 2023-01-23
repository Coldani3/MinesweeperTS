import BoardSize from "./Config/BoardSize.js";
import Bomb from "./Bomb.js";
import Flag from "./Flag.js";
import GridObject from "./GridObject.js";
import { UI, GameGrid } from "./UIElements.js";

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

function randomRange(max: number)
{
    return Math.floor(Math.random() * max);
}

export default class Board 
{
    size: BoardSize;
    bombs: Bomb[];
    flags: Flag[];
    populated: boolean = false;

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

    removeFlagAt(x: number, y: number)
    {
        this.flags = this.flags.filter(function(flag: Flag) { flag.xPos != x && flag.yPos != y });
    }

    flagCount() : number
    {
        return this.flags.length;
    }

    inBounds(x: number, y: number): boolean
    {
        return  x <= this.size.columns - 1 &&
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
                //don't search this square
                if (boardX === 0 && boardY === 0)
                {
                    continue;
                }
                else
                {
                    let currX = x + boardX;
                    let currY = y + boardY;
    
                    if (this.inBounds(currX, currY) && this.bombAt(currX, currY))
                    {
                        bombsFound++;
                    }
                }
            }
        }
    
        return bombsFound;
    }

    //only called when a tile is pressed to ensure that the first tile the player presses is not a bomb
    spreadBombs(startClickX: number, startClickY: number, bombCount: number)
    {
        if (!this.populated)
        {
            for (let bombPlaced: number = 0; bombPlaced < bombCount; bombPlaced++)
            {
                let bombX: number = randomRange(this.size.columns);
                let bombY: number = randomRange(this.size.rows);

                if (!(bombX === startClickX && bombY === startClickY) && !this.bombAt(bombX, bombY))
                {
                    this.placeBombAt(bombX, bombY);
                }
                else
                {
                    bombPlaced--;
                    continue;
                }
            }

            this.populated = true;
        }
    }

    generateButtons()
    {
        let gameGrid: GameGrid = UI.gameGrid();

        //collect all HTML into one string to add at once, because that makes generating it much faster due to only one update to the DOM
        let htmlToAdd: string = "";

        for (let row: number = 0; row < this.size.rows; row++)
        {
            for (let col: number = 0; col < this.size.columns; col++)
            {
                htmlToAdd += `<div class='button' id='b${col}-${row}' onclick='main.buttonClicked(${col}, ${row})' oncontextmenu='main.onRightClick(${col}, ${row}); return false;'> </button></div>`;
            }
        }

        $(htmlToAdd).appendTo(gameGrid);
    }
}