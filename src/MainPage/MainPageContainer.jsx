import React from "react"
import MainPage from "./MainPage.jsx";
import {compose} from "redux";
import {connect} from "react-redux";
import {change, getPosition, setWinner, startAI, startNewGame} from "../redux/game-reducer";

const MainPageContainer = ({
                               gameSquare, nextMove, winner, moveCounter,
                               P1, AI, score, getPosition, startNewGame,
                               change, setWinner, startAI
                           }, ...props) => {

    return <MainPage gameSquare={gameSquare} nextMove={nextMove}
                     winner={winner} moveCounter={moveCounter}
                     P1={P1} AI={AI} score={score}
                     getPosition={getPosition} startNewGame={startNewGame}
                     change={change} setWinner={setWinner}
                     startAI={startAI}/>
}

let mapStateToProps = (state) => {
    return {
        gameSquare: state.gamePage.gameSquare,
        nextMove: state.gamePage.nextMove,
        winner: state.gamePage.winner,
        moveCounter: state.gamePage.moveCounter,
        P1: state.gamePage.P1,
        AI: state.gamePage.AI,
        score: state.gamePage.score
    }
}

export default compose(connect(mapStateToProps, {
    getPosition,
    startNewGame,
    change,
    setWinner,
    startAI
}))(MainPageContainer)