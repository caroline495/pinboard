import { useParams } from "react-router-dom";
import { selectBoard, selectBoardbyName } from "../store/boardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { selectPins } from '../store/pinReducer';
import PinIndexItem from "./PinIndexItem";

const BoardPage = () => {
    const dispatch = useDispatch();
    const { boardId } = useParams();
    // const { name } = useParams();
    // console.log(name, 'name');
    
    // const boardName = name.split('-').join(' ')
    // console.log(boardName, 'boardName');
    // const board = useSelector(selectBoardbyName(boardName));


    const board = useSelector(selectBoard(boardId));

    // this useEffect happens first before the board = useSelector(...), 
    // so the argument inside needs to be available before the useSelector
    useEffect(() => {
        dispatch(fetchBoard(boardId));
    }, [])

    const pins = useSelector(selectPins);
    console.log(pins, 'pins');

    return (
        <>
            <div className='board-page-header'>{board?.name}</div>
            
            <div className='all-pins'>
                    {pins.map(pin => <PinIndexItem key={pin.id} pin={pin}/>)}
            </div>
        </>
    )
}

export default BoardPage;