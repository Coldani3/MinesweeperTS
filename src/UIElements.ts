import * as HTMLIds from "./HTMLIds"

export type UserNumberInput = JQuery<HTMLInputElement>;
export type DropdownElement = HTMLSelectElement;
export type DebugButton = JQuery<HTMLElement>;
export type GameGrid = JQuery<HTMLElement>;
export type GameArea = JQuery<HTMLElement>;

export const buttonSize: number = 30;
export const gameAreaPaddingBottom: number = 100;

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
}

export const UI = new UIElements();