import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../store/sessionReducer";
import { useNavigate } from "react-router-dom";
import { selectBoards, fetchBoards } from "../store/boardReducer";

const BoardCreateModal = () => {
    const currentUser = useSelector(selectCurrentUser);
    const creator_id = currentUser.id;
    const navigate = useNavigate();

    const username = currentUser.username;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [privateMode, setPrivate] = useState(false);
    const [boardCreated, setBoardCreated] = useState(false);
    const [lastBoard, setLastBoard] = useState({});
    const boards = useSelector(selectBoards);

    useEffect(() => {
        dispatch(fetchBoards())
        .then(()=> setLastBoard(boards[boards.length - 1]));
    }, [])

    useEffect(()=> {
        if (boardCreated) {
            setLastBoard(boards[boards.length - 1]);
        }
    }, [boardCreated, boards]);

    const handleBoardSubmit = e => {
        e.preventDefault();

        // replace what's inside createPin with 'data', before was: { creator_id, description, title, link }
        dispatch(createBoard({ creator_id, description, name, privateMode}))
        .then(() => console.log('board created'))
        .catch(async res => {
            let data = await res.json();
            setErrors(data.errors);
          });

        setBoardCreated(true);
        navigate(`/board/${lastBoard.id? lastBoard.id:''}/`);
    }
    return (
        <>
            <div className='create-board-form'>
                <form onSubmit={handleBoardSubmit}>
                    <div className='form-header'>
                        <span className='create-pin-span'>Create board</span>
                    </div>
                    <div className='form-text-input'>
                        <label>
                            <div className='pinform-input-label'>Name </div>
                            <input className='pinform-input' placeholder='Like "Places to Go" or "Recipes to Make"' value={name} onChange={e => setName(e.target.value)} />
                        </label>

                        <label>
                            <div className='pinform-input-label'>Keep this board secret</div>
                            <span>So only you and collaborators can see it. Learn more</span>
                            <input className='pinform-input' placeholder='Like "Places to Go" or "Recipes to Make"' value={name} onChange={e => setName(e.target.value)} />
                        </label>
                    </div>
                    <button id='signup-submit' className='publish-button' type='submit'>Create</button>
                    
                </form>
            </div>
        </>
    )
}

export default BoardCreateModal;