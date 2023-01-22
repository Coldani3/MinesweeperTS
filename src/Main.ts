import Board from "./Board";
import BoardSize from "./Config/BoardSize";
import { Difficulty, EasyDifficulty, MediumDifficulty, HardDifficulty, RussianRouletteDifficulty } from "./Config/Difficulty";
//import * as HTMLIds from "./HTMLIds";
import {UI, DropdownElement, UserNumberInput, GameArea, GameGrid, buttonSize, gameAreaPaddingBottom} from "./UIElements";

const difficulties: Difficulty[] = [
    EasyDifficulty,
    MediumDifficulty,
    HardDifficulty,
    RussianRouletteDifficulty
];

const defaultDifficulty: Difficulty = EasyDifficulty;
const debugMode: boolean = false;

class Main
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
        return rows && rows.val() > 0 && cols && cols.val() > 0;
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
        let gameArea: GameArea = UI.gameArea();
        let gameGrid: GameGrid = UI.gameGrid();
        gameArea.css("display", "flex");

        this.board.generateButtons();

        gameArea.height(buttonSize * this.board.size.rows + gameAreaPaddingBottom);
        gameGrid.width(buttonSize * this.board.size.columns);
        gameGrid.height(buttonSize * this.board.size.rows);
    }

    start()
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
    }

    reset()
    {

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

    buttonClicked(column: number, row: number)
    {

    }

    onRightClick(column: number, row: number)
    {

    }
}

const main: Main = new Main();