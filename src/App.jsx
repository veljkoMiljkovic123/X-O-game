
import { useEffect, useState } from 'react'
import './App.css'
import Cell from './components/Cell';

function App() {
 
  const[cells,setCells]=useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
   //ko igra prvi
   const [firstGo,setFirstGo]=useState('circle')
   //pobednik
   const [winer,setWiner] = useState(null)

   let checkArray = cells.every((cell)=>cell!=="")

  useEffect(()=>{
    checkWinner();
  },[cells]);

  function checkWinner(){
    let winnerCombination = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
    ]

    winnerCombination.forEach((comb)=>{
      let crossWinner = comb.every((cell=>cells[cell]==='cross'))
      let circleWinner = comb.every((cell=>cells[cell]==='circle'))

        if(crossWinner){
          setWiner('Winner is cros')
          return;
        }else if(circleWinner){
          setWiner('Winner is circle')
          return;
        }else if(checkArray){
          setWiner('We dont have a winner!')
        }
    })
  }
 
  function handleResetGame(){

      if (winer || checkArray){
        let emptyArray = new Array(9).fill('');
        setWiner(null)
        setCells(emptyArray);
      }
   
  }

  return (
    <div className='app'>
     <h1 className='title'>X/O Game</h1>

     <div className='squareContainer'>
      {cells.map((cell,index)=>{
        return <Cell key={index} id={index} cell={cell} cells={cells} setCells={setCells} firstGo={firstGo} setFirstGo={setFirstGo} winer={winer}/>
      })}

        {winer && <h2 className='text-center'>{winer}</h2>}

        <button className='' onClick={handleResetGame}>Reset game</button>

     </div>
    </div>
  )
}

export default App
