import './BoardIndex.css';
import { selectBoards } from '../store/boardReducer';
import { selectCurrentUser } from '../store/sessionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import BoardIndexItem from './BoardIndexItem';
import { selectPins } from '../store/pinReducer';
import BoardCreateModal from './BoardCreateModal';

const BoardIndex = props => {
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        dispatch(fetchBoards());
    }, [])

    const pins = useSelector(selectPins);
    useEffect(() => {
        dispatch(fetchPins());
    }, [])

    const showCurrentUserBoard = (board) => {
        if (currentUser.id === board.creatorId) {
            return (<BoardIndexItem key={board.id} board={board}/>)
        } 
    }

    const createdBoards = Object.values(boards).filter(board => {if (currentUser.id === board.creatorId) return board})

    const hasBoards = () => {
        // const createdBoards = Object.values(boards).filter(board => {if (currentUser.id === board.creatorId) return board})
        console.log(createdBoards, 'createdBoards');
        if (createdBoards.length === 0) {
            return false;
        } else {
            return true;      
        }

    };

    return (
        <>
            <div className='board-status'>
                {hasBoards() ? '' : 'No boards created yet'}

                <div className='all-boards'>
                    {hasBoards() ? createdBoards.map(board => showCurrentUserBoard(board)) : null}
                </div>
            </div>

            <BoardCreateModal />
        </>
    )
}

export default BoardIndex;