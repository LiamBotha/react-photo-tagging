import { useEffect, useState } from 'react';
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
import firebase from './components/Firebase';

const photoStyle = { width: '100vw', objectFit: 'cover' };

function App() {
  let [targets, setTargets] = useState([
    {name: 'Joker', img: jokerImg},
    {name: '2B', img: nierImg},
    {name: 'Prompto', img: promptoImg},
  ]);
  let [foundTargets, setFoundTargets] = useState([]);
  let [curTarget, setCurTarget] = useState({id: 0 });

  let [bisStarted, setIsStarted] = useState(false);
  let [bIsCompleted, setIsCompleted] = useState(false);
  console.log('refreshing completed', bIsCompleted);
  
  let [time, setTime] = useState(0);
  let [timeInterval, setTimeInterval] = useState(null);
  let [completedTime, setCompletedTime] = useState(-1);

  let [userId, setUserId] = useState('');

  const StartGame = () => {
    setIsStarted(true);
    setTime(0);
    const startTime = Date.now();
    let interval = setInterval(() => setTime(Date.now() - startTime), 10);
    setTimeInterval(interval);

    const id = firebase.firestore().collection('UsersA').doc().id
    firebase.firestore().collection('UsersA').doc(id).set({ Name: 'Placeholder', TimeScore: 'N/A', startTime });
    setUserId(id);
  }
  
  useEffect(() => {
    if(targets.length === 0)
    {
      const ref = firebase.firestore().collection('UsersA').doc(userId);
      ref.get().then((item) => {
        let val = Date.now() - item.data().startTime;
          setIsCompleted(true);
          setCompletedTime(val);
          clearInterval(timeInterval);
      })
    }
  }, [targets]);

  const handleMouseClick = (e) => {
    let x = (e.clientX / e.target.width) * 100;
    let y = (e.pageY / e.target.height) * 100;
    console.log(`Mouse: ${x}, ${y}`);
    if(targets.length > 0)
    { 
      let hitTarget = targets[curTarget.id];
      const ref = firebase.firestore().collection('PhotoA').doc(hitTarget.name);
      ref.onSnapshot((querySnapshot) => {
        const posX = querySnapshot.data().PosX;
        const posY = querySnapshot.data().PosY;
        const threshold = querySnapshot.data().Threshold;

        let bWithinXRange = Math.abs(posX - x) < threshold;
        let bWithinYRange = Math.abs(posY - y) < threshold;
        if(bWithinXRange && bWithinYRange)
        {
          setFoundTargets(prevState => [...prevState, {name: hitTarget.name, posX, posY, threshold}]);
          let newTargets = [...targets];
          newTargets.splice(curTarget.id, 1);
          setTargets(newTargets);
          setCurTarget({id: 0});
        }
      });
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
      { bIsCompleted && <EndPopup time={completedTime} userId={userId}/> }
    </div>
  );
}

export default App;
