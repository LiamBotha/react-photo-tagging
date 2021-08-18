import { useDebugValue, useEffect, useState } from 'react';
import './App.css';
import EndPopup from './components/EndPopup';
import HitPoint from './components/HitPoint';
import Navbar from './components/Navbar';
import Photo from './components/Photo';
import img from './img/pierre-roussel-ps4-phone1.jpg';
import jokerImg from './img/Joker.png';
import promptoImg from './img/Prompto.png';
import nierImg from './img/Nier.png';
import StartPopup from './components/StartPopup';

const photoStyle = { width: '100vw', objectFit: 'cover' };

function App() {
  let [targets, setTargets] = useState([
    {name: 'Joker', posX: 55, posY: 53, threshold: 4, img: jokerImg},
    {name: '2B', posX: 25, posY: 65, threshold: 4, img: nierImg},
    {name: 'Prompto', posX: 22.7, posY: 43, threshold: 4, img: promptoImg},
  ]);
  let [foundTargets, setFoundTargets] = useState([]);
  let [curTarget, setCurTarget] = useState({id: 0 });
  let [bisStarted, setIsStarted] = useState(false);
  let [bIsCompleted, setIsCompleted] = useState(false);
  let [time, setTime] = useState(0);
  let [timeInterval, setTimeInterval] = useState(null);
  let [completedTime, setCompletedTime] = useState(-1);

  const StartGame = () => {
    setIsStarted(true);
    setTime(0);
    const startTime = Date.now();
    let interval = setInterval(() => setTime(Date.now() - startTime), 10);
    setTimeInterval(interval);
  }

  useEffect(() => {
    if(targets.length === 0)
    {
      setIsCompleted(true);
      setCompletedTime(time);
      clearInterval(timeInterval);
    }
  }, [targets]);

  const handleMouseClick = (e) => {
    let x = (e.clientX / e.target.width) * 100;
    let y = (e.pageY / e.target.height) * 100;
    console.log(`Mouse: ${x}, ${y}`);
    if(targets.length > 0)
    {
      let hitTarget = targets[curTarget.id];
      let bWithinXRange = Math.abs(hitTarget.posX - x) < hitTarget.threshold;
      let bWithinYRange = Math.abs(hitTarget.posY - y) < hitTarget.threshold;
      if(bWithinXRange && bWithinYRange)
      {
        setFoundTargets(prevState => [...prevState, hitTarget]);
        let newTargets = [...targets];
        newTargets.splice(curTarget.id, 1);
        setTargets(newTargets);
        setCurTarget({id: 0});
      }
    }
  };
  return (
    <div className="App">
      {
        !bisStarted && <StartPopup StartGame={StartGame}/>
      }
      <Navbar setCurTarget={setCurTarget} targets={targets} time={time}/>
      <Photo onClick={handleMouseClick} style={photoStyle} img={img} />
      { 
        foundTargets.map((x) => <HitPoint point={x}/>)
      }
      { bIsCompleted && <EndPopup time={completedTime}/> }
    </div>
  );
}

export default App;
