import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import { selectCurrentUser } from '../store/sessionReducer';
import { useState } from 'react';
import SessionModal from './SessionModal';
import logo from '../assets/Pinterest-logo.png';

const NavBar = props => {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [modalState, setModalState] = useState(null);

    const sessionNav = () => {
        if (currentUser) {
            // SIGNED IN -- HOME PAGE NAV BAR
            return (
                <nav>
                    <div className='logo'>
                        <svg aria-label="Pinterest" height="24" role="img" viewBox="0 0 24 24" width="24">
                            <path className="pinterest-logo" d="M0 12a12 12 0 0 0 7.73 11.22 12 12 0 0 1 .03-3.57l1.4-5.94S8.8 13 8.8 11.94c0-1.66.96-2.9 
                            2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 
                            3.76-5.47 0-2.86-2.06-4.86-5-4.86a5.17 5.17 0 0 0-5.39 5.18c0 1.03.4 2.13.9 2.73q.12.17.08.34l-.34 
                            1.36q-.06.31-.4.16c-1.49-.7-2.42-2.88-2.42-4.63 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 
                            4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.74 2.84a14 14 0 0 1-1.55 3.23A12 12 0 1 0 0 12"></path>
                        </svg>
                    </div>
                    <div className='login-text-button'>Home</div>
                    <div className='login-text-button'>Explore</div>
                    <div className='login-text-button'>Create</div>
                   
                    <div className='search-bar'>
                        <input className='search-bar' placeholder='Search your Pins'/>
                    </div>

                    <div className='login-icon-buttons'>
                        <div className='icon-button'>
                            <svg aria-hidden="true" aria-label="" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path className='notifications-logo' d="M19 7v6.17A10 10 0 0 1 22 19H2a10 10 0 0 1 3-5.83V7a7 7 0 1 1 14 0m-4 14a3 3 0 1 1-6 0z"></path>
                            </svg>
                        </div>
                        <div className='icon-button'>
                            <svg aria-hidden="true" aria-label="" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path className='messages-logo' d="M18 12.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m-6-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3M12
                                 0a11 11 0 0 0-8.52 17.95l-1.46 5.43a.5.5 0 0 0 .73.55l5.08-2.75A10.98 10.98 0 0 0 23 11 11 11 0 0 0 12 0"></path>
                            </svg>
                        </div>
                        <div className='icon-button'>
                            <div className='circle'>
                                <span>U</span>
                            </div>
                        </div>
                        <div className='icon-button' id='more-options' onClick={() => dispatch(logoutUser())}>
                            Logout
                        </div>
                    </div>
                </nav>
            )
        } else {
            // FRONT PAGE -- NOT SIGNED IN NAV BAR
            return (
                <nav>
                    <div className='left'>
                        <div className='logo'>
                            <svg aria-label="Pinterest" height="32" role="img" viewBox="0 0 24 24" width="32">
                                <path className="pinterest-logo" d="M0 12a12 12 0 0 0 7.73 11.22 12 12 0 0 1 .03-3.57l1.4-5.94S8.8 13 8.8 11.94c0-1.66.96-2.9 
                                2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 
                                3.76-5.47 0-2.86-2.06-4.86-5-4.86a5.17 5.17 0 0 0-5.39 5.18c0 1.03.4 2.13.9 2.73q.12.17.08.34l-.34 
                                1.36q-.06.31-.4.16c-1.49-.7-2.42-2.88-2.42-4.63 0-3.77 2.74-7.23 7.9-7.23 4.14 0 7.36 2.95 7.36 6.9 0 
                                4.12-2.6 7.43-6.2 7.43-1.21 0-2.35-.63-2.74-1.37l-.74 2.84a14 14 0 0 1-1.55 3.23A12 12 0 1 0 0 12"></path>
                            </svg>
                        </div>
                        <h1 className='pinboard-title'>Pinboard</h1>
                        <div className='left-buttons'>
                            <div className='left-inner-button'>Today</div>
                            <div className='left-inner-button'>Watch</div>
                            <div className='left-inner-button'>Shop</div>
                            <div className='left-inner-button-explore'>Explore</div>
                        </div>
                    </div>
        
        
                    <div className='right'>
                        <div className='right-buttons'>
                            <div className='right-inner-button'>About</div>
                            <div className='right-inner-button-business'>Business</div>
                            <div className='right-inner-button'>Blog</div>
                        </div>
                        <div className='login-button' onClick={() => setModalState('login')}>
                            <span>Log in</span>
                        </div>
                        <div className='signup-button' onClick={() => setModalState('signup')}>
                            <span>Sign up</span>
                        </div>
                    </div>
                
                </nav>
            )
        }
    }

    return (
        <>
            {sessionNav()}
            {modalState && (
                <SessionModal modalState={modalState} setModalState={setModalState} />
            )}
        </>
    )
};

export default NavBar;