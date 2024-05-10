
export const sortBoardsByName = (boards) => {
    // sorting the array of board objects by name alphabetically, regardless of case
    const copy = boards.slice()
    return copy.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        } else {
            return 0;
        }
    })
}

export const sortCurrentBoardFirst = (boards, board) => {
    const copy = boards.slice();
    const currentFirst = copy[0];
    const boardIndex = copy.indexOf(board);
    copy[0] = board;
    copy[boardIndex] = currentFirst;
    const res = [copy[0], ...sortBoardsByName(copy.splice(1))];
    return res;
}