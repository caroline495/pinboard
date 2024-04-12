import './BoardIndex.css';
import { selectBoards } from '../store/boardReducer';
import { selectCurrentUser } from '../store/sessionReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import BoardIndexItem from './BoardIndexItem';
import { selectPins } from '../store/pinReducer';
import BoardCreateModal from './BoardCreateModal';

const BoardIndex = props => {
    const dispatch = useDispatch();
    const boards = useSelector(selectBoards);
    const currentUser = useSelector(selectCurrentUser);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalState, setModalState] = useState(false);

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
        if (createdBoards.length === 0) {
            return false;
        } else {
            return true;      
        }
    };

    const handleOpen = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleEditOpen = () => {
        setModalState(true);
        setDropdownOpen(false);
    }

    const boardIndexView = () => {
        return (
            <>
                <div className='board-index-container'>
                    
                    <div className='dropdown'>
                        <div className='pin-board-options' onClick={handleOpen}>
                            <svg aria-hidden="true" aria-label="" height="20" role="img" viewBox="0 0 24 24" width="20">
                                <path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
                            </svg>
                        </div>
                        {dropdownOpen ?
                            (
                                <div className='board-index-menu'>
                                    <li className='menu-item-create-board' >
                                        <div onClick={handleEditOpen}>Create Board</div>
                                    </li>

                                    <li className='menu-item-create-pin' >
                                        <div>Create Pin</div>
                                    </li>
                                </div>
                            ) : <div></div>}
                    </div>  
    
                    <div className='board-status'>
                        {hasBoards() ? '' : 'No boards created yet'}
    
                        {/* <span className='board-count'>{hasBoards() ? `Boards: ${createdBoards.length}` : ''} </span> */}
                        <div className='all-boards'>
                            {hasBoards() ? createdBoards.map(board => showCurrentUserBoard(board)) : null}
                        </div>
    
                    </div>
                 
                </div>
            </>
        )    
    }
    
    return (
        <>
            {boardIndexView()}
            {modalState && (
                <BoardCreateModal modalState={modalState} setModalState={setModalState} />
            )}
        </>
    )
}

export default BoardIndex;