import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/sessionReducer";
import './UserProfile.css';
import { NavLink } from "react-router-dom";

const UserProfile = props => {

    const session = useSelector(selectCurrentUser);
    const creator_id = session.id;
    const username = session.username;

    return (
        <>
            <div className='profile-box'>
                <div className='user-circle'>
                    {username[0].toUpperCase()}
                </div>
                <br></br>
                <div className='username-display'>{username}</div>

                <div className='follow-status'>
                    <span>0 followers · 0 following</span>
                </div>

                <div className='share-edit-buttons'>
                    <div className='share-button'><span>Share</span></div>
                    <div className='edit-profile-button'><span>Edit Profile</span></div>
                </div>

                <div className='index-view-toggle'>
                    <div>

                    </div>
                    <NavLink to="_created">
                        <div className='index-wrapper'>
                            <div className='index-created-button'>
                                <span>Created</span>
                            </div>
                            <div className='index-created-underline'></div>
                        </div>
                    </NavLink>
                    
                    <NavLink to="_saved">
                        <div className='index-wrapper'>
                            <div className='index-saved-button'>
                                <span>Saved</span>
                            </div>
                            <div className='index-saved-underline'></div>
                        </div>

                    </NavLink>
                </div>
            </div>
           
        </>
    )
}

export default UserProfile;