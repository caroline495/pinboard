import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PinForm.css';
import { selectCurrentUser } from "../store/sessionReducer";
import { selectPins } from '../store/pinReducer';
import { selectBoardbyUser } from "../store/boardReducer";

const PinForm = props => {
    const currentUser = useSelector(selectCurrentUser);
    const creator_id = currentUser.id;
    const navigate = useNavigate();

    const username = currentUser.username;
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [image, setImage] = useState(null);
    const [boardId, setBoardId] = useState('');
    // const [taggedTopics, setTaggedTopics] = useState('');

    const [errors, setErrors] = useState({});
    const [pinCreated, setPinCreated] = useState(false);
    // const pins = useSelector(selectPins);
    // const [lastPin, setLastPin] = useState(pins[pins.length - 1]);
    const [lastPinId, setLastPinId] = useState('');
    const boards = useSelector(selectBoardbyUser(currentUser));
    const [boardsDropdownOpen, setBoardsDropdownOpen] = useState(false);

    const handleBoardsOpen = () => {
        setBoardsDropdownOpen(!boardsDropdownOpen);
    }
    // useEffect(() => {
    //     dispatch(fetchPins())
    //     .then(()=> setLastPin(pins[pins.length - 1]));
    // }, [])

    useEffect(() => {
        dispatch(fetchBoards());
    }, []);

    useEffect(()=> {
        if (pinCreated) {
            // setLastPin(pins[pins.length - 1]);
        }
    }, [pinCreated]);


    const handlePinSubmit = e => {
        e.preventDefault();

        // easiest way to handle file inputs is to use a FormData object, add all inputs as key-value pairs
        const data = new FormData();
        data.append('pin[creator_id]', creator_id);
        data.append('pin[description]', description);
        data.append('pin[title]', title);
        data.append('pin[link]', link);
        data.append('pin[board_id]', boardId);
        if (image) {
            data.append('pin[image]', image)
        }

        // replace what's inside createPin with 'data', before was: { creator_id, description, title, link }
        dispatch(createPin(data))
        .then((data) => {
            // Only reset all fields if pin has successfully been created, so that people can adjust their data if they entered it wrong
            setPinCreated(true)
            setLastPinId(data.id)
            setTitle('');
            setDescription('');
            setLink('');
            setBoardId('');
            return data.id})
        // option to directly navigate to new pin page instead of through the pop up
        //.then((id) => navigate(`/pin/${id}`))
        .catch(async res => {
            let data = await res.json();
            setErrors(data.errors);
          });

        // setTitle('');
        // setDescription('');
        // setLink('');
        // setBoardId('');
    }

    const handleFile = e => {
        const file = e.currentTarget.files[0];
        setImage(file);
    }

    const pinSuccess = ()=> {
        return (
            <div className='pin-success-popup'>
                <div className='pin-success-text'>Your pin has successfully been published! Click to see it <Link to={`/pin/${lastPinId}`}><u>here</u></Link></div>
                <div className='close-success-popup' onClick={e => setPinCreated(false)}>
                    <svg className='close-success-popup-button' aria-hidden="true" aria-label="" height="12" role="img" viewBox="0 0 24 24" width="18">
                        <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                    </svg>
                </div>
            </div>
        )
    }
    return (
        <>            
            <div className='pinform-page-container'>
            
                <div className='left-column'></div>

                <div className='form-container'>
                    <form onSubmit={handlePinSubmit}>
                        <div className='form-header'>
                            <span className='create-pin-span'>Create Pin</span>
                            <button id='signup-submit' className='publish-button' type='submit'>Publish</button>
                        </div>

                        <div className='form-content'>
                            <div className="image-upload-section">
                                <div className='image-upload-header'></div>                                   
                                <div className='image-upload-description'>
                                    <svg aria-label="Add files" height="32" role="img" viewBox="0 0 24 24" width="32">
                                        <path d="M24 12a12 12 0 1 0-24 0 12 12 0 0 0 24 0m-10.77 3.75a1.25 1.25 0 0 1-2.5 0V11.8L9.7 12.83a1.25 1.25 0 0 1-1.77-1.77L12 7l4.07 4.06a1.25 1.25 0 0 1-1.77 1.77l-1.07-1.06z"></path>
                                    </svg>
                                    <div className='choose-file-line'>Choose a file and upload it here</div>
                                </div>
                                <input className='image-upload-input' type='file' onChange={handleFile} />

                            </div>
                        
                            <div className='form-text-input'>
                                <label>
                                    <div className='pinform-input-label'>Title </div>
                                    <input className='pinform-input' placeholder='Add a title' value={title} onChange={e => setTitle(e.target.value)}/>
                                </label>

                                <label>
                                    <div className='pinform-input-label'>Description </div>
                                    <textarea className='pinform-description-input' 
                                    placeholder='Add a detailed description' value={description} 
                                    onChange={e => setDescription(e.target.value)}/>
                                    
                                </label>

                                <label>
                                    <div className='pinform-input-label'>Link </div>
                                    <input className='pinform-input' placeholder='Add a link' value={link} onChange={e => setLink(e.target.value)}/>
                                </label>
                                
                                <label>
                                    <div className='pinform-input-label'>Board </div>
                                    <select className='menu-item-default' onChange={e => setBoardId(e.target.value)}>
                                        <option value=''>Select a board</option>
                                        {boards?.map((board, idx) => <option className='menu-item-default' key={idx} value={board.id}> {board.name} </option>)}
                                    </select>
                                </label>

                                {/* <label>
                                    <div className='pinform-input-label'>Tagged topics </div>
                                    <input className='pinform-input' placeholder='Search for a tag'/>
                                </label> */}
                            </div>

                        </div>
                    </form>

                    <div className='pin-success'>
                        {pinCreated ? pinSuccess() : ''}                        
                    </div>
 
                </div>
                
            </div>
        </>
    )
}

export default PinForm;