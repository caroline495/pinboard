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
    const [errors, setErrors] = useState({});

    const hasErrors = !!Object.entries(errors).length;
    // console.log(errors); // for testing 
    // console.log(hasErrors) // for testing to make sure hasErrors has right boolean value in different conditions
    // if (hasErrors) console.log(errors.length);
    // const handleErrors = (error) => {
    //     {if (error.include("email").toLowercase()) {
    //         <p>{err}</p>
    //     }}
    // }
    
    
    const handleSubmit = e => {
        e.preventDefault();

        if (modalState === 'signup') {
            // const updatedEmail = email.toLowerCase();
            // setEmail(email => email = updatedEmail);
            // console.log(email);
            
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
                    {/* --------- SIGNUP MODAL --------- */}
                    <form onSubmit={handleSubmit} className='form'>
                            <div className='close-button' onClick={() => setModalState(null)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>

                        <div className='logo'>
                            <svg height="40" viewBox="-3 -3 82 82" width="40">
                                <title>Pinterest logo</title>
                                <circle cx="38" cy="38" fill="white" r="40"></circle>
                                <path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8
                                    3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8
                                    3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0
                                     11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2
                                      1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        
                        <span className='welcome'>Welcome to Pinboard</span> 
                        <div className='signup-welcome-caption'>Find new ideas to try</div>

                        {/* {hasErrors ? <div className='errors'>{errors.map((err, idx) => (<p key={idx}>{err}</p>))}</div> : ""} */}
                        <label><div className='input-label'>Username</div>
                            <input className='signup-modal-input' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                        {hasErrors && errors.username ? <div className='errors'><p>{errors.username[0]}</p></div> : ""}

                        <label><div className='input-label'>Email</div>
                            <input className='signup-modal-input' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
                        {hasErrors && errors.email ? <div className='errors'><p>{errors.email[0]}</p></div> : ""}

                        <label><div className='input-label'>Password</div>
                            <input className='signup-modal-input' placeholder='Password' 
                            type='password' value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        {hasErrors && errors.password ? <div className='errors'><p>{errors.password[0]}</p></div> : ""}
                        
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
                    {/* --------- LOGIN MODAL --------- */}
                    <div className='login-form'>
                        <form onSubmit={handleSubmit} className='form'>
                            <div className='close-button' onClick={() => setModalState(null)}>
                                <svg aria-hidden="true" aria-label="" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <path d="m15.18 12 7.16-7.16a2.25 2.25 0 1 0-3.18-3.18L12 8.82 4.84 1.66a2.25 2.25 0 1 0-3.18 3.18L8.82 12l-7.16 7.16a2.25 2.25 0 1 0 3.18 3.18L12 15.18l7.16 7.16a2.24 2.24 0 0 0 3.18 0c.88-.88.88-2.3 0-3.18z"></path>
                                </svg>
                            </div>
                            {/* <img src={logo} />   style="display: block;"*/  }
                            <div className='logo'>
                                <svg height="40" viewBox="-3 -3 82 82" width="40">
                                    <title>Pinterest logo</title>
                                    <circle cx="38" cy="38" fill="white" r="40"></circle>
                                    <path d="M27.5 71c3.3 1 6.7 1.6 10.3 1.6C57 72.6 72.6 57 72.6 37.8 72.6 18.6 57 3 37.8
                                     3 18.6 3 3 18.6 3 37.8c0 14.8 9.3 27.5 22.4 32.5-.3-2.7-.6-7.2 0-10.3l4-17.2s-1-2-1-5.2c0-4.8
                                      3-8.4 6.4-8.4 3 0 4.4 2.2 4.4 5 0 3-2 7.3-3 11.4C35.6 49 38 52 41.5 52c6.2 0 11-6.6 11-16 0-8.3-6-14-14.6-14-9.8 0-15.6 7.3-15.6 15 0 3 1 6 2.6 8 .3.2.3.5.2 1l-1 3.8c0 .6-.4.8-1 .4-4.4-2-7-8.3-7-13.4 0-11 7.8-21 22.8-21 12 0 21.3 8.6 21.3 20 0 12-7.4 21.6-18 21.6-3.4 0-6.7-1.8-7.8-4L32 61.7c-.8 3-3 7-4.5 9.4z" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <span className='welcome'>Welcome to Pinboard</span> <br></br>
                            {hasErrors ? <div className='errors'>{errors.map((err, idx) => (<p key={idx}>{err}</p>))}</div> : ""}
                            <label>
                                <div className='email-input-label'>Email </div>
                                <input className='login-modal-input' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
                            </label>
                            
                            <label><div className='input-label'>Password</div>
                                <input className='login-modal-input' placeholder='Password' 
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
                        {formMode()}
                    </div>  
                </div>
      
            </div>

        </>

    );
}

export default SessionModal;

