import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from '../store/sessionReducer';
import pinReducer, { receivePins, selectPins, selectPin, fetchPin } from "../store/pinReducer";
import { useEffect, useState } from "react";

import './PinPage.css';
import PinEditModal from "./PinEditModal";

const PinPage = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { pinId } = useParams();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [modalState, setModalState] = useState(false);

    const username = currentUser.username;
    const pin = useSelector(selectPin(pinId));

    useEffect(() => {
        dispatch(fetchPin(pinId));
    }, [dispatch, pinId]);

    // console.log(pin);
    const handleBackClick = () => {
        navigate(`/${username}/_created`);
    }

    const handleProfileClick = () => {
        navigate(`/${username}/`);
    }

    const handleOpen = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleEditOpen = () => {
        setModalState(true);
        setDropdownOpen(false);
    }

    const pinPageView = () => {
        return (
            <>
                <div className='pin-page'>
                    <div className='pin-left-column'>
                        <div className='index-back-arrow'>
                            <div className='back-arrow-circle' onClick={handleBackClick}>
                                <svg aria-hidden="true" aria-label="" height="20" role="img" viewBox="0 0 24 24" width="20">
                                    <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className='pin-content'>

                        <div className='pin-stats-container'>
                            <div className='pin-stats'>
                                <div className='pin-stat'>Impressions</div>
                                <div className='pin-stat'>Pin clicks</div>
                                <div className='pin-stat'>Saves</div>                            
                            </div>
                            <div className='see-more-stats'>See more stats</div>
                        </div>
                        
                        <div className='pin-display'>
                            <div className='pin-image-container'>
                                <div className='pin-image'>
                                    {pin?.imageUrl && (<img className='pin-image' src={pin?.imageUrl}/>)}
                                </div>                                
                            </div>


                            <div className='pin-info'>

                                <div className='pin-info-top'>

                                    <div className='pin-top-bar'>
                                        <div className='pin-top-left'>
                                            <div className='pin-share-button'>
                                                <svg aria-hidden="true" aria-label="" height="20" role="img" viewBox="0 0 24 24" width="20">
                                                    <path d="M10 7.66 8.81 8.84a2 2 0 0 1-2.84-2.82l6-6.02L18 6.01a2 2 0 0 1-2.82 2.83l-1.2-1.19v6.18a2 2 0 0 1-4 0zM19 16a2 2 0 0 1 4 0v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6a2 2 0 0 1 4 0v4h14z"></path>
                                                </svg>
                                            </div>

                                            <div className='dropdown'>
                                                <div className='pin-more-options' onClick={handleOpen}>
                                                <svg aria-hidden="true" aria-label="" height="20" role="img" viewBox="0 0 24 24" width="20">
                                                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6m18 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6"></path>
                                                </svg>
                                                </div>
                                                {dropdownOpen ?
                                                    (
                                                        <div className='pin-menu'>
                                                            <li className='menu-item-edit' >
                                                                <div onClick={handleEditOpen}>Edit Pin</div>
                                                            </li>

                                                            <li className='menu-item-download' >
                                                                <div>Download Image</div>
                                                            </li>
                                                        </div>
                                                    ) : <div></div>}
                                            </div>

                                            <div className='pin-favorite'>
                                                <svg aria-hidden="true" aria-label="" height="20" role="img" viewBox="0 0 24 24" width="20">
                                                    <path d="M22.36 11.52c1.26-1.3.57-3.53-1.18-3.8L16.27 7a.2.2 0 0 1-.16-.12l-2.2-4.63a2.1 2.1 0 0 0-3.82 0l-2.2 4.63a.2.2 0 0 1-.15.12l-4.91.74c-1.75.26-2.45 2.5-1.18 3.79l3.56 3.6s.06.12.05.18l-.84 5.1c-.3 1.8 1.53 3.2 3.1 2.34l4.39-2.4a.2.2 0 0 1 .19 0l4.39 2.4c1.57.86 3.39-.53 3.1-2.34l-.85-5.1q-.02-.1.06-.17zm-5.7 1.5a3.2 3.2 0 0 0-.88 2.77l.57 3.46-2.81-1.54a3.2 3.2 0 0 0-3.07 0l-2.82 1.54.57-3.46a3.2 3.2 0 0 0-.87-2.77l-2.53-2.56 3.37-.51a3.2 3.2 0 0 0 2.4-1.8L12 5.22l1.4 2.95a3.2 3.2 0 0 0 2.43 1.79l3.36.5z"></path>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className='pin-top-right'>
                                            <span>Pin: {pinId}-</span>
                                            <span> Boards</span>
                                            <div className='save-pin-button'>
                                                <span>Save</span>
                                            </div>                                        
                                        </div>
                                    </div>        

                                    <div className='pin-details'>
                                        <p className='pin-link'>{pin?.link}</p>
                                        <p className='pin-title'>{pin?.title}</p>
                                        <p className='pin-description'>{pin?.description}</p>                                
                                    
                                        <div className='pin-creator'>
                                            <div className='creator-circle' onClick={handleProfileClick}>
                                                <span>{username[0].toUpperCase()}</span>
                                            </div>
                                            <div className='creator-username'>{username}</div>
                                        </div>

                                    </div> 
                                </div>                            

                                <div className='note-to-self'>
                                    <div className='note-to-self-container'>
                                        <div className='note-to-self-header'>Note to self</div>
                                        <div className='note-to-self-placeholder'>What do you want to remember about this Pin?</div>
                                    </div>

                                    <div className='add-note-button'>
                                        <span>Add note</span>
                                    </div>
                                </div>
                                <div className='comments'>
                                    <div className='current-comments'>
                                        <span className='comment-header'>Comments</span>
                                        <span className='comment-placeholder'>No comments yet! Add one to start the conversation</span>
                                    </div>

                                    <div className='comment-box'>
                                        <span className='comment-prompt'>What do you think?</span>
                                        
                                        <div className='user-comment-area'>
                                            <div className='creator-circle'>
                                                <span>{username[0].toUpperCase()}</span>
                                            </div>
                                            <input className='add-comment-bar' placeholder='Add a comment'/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>



            </>
        )
    }

    return (
        <>
            {pinPageView()}
            {modalState && (
                <PinEditModal modalState={modalState} setModalState={setModalState} />
            )}
        </>
    )
}

export default PinPage;