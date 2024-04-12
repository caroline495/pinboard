import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/sessionReducer";
import { useNavigate } from "react-router-dom";
import './BoardCreateModal.css';

const BoardCreateModal = ({ modalState, setModalState}) => {
    const currentUser = useSelector(selectCurrentUser);
    const creator_id = currentUser.id;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privateMode, setPrivateMode] = useState(false);

    const handleBoardSubmit = e => {
        e.preventDefault();

        // replace what's inside createPin with 'data', before was: { creator_id, description, title, link }
        dispatch(createBoard({'board': { creator_id, description, name, privateMode}, 'pins': {}}))
        .catch(async res => {
            let data = await res.json();
            setErrors(data.errors);
          });
        
        setModalState(false);
        navigate(`/boards/`);
    }

    return (
        <>
            <div className='board-create-modal-background' onClick={e => setModalState(false)}>
                <div className='board-create-modal-content' onClick={e => e.stopPropagation()}>

                    <div className='board-create'>
                        <span className='create-board-header'>
                            Create Your Board
                            <div className='close-edit-button' onClick={() => setModalState(false)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                        </span>

                        <form className='edit-pin-form' >
                            <div className='form-text-input'>
                                <label>
                                    <div className='board-form-input-label'>Name </div>
                                    <input className='board-form-input' placeholder='Like "Places to Go" or "Recipes to Make"' value={name} onChange={e => setName(e.target.value)} />
                                </label>

                                <label>
                                    <div className='board-form-input-label'>Keep this board secret</div>
                                    <span>Only you and collaborators can see it</span>
                                    <input className='check' type='checkbox' checked={privateMode} onChange={e => setPrivateMode(e.target.value)} />
                                </label>
                            </div>
                        </form>

                        <div className='create-form-bottom-part'>
                            <div className='create-board-button' onClick={handleBoardSubmit}>
                                <span>Create</span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default BoardCreateModal;