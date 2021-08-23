import { Fragment, useEffect, useState } from 'react';
import firebase from './Firebase';

const popupStyle = {
    position: 'fixed',
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin:'auto',
    padding: '2rem 3rem',
    width: '400px',
    height: 'min-content',
    minHeight: '400px',
    textAlign: 'center',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 5px 3px rgba(0,0,0,0.7)',
}
const scoreStyle = {
    listStyle: 'none',
    padding: '0 1rem 0.3rem 1rem',
    width: '100%',
    textAlign: 'center',
}
const getScores = (setScores) =>  {
    const ref = firebase.firestore().collection('UsersA').orderBy('TimeScore').limit(10);
    ref.onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
            if(doc.data().Name !== 'Placeholder' && doc.data().TimeScore !== 'N/A')
            items.push(doc.data());
        });
        setScores(items);
    });
}

const ScoreList = (props) => {
    return <div>
        <h2>Highscores: </h2>
        <table id='score-list' style={scoreStyle}>
        <th>Name</th>
        <th>Time</th>
        { 
            props.scores.map((score) => <tr>
                <td>{score.Name}</td>
                <td>{score.TimeScore}</td>
            </tr>)
        }     
        </table>
    </div>
};

export default function EndPopup(props) {
    let [scores, setScores] = useState([]);
    let [name, setName] = useState('');
    let [bNameEntered, setBNameEntered] = useState(false);

    useEffect(() => {
        getScores(setScores);
    },[]);

    const handleScoreSubmit = (userId, TimeScoreString) => {
        setBNameEntered(true);
        firebase.firestore().collection('UsersA').doc(userId).update({ Name: name, TimeScore: TimeScoreString});
    };

    let timerTime = props.time;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return <div style={popupStyle}>
        <h1>Game Completed!</h1>
        <h2>You have found them all in {hours}:{minutes}:{seconds}</h2>
        {
            bNameEntered === false 
                ? <div  style={{padding: '5rem 0 0 0'}}>
                    <input value={name} placeholder='Your Name' onChange={(e) => setName(e.target.value)} type='text' />
                    <button onClick={() => handleScoreSubmit(props.userId, `${hours}:${minutes}:${seconds}`)}>Submit</button> 
                </div>
                : <ScoreList scores={scores}/> 
        }
    </div>
}