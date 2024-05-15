import { useDispatch, useSelector } from 'react-redux';
import './PinIndex.css';
import { selectPins } from '../store/pinReducer';
import { selectCurrentUser } from '../store/sessionReducer';
import { useEffect } from 'react';
import PinIndexItem from './PinIndexItem';
import HomePage from './HomePage';
import './HomePage.css';

const PinIndex = () => {

    const dispatch = useDispatch();
    const pins = useSelector(selectPins);
    const currentUser = useSelector(selectCurrentUser);


    useEffect(() => {
        dispatch(fetchPins());
    }, [])

    const showCurrentUserPin = (pin) => {
        if (currentUser?.id === pin.creatorId) {
            return (<PinIndexItem key={pin.id} pin={pin}/>)
        } 
    }

    const createdPins = Object.values(pins).filter(pin => {if (currentUser?.id === pin.creatorId) return pin})

    const showAllOtherPin = (pin) => {
        if (currentUser?.id !== pin.creatorId) {
            return (<PinIndexItem key={pin.id} pin={pin}/>)
        } 
    }

    if (currentUser) {
        return (
        <>
            <div className='pin-status'>
            {/* <span className='pins-created'>{createdPins.length>0 ? '' : 'No pins created yet'}</span> */}
                {/* <span className='pin-count'>{createdPins ? `Pins: ${createdPins.length}` : ''} </span> */}
                    <div className='all-pins'>
                    {currentUser ? pins.map(pin => showCurrentUserPin(pin)) : ''}
                    </div>
            </div>
        </>
    )
    } else {
        return (
            <>
                <div className='splash-page'>
                    <div className='center-text'>Get your next dessert idea</div>
                    <div className='splash-images'>
                        <img className='splash-img-1' src='https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/blackberry_lavender_white_chocolate_scones.jpg'/>
                        <img className='splash-img-2' src='https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/matcha_jasmine_cake.jpg'/>
                        <img className='splash-img-3' src='https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/mango_sticky_rice.jpg'/>
                        <img className='splash-img-4' src='https://pinboard-project-seeds.s3.us-west-1.amazonaws.com/salted_caramel_chocolate_chip_cookie_bars.jpg'/>
                    </div>
                </div>
                
            </>
        )
    }
    
}

export default PinIndex;