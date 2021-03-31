import React from "react"
import s from "./MainPage.module.css";


const MainPage = ({
                      gameSquare, nextMove, winner, moveCounter,
                      P1, AI, score, getPosition, startNewGame,
                      change, setWinner, startAI
                  }, ...props) => {
    let id = 0;


    let choiceSquare = (event) => {

        let position = event.target.getAttribute("data")

        if (gameSquare[position] !== null) {
            console.log("you can move on this square")
        } else {
            if (winner === "") {
                getPosition(position, nextMove);
                if (AI) {
                    startAI(moveCounter, gameSquare)
                }


            }

        }
    }
    let Winner = (a) => {
        setWinner(a)
        return <div>Player{a + 1} is winner</div>
    }
    let showScore = () => {
        alert('Player1 win ' + score[0] + ' times  Player2 win ' + score[1] + ' times')
    }
    let startGameAI = () => {
        alert('Rules: You play like a Second player your weapon "O" ')
        startAI(0, gameSquare)
    }
    return <div className={s.gameField}>
        <div className={s.info}>
            <div>
                <div>{moveCounter} MOVE</div>
                <div>YOUR TURN: {nextMove}</div>
            </div>
            <div>
                <button onClick={showScore}>Score</button>
                Player1: {P1} Player2: {(P1 === "X") ? "O " : "X "}
                <button onClick={(moveCounter === 0) ? change : console.log("You cant change")}>Change</button>
            </div>
        </div>
        {(winner !== "")
            ? <div className={s.results}>{(winner === P1)
                ? Winner(0)
                : Winner(1)
            }
            </div>
            : (moveCounter === 9)
                ? <div className={s.results}>It is DRAW
                </div>
                : <div></div>
        }
        <button onClick={startNewGame}>NEW GAME</button>
        <button onClick={startGameAI}>Against AI</button>
        <div className={s.gameSquare}>
            {gameSquare.map(c => <div key={id++} className={s.square} onClick={choiceSquare} data={id}>
                <div>{c}</div>
            </div>)}
        </div>
    </div>

}
export default MainPage

