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
    padding: 0,
}

export default function EndPopup(props) {
    let timerTime = props.time;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = (Math.floor(timerTime / 60000));
    return <div style={popupStyle}>
        <h1>Game Completed!</h1>
        <h2>You have found them all in {minutes < 10 ? '0' + minutes : minutes} : {seconds}</h2>
        <h2>Highscores: </h2>
        <ul id='score-list' style={scoreStyle}>
            <li>1. Jon Ivy - 00:00:12</li>
            <li>2. Jon Ivy - 00:00:12</li>
            <li>3. Jon Ivy - 00:00:12</li>
            <li>4. Jon Ivy - 00:00:12</li>
        </ul>
    </div>
}