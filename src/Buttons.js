
export default function Buttons({startGame,pauseGame,resetGame}){


    return(
         
         <>
                 <button onClick={startGame}> Start</button>
                 <button onClick={pauseGame}>Pause</button>
                 <button onClick={resetGame}>Reset</button>
         </> 
        
    )
}