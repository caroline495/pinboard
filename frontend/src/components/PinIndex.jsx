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
        if (currentUser.id === pin.creatorId) {
            return (<PinIndexItem key={pin.id} pin={pin}/>)
        } 
    }

    const showAllOtherPin = (pin) => {
        if (currentUser.id !== pin.creatorId) {
            return (<PinIndexItem key={pin.id} pin={pin}/>)
        } 
    }

    // console.log(pins, 'pins');
    return (
        <>
            <div className='pin-status'>
                {/* <br></br>
                <br></br> */}
                {/* No pins created yet */}

                {/* <ul> */}
                    <div className='all-pins'>
                    {pins.map(pin => showCurrentUserPin(pin))}
                    </div>
                {/* </ul> */}
            </div>
        </>
    )
}

export default PinIndex;