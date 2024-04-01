import logo from '../assets/Pinterest-logo.png';
import { useState } from 'react';
import './SessionModal.css';
import { createUser, loginUser } from '../store/sessionReducer';
import { useDispatch } from 'react-redux';

const SessionModal = ({ modalState, setModalState }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); 
    const [errors, setErrors] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        if (modalState === 'signup') {
            dispatch(createUser({ username, email, password }))
                .then(() => setModalState(null))
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                  });
        } else {
            dispatch(loginUser({ email, password }))
                .then(() => setModalState(null))
                .catch(async res => {
                    let data = await res.json();
                    setErrors(data.errors);
                  });
        }
    }
    
    
    const formMode = () => {
        if (modalState === 'signup') {
            return (
                <>
                    <form onSubmit={handleSubmit} className='form'>
                            <div className='close-button' onClick={() => setModalState(null)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                        <img src={logo} />
                        
                        <span className='welcome'>Welcome to Pinboard</span> 
                        <div className='signup-welcome-caption'>Find new ideas to try</div>

                        <div className='errors'>{errors.map((err, idx) => (<p key={idx}>{err}</p>))}</div>
                        <label><div className='input-label'>Username</div>
                            <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        
                        <label><div className='input-label'>Email</div>
                            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
    
                        <label><div className='input-label'>Password</div>
                            <input placeholder='Password' 
                            type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
    
                        <button id='signup-submit' className='form-submit-button' type='submit'>Continue</button>
                        <div className='or-break'><span>OR</span></div>
                        <div className='fake-google-button'><span>Continue with Google</span></div>
                        <div className='disclosure-text'>By continuing, you agree to Pinterest's <span className='disclosure-text-inline'>Terms of Service</span> and acknowledge you've read our 
                                <span className='disclosure-text-inline'> Privacy Policy. Notice at collection.</span></div>    
                        <div className='signup-bottom-text'>Already a member? Log in</div>
                        <div className='create-business-account'><span>Create a free business account</span></div>
                    </form>   
                </>
            )
        } else if (modalState === 'login') {
            return (
                <>
                    <div className='login-form'>
                        <form onSubmit={handleSubmit} className='form'>
                            <div className='close-button' onClick={() => setModalState(null)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                            <img src={logo} />
                            <span className='welcome'>Welcome to Pinboard</span> <br></br>
                            <div className='errors'>{errors.map((err, idx) => (<p key={idx}>{err}</p>))}</div>
                            <label>
                                <div className='email-input-label'>Email </div>
                                <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                            </label>
        
                            <label><div className='input-label'>Password</div>
                                <input placeholder='Password' 
                                type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </label>
                            
                            <div className='forgot-password-line'><span >Forgot your password?</span></div>
                            <button className='form-submit-button' type='submit'>Log in</button>
                            <div className='or-break'><span>OR</span></div>
                            <div className='fake-facebook-button'><span>Continue with Facebook</span></div>
                            <div className='fake-google-button'><span>Continue with Google</span></div>
                            <div className='disclosure-text'>By continuing, you agree to Pinterest's <span className='disclosure-text-inline'>Terms of Service</span> and acknowledge you've read our 
                                <span className='disclosure-text-inline'> Privacy Policy. Notice at collection.</span></div>    
                            <div className='line-after-disclosure'></div>
                            <div className='bottom-text'>Not on Pinterest yet? Sign up</div>
                            <div className='bottom-text-business'>Are you a business? Get Started here!</div>
                            
                        </form>   
                        
                    </div>
                </>
            )
        }

    }  
    
    
    return (
        <>
            <div className='modal-background' onClick={e => setModalState(null)}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <div>

                        **TESTING: {modalState}**
                        {formMode()}
                    </div>  
                </div>
      
            </div>

        </>

    );
}

export default SessionModal;

