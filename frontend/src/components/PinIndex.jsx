import { useDispatch, useSelector } from 'react-redux';
import './PinIndex.css';
import { selectPins } from '../store/pinReducer';
import { selectCurrentUser } from '../store/sessionReducer';
import { useEffect } from 'react';
import PinIndexItem from './PinIndexItem';

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

    // console.log(pins, 'pins');
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
}

export default PinIndex;