import Board from "./Board";
import * as HTMLIds from "./HTMLIds"

export type UserNumberInput = JQuery<HTMLInputElement>;
export type DropdownElement = HTMLSelectElement;
export type DebugButton = JQuery<HTMLElement>;
export type GameGrid = JQuery<HTMLElement>;
export type GameArea = JQuery<HTMLElement>;
export type GameGridButton = JQuery<HTMLElement>;

export const buttonSize: number = 30;
export const gameAreaPaddingBottom: number = 100;

export class GridButton
{
    button: GameGridButton;
    gridX: number;
    gridY: number;

    constructor(gridButton: GameGridButton, gridX: number, gridY: number)
    {
        this.button = gridButton;
        this.gridX = gridX;
        this.gridY = gridY;
    }

    isFlagged() : boolean
    {
        return this.button.hasClass("flag");
    }

    flag(board: Board)
    {
        this.button.addClass("flag");
        board.placeFlagAt(this.gridX, this.gridY);
    }

    unflag(board: Board)
    {
        this.button.removeClass("flag");
        board.removeFlagAt(this.gridX, this.gridY);
    }

    isRevealed() : boolean
    {
        return this.button.hasClass("revealedButton");
    }

    reveal()
    {
        this.button.addClass("revealedButton");
    }
}

class UIElements
{
    customRowElement() : UserNumberInput
    {
        return $(HTMLIds.customRowCountID);
    }

    customColumnElement() : UserNumberInput
    {
        return $(HTMLIds.customColumnCountID);
    }

    customBombCount() : UserNumberInput
    {
        return $(HTMLIds.customBombCount);
    }

    difficultyDropdownElement() : DropdownElement
    {
        return document.getElementById("difficultyDropdown") as DropdownElement;
    }

    debugButton() : DebugButton
    {
        return $(HTMLIds.debugButton);
    }

    gameGrid() : GameGrid
    {
        return $(HTMLIds.gameGrid);
    }

    gameArea() : GameArea
    {
        return $(HTMLIds.gameArea);
    }

    bombCount() : JQuery<HTMLElement>
    {
        return $(HTMLIds.bombCount);
    }

    gridButtonAt(gridX: number, gridY: number) : GridButton
    {
        return new GridButton($(`#b${gridX}-${gridY}`), gridX, gridY);
    }
}

export const UI = new UIElements();