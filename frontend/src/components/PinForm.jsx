import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import './PinForm.css';
import { selectCurrentUser } from "../store/sessionReducer";

const PinForm = props => {
    const session = useSelector(selectCurrentUser);
    const creator_id = session.id;
    console.log (creator_id);

    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    // const [board, setBoard] = useState('');
    // const [taggedTopics, setTaggedTopics] = useState('');

    const [errors, setErrors] = useState({});

    const handlePinSubmit = e => {
        e.preventDefault();
        console.log('here');
        dispatch(createPin({ creator_id, description, title, link }))
        .then(() => console.log('pin created'))
        .catch(async res => {
            let data = await res.json();
            setErrors(data.errors);
          });
    }

    return (
        <>            
            <div className='pinform-page-container'>
            
                <div className='left-column'></div>

                <div className='form-container'>
                    <form onSubmit={handlePinSubmit}>
                        <div className='form-header'>
                            <span>Create Pin</span>
                            <button id='signup-submit' className='publish-button' type='submit'>Publish</button>
                        </div>

                        <div className='form-content'>
                            <div className="image-upload-section"></div>
                        
                            <div className='form-text-input'>
                                <label>
                                    <div className='pinform-input-label'>Title </div>
                                    <input className='pinform-input' placeholder='Add a title' value={title} onChange={e => setTitle(e.target.value)}/>
                                </label>

                                <label>
                                    <div className='pinform-input-label'>Description </div>
                                    <input className='pinform-input' placeholder='Add a detailed description' value={description} onChange={e => setDescription(e.target.value)}/>
                                </label>

                                <label>
                                    <div className='pinform-input-label'>Link </div>
                                    <input className='pinform-input' placeholder='Add a link' value={link} onChange={e => setLink(e.target.value)}/>
                                </label>
                                
                                <label>
                                    <div className='pinform-input-label'>Board </div>
                                    <input className='pinform-input' placeholder='Choose a board'/>
                                </label>

                                <label>
                                    <div className='email-input-label'>Tagged topics </div>
                                    <input className='pinform-input' placeholder='Search for a tag'/>
                                </label>
                            </div>

                        </div>
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default PinForm;