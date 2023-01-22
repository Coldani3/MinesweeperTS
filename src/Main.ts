import Board from "./Board";
import BoardSize from "./Config/BoardSize";
import { Difficulty, EasyDifficulty, MediumDifficulty, HardDifficulty } from "./Config/Difficulty";
//import * as HTMLIds from "./HTMLIds";
import {UI, DropdownElement, UserNumberInput} from "./UIElements";

const difficulties: Difficulty[] = [
    EasyDifficulty,
    MediumDifficulty,
    HardDifficulty
];

const defaultDifficulty: Difficulty = EasyDifficulty;


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

    start()
    {
        console.log("Test!");

        let difficulty: Difficulty = this.getDifficulty();

        this.board = new Board(difficulty.boardSize);
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
}

const main: Main = new Main();