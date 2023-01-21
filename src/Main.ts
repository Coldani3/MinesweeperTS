import Board from "./Board";
import { Difficulty, EasyDifficulty, MediumDifficulty, HardDifficulty } from "./Config/Difficulty";
import * as HTMLIds from "./HTMLIds";

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

    getDifficultyDropdownElement() : HTMLSelectElement
    {
        return document.getElementById("difficultyDropdown") as HTMLSelectElement;
    }

    anyDifficultyDropdownOptionSelected(dropdown: HTMLSelectElement): boolean
    {
        return dropdown.selectedIndex > -1;
    }

    getDifficulty(): Difficulty
    {
        let difficultyDropdown: HTMLSelectElement = this.getDifficultyDropdownElement();

        if (this.anyDifficultyDropdownOptionSelected(difficultyDropdown))
        {
            return difficulties[difficultyDropdown.selectedIndex];
        }

        return defaultDifficulty;
    }

    usesCustomSize() : boolean
    {
        //$(HTMLIds.customRowCountID);
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