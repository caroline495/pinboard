import { createSelector } from 'reselect';
import { csrfFetch } from '../utils/csrfUtils';

// TYPES
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const REMOVE_BOARD = 'REMOVE_BOARD';


// ACTION CREATORS
export const receiveBoard = boardData => ({
    type: RECEIVE_BOARD,
    boardData
})

export const receiveBoards = boards => ({
    type: RECEIVE_BOARDS,
    boards
})

export const removeBoard = boardId => ({
    type: REMOVE_BOARD,
    boardId
})

// THUNK ACTION CREATORS
export const fetchBoard = (boardId) => (dispatch, getState) => {
    return fetch(`/api/boards/${boardId}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receiveBoard(data)))
}

export const fetchBoards = () => dispatch => {
    return fetch(`/api/boards`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receiveBoards(data)))
}

export const createBoard = (postData) => dispatch => {
    return csrfFetch(`/api/boards`, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receiveBoard(data)))
}

export const updateBoard = (postData) => dispatch => {
    return csrfFetch(`/api/boards/${postData.id}`, {
        method: 'PATCH',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res;
            }
        })
        .then(data => dispatch(receiveBoard(data)))
}

export const deleteBoard = (boardId) => dispatch => {
    return csrfFetch(`/api/boards/${boardId}`, { method: 'DELETE' })
        .then(() => dispatch(removeBoard(boardId)))
}


// SELECTORS
export const selectBoards = createSelector(state => state.boards, boards => Object.values(boards));
export const selectBoard = boardId => state => state.boards[boardId] ? state.boards[boardId] : null;

// export const selectBoardbyName = createSelector(state => state.boards, boards => {
//     console.log(boards);
//     const boardsArray = Object.values(boards);
//     const boardsIds = boardsArray.map(board, idx => [board.name, board.id]);
//     return boardsIds;
// })

export const selectBoardbyName = name => state => {
    const boardsArray = Object.values(state.boards);
    return boardsArray.filter(board => { if (board.name === name) return board });
}

// REDUCER
const boardReducer = (state = {}, action) => {

    const nextState = { ...state}

    switch (action.type) {
        case RECEIVE_BOARD:
            nextState[action.boardData.board.id] = action.boardData.board;
            return nextState;
        case RECEIVE_BOARDS: 
            return action.boards;
        case REMOVE_BOARD:
            delete nextState[action.boardId];
            return nextState;
        default:
            return state;
    }
}

export default boardReducer;
