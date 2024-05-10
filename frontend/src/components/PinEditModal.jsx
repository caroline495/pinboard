import { useDispatch, useSelector } from 'react-redux';
import './PinEditModal.css';
import { useState } from 'react';
import { deletePin, selectPin, updatePin } from '../store/pinReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from "../store/sessionReducer";
import { selectBoard, selectBoardbyUser } from '../store/boardReducer';
import { sortCurrentBoardFirst } from '../utils/boardsUtils';

const PinEditModal = ({ modalState, setModalState}) => {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector(selectPin(pinId));
    const board = useSelector(selectBoard(pin?.boardId));
    

    const [title, setTitle] = useState(pin.title);
    const [description, setDescription] = useState(pin.description);
    const [link, setLink] = useState(pin.link);
    const [boardsDropdownOpen, setBoardsDropdownOpen] = useState(false);
    const [board_id, setBoardId] = useState(pin.boardId);
    const [boardIdHover, setBoardIdHover] = useState('');

    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const creatorId = currentUser.id;
    const username = currentUser.username;
    const boards = useSelector(selectBoardbyUser(currentUser));

    const handleBoardsOpen = () => {
        setBoardsDropdownOpen(!boardsDropdownOpen);
    }

    const handleHoverOverBoard = (e, board_id) => {
        e.stopPropagation();
        setBoardIdHover(board_id);
        showSaveButton()
    }

    const handleHoverOutOverBoard = () => {
        setBoardIdHover('');
    }

    const showSaveButton = () => {
        return (
            <>
                <div className='menu-save-pin-button' >
                    <span>Save</span>
                </div>
            </>
        )
    }

    const handleDelete = e => {
        e.preventDefault();
        navigate(`/${username}/_created`);
        dispatch(deletePin(pinId))
    }   

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updatePin({ ...pin, creatorId, description, title, link, board_id}));
        setModalState(false);
    }
    return (
        <>
            <div className='pin-edit-modal-background' onClick={e => setModalState(false)}>
                <div className='pin-edit-modal-content' onClick={e => e.stopPropagation()}>
                    <div className='pin-edit'>
                        <span className='edit-pin-header'>
                            Edit Pin
                            <div className='close-edit-button' onClick={() => setModalState(false)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                        </span>

                        <form className='edit-pin-form'>
                            <div className='edit-form-text-input'>
                                <label>
                                    <div className='edit-pinform-input-label'>Title </div>
                                    <input className='edit-pinform-input' placeholder='Add a title' value={title} onChange={e => setTitle(e.target.value)} />
                                </label>

                                <label>
                                        <div className='edit-pinform-input-label'>Description </div>
                                        <textarea className='edit-pinform-description-input'
                                            placeholder='Add a detailed description' value={description}
                                            onChange={e => setDescription(e.target.value)} />                                        
                                </label>

                                <label>
                                    <div className='edit-pinform-input-label'>Link </div>
                                    <input className='edit-pinform-input' placeholder='Add a link' value={link} onChange={e => setLink(e.target.value)} />
                                </label>

                                <label>
                                    <div className='edit-pinform-input-label'>Board </div>
                                    {/* <input className='edit-pinform-input' placeholder='Choose a board' /> */}
                                    <select className='menu-item-default' onChange={e => setBoardId(e.target.value)}>
                                        {/* <option value=''>Select a board</option> */}
                                        {sortCurrentBoardFirst(boards, board)?.map((board, idx) => <option className='menu-item-default' key={idx} value={board.id}> {board.name} </option>)}
                                    </select>
                                </label>

                            </div>
                       </form>
                        
                        <div className='edit-form-bottom-part'>
                            <div className='delete-pin-button' onClick={handleDelete}>
                                <span>Delete</span>
                            </div>

                            <div className='save-pin-button' onClick={handleSubmit}>
                                <span>Save</span>
                            </div>                              
                        </div>

                    </div>
                </div>
      
            </div>

        </>

    );
}

export default PinEditModal;

// Think about potential update to dropdown later
{/* <div className='dropdown'>
<div className='pin-page-dropdown' onClick={handleBoardsOpen}>
    <span>{board?.name}</span>
    <svg className='dropdown-arrow' aria-hidden="true" height="12" role="img" viewBox="0 0 24 24" width="12">
        <path d="M20.16 6.65 12 14.71 3.84 6.65a2.27 2.27 0 0 0-3.18 0 2.2 2.2 0 0 0 0 3.15L12 21 23.34 
                9.8a2.2 2.2 0 0 0 0-3.15 2.26 2.26 0 0 0-3.18 0"></path>
    </svg>
</div>
{boardsDropdownOpen ?
    (<div className='pin-edit-menu'>
            {/* <div className="saved-text">Saved here:</div> */}
            // {sortCurrentBoardFirst(boards, board)[0] &&
            //     <li className='menu-item-first'>
            //         <div className="dropdown-board-name">{board.name}</div>
            //         <div className='menu-saved-pin-button'>
            //             <span>Saved</span>
            //         </div>
            //     </li>}
            {/* <div className="other-boards-text">Other Boards:</div> */}

        //     {sortCurrentBoardFirst(boards, board).slice(1)?.map((board, idx) =>
        //         <li className='menu-item-default' key={idx}>
        //             <div className="dropdown-board-name">{board.name}</div>
        //             {boardIdHover === board.id && showSaveButton()}
        //         </li>
        //     )}
        // </div>) : <div></div>}
//</div> */}