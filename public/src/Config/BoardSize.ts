export default class BoardSize 
{
    //width
    columns: number;
    //height
    rows: number;

    constructor(columns: number, rows: number)
    {
        this.columns = columns;
        this.rows = rows;
    }

    equals(other: BoardSize) : boolean
    {
        return other && other.columns === this.columns && other.rows === this.rows;
    }
}