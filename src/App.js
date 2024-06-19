
import './App.css';
import GameLogic from './GameLogic';
function App() {
  return (
    <div className="App">
      <h1>Snake Game</h1>
    <GameLogic  width={600} height={600}/>
    
    </div>
  );
}

export default App;
