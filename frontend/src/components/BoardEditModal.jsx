import { useDispatch, useSelector } from 'react-redux';
import './BoardEditModal.css';
import { useState } from 'react';
import { deleteBoard, selectBoard, updateBoard } from '../store/boardReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from "../store/sessionReducer";

const BoardEditModal = ({ modalState, setModalState}) => {
    const { boardId } = useParams();
    const dispatch = useDispatch();
    const board = useSelector(selectBoard(boardId));

    const [name, setName] = useState(board.name);
    const [description, setDescription] = useState(board.description);
    const [privateMode, setPrivateMode] = useState(board.privateMode);

    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser.username;

    const handleDelete = e => {
        e.preventDefault();
        navigate(`/${username}`);
        dispatch(deleteBoard(boardId))
    }   

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updateBoard({ ...board, description, name, privateMode}));
        setModalState(false);
    }

    const handleChange = e => {
        e.preventDefault();
        setPrivateMode(e.target.value);
    }
    return (
        <>
            <div className='pin-edit-modal-background' onClick={e => setModalState(false)}>
                <div className='pin-edit-modal-content' onClick={e => e.stopPropagation()}>
                    <div className='board-edit'>
                        <span className='edit-pin-header'>
                            Edit Your Board
                            <div className='close-edit-button' onClick={() => setModalState(false)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                        </span>

                        <form className='edit-pin-form'>
                            <div className='edit-form-text-input'>
                                <label>
                                    <div className='edit-pinform-input-label'>Name </div>
                                    <input className='edit-pinform-input' placeholder='Add a name' value={name} onChange={e => setName(e.target.value)} />
                                </label>

                                <label>
                                        <div className='edit-pinform-input-label'>Description </div>
                                        <textarea className='edit-pinform-description-input'
                                            placeholder='What is your board about?' value={description}
                                            onChange={e => setDescription(e.target.value)} />                                        
                                </label>

                                <label>
                                    <div className='pinform-input-label'>Keep this board secret</div>
                                    <span>So only you and collaborators can see it</span>
                                    <input className='check' type='checkbox' checked={privateMode} onChange={e => setPrivateMode(e.target.value)} />
                                </label>
                            </div>
                       </form>
                        
                        <div className='edit-form-bottom-part'>
                            <div className='delete-pin-button' onClick={handleDelete}>
                                <span>Delete</span>
                            </div>

                            <div className='save-edit-button' onClick={handleSubmit}>
                                <span>Done</span>
                            </div>                              
                        </div>

                    </div>
                </div>
      
            </div>

        </>

    );
}

export default BoardEditModal;