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
            return (
                <nav>
                    <div className='logo'>
                        
                    </div>
                    <div className='home-button'>Home</div>
                    <div className='explore-button'>Explore</div>
                    <div className='create-button'>Create</div>
                   
                    <div className='search-bar'>
                        <span>Search</span>
                    </div>

                    <div className='login-icon-buttons'>
                        <div className='icon-button' id='notifications'>
                            N
                        </div>
                        <div className='icon-button' id='messages'>
                            M
                        </div>
                        <div className='icon-button' id='account'>
                            A
                        </div>
                        <div className='icon-button' id='more-options' onClick={() => dispatch(logoutUser())}>
                            Logout
                        </div>
                    </div>
                </nav>
            )
        } else {
            // NOT SIGNED IN NAV BAR
            return (
                <nav>
                    <div className='left'>
                        <img id='left-logo' src={logo} />
                        <h1 className='pinboard-title'>Pinterest</h1>
                        <div className='left-buttons'>
                            <div className='left-inner-button'>Today</div>
                            <div className='left-inner-button'>Watch</div>
                            <div className='left-inner-button'>Shop</div>
                            <div className='left-inner-button'>Explore</div>
                        </div>
                    </div>
        
        
                    <div className='right'>
                        <div className='right-buttons'>
                            <div className='right-inner-button'>About</div>
                            <div className='right-inner-button'>Business</div>
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