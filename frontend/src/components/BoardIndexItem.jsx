import { Link, useNavigate } from "react-router-dom";
import './BoardIndexItem.css';
import { useDispatch, useSelector } from "react-redux";
import { selectPins } from "../store/pinReducer";
import { useEffect } from 'react';
import { selectCurrentUser } from "../store/sessionReducer";

const BoardIndexItem = ({board}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const handleClick = () => {
    //     navigate(`/board/${username}/`);
    // }

    const session = useSelector(selectCurrentUser);
    const creator_id = session.id;
    const username = session.username;

    const pins = useSelector(selectPins);
    console.log(pins, 'pins');
    const pinsInBoard = pins.filter(pin => { if (pin.boardId === board.id) return pin });
    console.log(pinsInBoard, 'pinsInBoard');

    const boardName = board.name.split(' ').join('-');

    return (
        <>
            <Link to={`/board/${board.id}`}>
                <li className='board-index-link'>
                    <div className='board-index-image-container'>
                        {<img className='board-index-image' src={pinsInBoard[0]?.imageUrl}/>}
                    </div>
                    {board.name}
                </li>
            </Link>
        </>
    )
}

export default BoardIndexItem;