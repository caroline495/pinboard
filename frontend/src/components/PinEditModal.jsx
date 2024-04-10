import { useDispatch, useSelector } from 'react-redux';
import './PinEditModal.css';
import { useState } from 'react';
import { deletePin, selectPin, updatePin } from '../store/pinReducer';
import { useNavigate, useParams } from 'react-router-dom';
import { selectCurrentUser } from "../store/sessionReducer";

const PinEditModal = ({ modalState, setModalState}) => {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector(selectPin(pinId));

    const [title, setTitle] = useState(pin.title);
    const [description, setDescription] = useState(pin.description);
    const [link, setLink] = useState(pin.link);

    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const username = currentUser.username;

    const handleDelete = e => {
        e.preventDefault();
        navigate(`/${username}/_created`);
        dispatch(deletePin(pinId))
        .then(() => console.log('pin deleted'));
    }   

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(updatePin({ ...pin, description, title, link}));
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
                                    <input className='edit-pinform-input' placeholder='Choose a board' />
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