import * as HTMLIds from "./HTMLIds"

export type UserNumberInput = JQuery<HTMLInputElement>;
export type DropdownElement = HTMLSelectElement;

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
}

export const UI = new UIElements();