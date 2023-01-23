"use strict";

import Board from "./Board.js";
import BoardSize from "./Config/BoardSize.js";
import { Difficulty, EasyDifficulty, MediumDifficulty, HardDifficulty, RussianRouletteDifficulty } from "./Config/Difficulty.js";
//import * as HTMLIds from "./HTMLIds";
import {UI, DropdownElement, UserNumberInput, GameArea, GameGrid, buttonSize, gameAreaPaddingBottom, GridButton} from "./UIElements.js";

const difficulties: Difficulty[] = [
    EasyDifficulty,
    MediumDifficulty,
    HardDifficulty,
    RussianRouletteDifficulty
];

const defaultDifficulty: Difficulty = EasyDifficulty;
const debugMode: boolean = false;

export default class Main
{
    board: Board;
    running: boolean;
    nightModeActive: boolean;

    anyDifficultyDropdownOptionSelected(dropdown: DropdownElement): boolean
    {
        return dropdown.selectedIndex > -1;
    }

    usesCustomSize() : boolean
    {
        let rows: UserNumberInput = UI.customRowElement();
        let cols: UserNumberInput = UI.customColumnElement();
        return rows && (rows.val() as number) > 0 && cols && (cols.val() as number) > 0;
    }

    getCustomSize() : BoardSize
    {
        return new BoardSize(UI.customColumnElement().val() as number, UI.customRowElement().val() as number);
    }

    getDifficulty(): Difficulty
    {
        let difficultyDropdown: DropdownElement = UI.difficultyDropdownElement();

        if (!this.usesCustomSize())
        {
            if (this.anyDifficultyDropdownOptionSelected(difficultyDropdown))
            {
                return difficulties[difficultyDropdown.selectedIndex];
            }
        }
        else
        {
            let bombCount = UI.customBombCount().val() as number;
            return new Difficulty(bombCount, this.getCustomSize(), "Custom");
        }

        return defaultDifficulty;
    }

    clearDebugButton()
    {
        UI.debugButton().remove();
    }

    displayGrid(difficulty: Difficulty)
    {
        console.log("Displaying grid");
        let gameArea: GameArea = UI.gameArea();
        let gameGrid: GameGrid = UI.gameGrid();
        gameArea.css("display", "flex");

        this.board.generateButtons();

        gameArea.height(buttonSize * this.board.size.rows + gameAreaPaddingBottom);
        gameGrid.width(buttonSize * this.board.size.columns);
        gameGrid.height(buttonSize * this.board.size.rows);
    }

    checkHasGameBeenWon()
    {

    }

    start()
    {
        if (!this.running)
        {
            console.log("Test!");

            let difficulty: Difficulty = this.getDifficulty();

            this.board = new Board(difficulty.boardSize);

            if (!debugMode)
            {
                this.clearDebugButton();
            }

            this.displayGrid(difficulty);

            UI.bombCount().text(difficulty.bombCount);

            this.running = true;
        }
        else
        {
            this.reset();
        }
    }

    reset()
    {
        if (this.running)
        {
            let difficulty: Difficulty = this.getDifficulty();
            this.board = new Board(difficulty.boardSize);

            this.displayGrid(difficulty);
        }
    }

    toggleDebugMode()
    {

    }

    toggleNightmode()
    {
        if (!this.nightModeActive)
        {
            $("p").filter(function() { return $("p", this).hasClass("colouredText"); }).addClass("nightmodeText");
            $("label").addClass("nightmodeText");
            $("body").addClass("nightmodeMainBackground");
            $("#options").addClass("nightmodeBackground");
            $("#game").addClass("nightmodeBackground");
            $("span").addClass("nightmodeText");

            this.nightModeActive = true;
        }
        else
        {
            $(".nightmodeBackground").removeClass("nightmodeBackground");
            $(".nightmodeMainBackground").removeClass("nightmodeMainBackground");
            $(".nightmodeText").removeClass("nightmodeText");

            this.nightModeActive = false;
        }
    }

    //called from left clicking a tile
    buttonClicked(column: number, row: number)
    {
        if (this.running && this.board && !this.board.populated)
        {
            this.board.spreadBombs(column, row, this.getDifficulty().bombCount);
        }
    }

    //called from right clicking a tile
    onRightClick(column: number, row: number)
    {
        if (this.running)
        {
            let gridButton: GridButton = UI.gridButtonAt(column, row);

            if (!gridButton.isFlagged())
            {
                if (!gridButton.isRevealed())
                {
                    gridButton.flag(this.board);
                }
            }
            else
            {
                gridButton.unflag(this.board);
            }

            this.checkHasGameBeenWon();
        }
    }
}

let main = new Main();
$("#nightmodeButton").click({"main": main}, (event) => {event.data.main.toggleNightmode()});
$("#debugButton").click({main: main}, (event) => {event.data.main.toggleDebugMode()});
$("#resetButton").click({main: main}, (event) => {event.data.main.reset()});
$("#startButton").click({main: main}, (event) => {event.data.main.start()});

//let main: Main = new Main();
//window.main = main;
//export default main;

//window.main = function() { return main };

// export function toggleNightmode()
// {
//     main.toggleNightmode();
// }

// export function toggleDebugMode()
// {
//     main.toggleDebugMode();
// }

// export function start()
// {
//     main.start();
// }

// export function reset()
// {
//     main.reset();
// }