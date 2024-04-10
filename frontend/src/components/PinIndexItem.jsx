import { Link, useNavigate } from "react-router-dom";
import './PinIndexItem.css';

const PinIndexItem = ({pin}) => {
    // console.log(pin);
    const navigate = useNavigate();
    
    // const handleClick = () => {
    //     navigate(`/pin/${username}/`);
    // }

    return (
        <>
            <Link to={`/pin/${pin.id}`}>
                <li className='pin-index-link'>
                    <div className='pin-index-image-container'>
                        {pin.imageUrl && (<img className='pin-index-image' src={pin.imageUrl}/>)}
                    </div>
                    {pin.title}
                </li>
            </Link>
        </>
    )
}

export default PinIndexItem;