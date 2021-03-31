const SET_POSITION = "SET_POSITION"
const CHANGE_MOVE = "CHANGE_MOVE"
const WINNER_CHECK = "WINNER_CHECK"
const INCREASE_COUNTER = "INCREASE_COUNTER"
const NEW_GAME = "NEW_GAME"
const CHANGE_PLAYER = "CHANGE_PLAYER"
const INCREASE_WINNER = "INCREASE_WINNER"
const CHANGE_AI_MODE = "CHANGE_AI_MODE"


let initialState = {
    gameSquare: Array(9).fill(null),
    nextMove: "X",
    winner: "",
    moveCounter: 0,
    P1: "X",
    score: [0, 0],
    AI: false
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSITION:
            state.gameSquare[action.position] = action.value
            return {...state}
        case CHANGE_MOVE:
            return {...state, nextMove: (state.nextMove === "X") ? "O" : "X"}
        case WINNER_CHECK:
            return {...state, winner: isWinner(state.gameSquare, state.nextMove, state.winner)}
        case INCREASE_COUNTER:
            return {...state, moveCounter: state.moveCounter + 1}
        case NEW_GAME:
            return {...state, gameSquare: Array(9).fill(null), moveCounter: 0, nextMove: "X", winner: ""}
        case CHANGE_PLAYER:
            return {...state, P1: (state.P1 === "X") ? "O" : "X"}
        case INCREASE_WINNER:
            state.score[action.numb]++
            return {...state, score: state.score}
        case CHANGE_AI_MODE:
            return {...state, AI: action.AI}
        default:
            return state;
    }
}

const isWinner = (arr, value, winner) => {
    let winLine = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < 8; i++) {
        let line = winLine[i];
        if (arr[line[0]] === value && arr[line[1]] === value && arr[line[2]] === value) {
            if (winner !== "") {
                return winner
            } else {
                return value
            }

        }
    }
    if (winner === "") {
        return ""
    }


}


export const setPosition = (position, value) => ({type: SET_POSITION, position, value})
export const changeMove = () => ({type: CHANGE_MOVE})
export const checkWinner = () => ({type: WINNER_CHECK})
export const increaseCounter = () => ({type: INCREASE_COUNTER})
export const newGame = () => ({type: NEW_GAME})
export const changePlayer = () => ({type: CHANGE_PLAYER})
export const changeAIMode = (AI) => ({type: CHANGE_AI_MODE, AI})
export const increaseWinner = (numb) => ({type: INCREASE_WINNER, numb})

export const getPosition = (position, value) => {
    return (dispatch) => {
        dispatch(setPosition(position, value));
        dispatch(checkWinner());
        dispatch(changeMove());
        dispatch(increaseCounter());

    }
}

export const startNewGame = () => {
    return (dispatch) => {

        dispatch(newGame());
        dispatch(changeAIMode(false))

    }
}
export const change = () => {
    return (dispatch) => {

        dispatch(changePlayer());

    }
}

export const setWinner = (numb) => {
    return (dispatch) => {

        dispatch(increaseWinner(numb));

    }
}

export const startAI = (numb, gameSquare) => {
    console.log(numb)
    let strategyAI = [0, 8, 0, 6, 0, 3, 4]
    let value = 'X'
    return (dispatch) => {
        if (!initialState.AI) {
            dispatch(changeAIMode(true))
        }
        if (gameSquare[strategyAI[numb]] === null) {
            dispatch(getPosition(strategyAI[numb], value));
        } else {
            if (gameSquare[strategyAI[numb]] !== null && strategyAI[numb] === 6) {
                dispatch(getPosition(2, value));
            } else {
                if (gameSquare[strategyAI[numb]] !== null && strategyAI[numb] === 3) {
                    dispatch(getPosition(7, value));
                } else {
                    dispatch(getPosition(gameSquare.findIndex(el => el === null), value));
                }
            }


        }
    }
}


export default gameReducer;