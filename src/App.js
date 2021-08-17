import { useState } from 'react';
import './App.css';
import HitPoint from './components/HitPoint';
import Navbar from './components/Navbar';
import Photo from './components/Photo';
import img from './pierre-roussel-ps4-phone1.jpg';

function App() {
  const photoStyle = {width: '100vw', objectFit: 'cover'};

  let [targets, setTargets] = useState([
    {name: 'Arsene', posX: 55, posY: 53, threshold: 5},
    {name: 'B', posX: 40, posY: 53, threshold: 5},
  ]);
  let [foundTargets, setFoundTargets] = useState([]);

  let [bClicked, setClicked] = useState(false);
  let [clickPos, setClickPos] = useState({posX:0, posY: 0});
  let [curTarget, setCurTarget] = useState({id: 0 });

  const handleMouseClick = (e) => {
    let x = (e.clientX / e.target.width) * 100;
    let y = (e.pageY / e.target.height) * 100;
    console.log(`Mouse: ${x}, ${y}`);
    setClicked(true);
    setClickPos({posX: x, posY: y});
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
      {/* <Navbar setCurTarget={setCurTarget} targets={targets}/> */}
      <Photo onClick={handleMouseClick} style={photoStyle} img={img} />
      { 
        foundTargets.map((x) => <HitPoint point={x}/>)
      }
    </div>
  );
}

export default App;
