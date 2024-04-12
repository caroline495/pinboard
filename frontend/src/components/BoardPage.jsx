import { useParams } from "react-router-dom";
import { selectBoard, selectBoardbyName } from "../store/boardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { selectPins } from '../store/pinReducer';
import PinIndexItem from "./PinIndexItem";
import { selectCurrentUser } from "../store/sessionReducer";
import './BoardPage.css';
import BoardEditModal from "./BoardEditModal";

const BoardPage = () => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    const currentUser = useSelector(selectCurrentUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalState, setModalState] = useState(false);
    const board = useSelector(selectBoard(boardId));

    // Note: this useEffect happens first before the board = useSelector(...), 
    // so the argument inside needs to be available before the useSelector
    useEffect(() => {
        dispatch(fetchBoard(boardId));
    }, [dispatch, boardId])

    const pins = useSelector(selectPins);

    const handleOpen = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleEditOpen = () => {
        setModalState(true);
        setDropdownOpen(false);
    }
    // NOTE: need to use board.id and not boardId in the pins.map statement below since boardId is always there? and
    // board doesn't get initialized until after the fetch
    
    const boardPageView = () => {
        return (
            <>
                <div className='board-page-header'>
                    <div className='board-page-title-area'>
                        <div>{board?.name}</div>
        
                        <div className='dropdown'>
                            <div className='board-options' onClick={handleOpen}>
                                <svg aria-hidden="true" aria-label="" height="16" role="img" viewBox="0 0 24 24" width="16">
                                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
                                </svg>
                            </div>
                            {dropdownOpen ?
                                (
                                    <div className='board-menu'>
                                        <li className='menu-item-edit' >
                                            <div onClick={handleEditOpen}>Edit Board</div>
                                        </li>
        
                                        <li className='menu-item-share' >
                                            <div>Share</div>
                                        </li>
                                    </div>
                                ) : <div></div>}
                        </div>                        
                    </div>
                    <div>{board?.description}</div>
    
                </div>
                
                <div className="no-pins-status">{pins[0]?.boardId !== board?.id ? 'There are no Pins on this board yet' : ''}</div>
                <div className='all-pins-in-board'>
                        
                        {pins.map(pin => (pin.boardId === board.id ? <PinIndexItem key={pin.id} pin={pin}/> : ''))}
                </div>
            </>
        )    
    }

    return (
        <>
            {boardPageView()}
            {modalState && (
                <BoardEditModal modalState={modalState} setModalState={setModalState} />
            )}
        </>
    )
}

export default BoardPage;