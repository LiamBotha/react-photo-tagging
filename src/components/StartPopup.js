const startPopup = {        
    position: 'fixed',
    left:0,
    right:0,
    top:0,
    bottom:0,
    margin:'auto',
    padding: '2rem 3rem',
    width: '400px',
    height: 'min-content',
    textAlign: 'center',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 5px 3px rgba(0,0,0,0.7)',
};

const startButtonStyle = {
    padding: '0.5rem 1rem',
    background: 'orangered',
    color: 'white',
    fontSize: '1.2rem',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 0 3px 0px black'
}

export default function StartPopup(props) {
    return <div style={startPopup}>
    <h2>Welcome to my Hidden Objects Game</h2>
    <p>
      Click on a name on the bar at top to select them as your target.
      Once selected, just click where you think they are. If you are correct, their name will dissapear and they will be encircled.
    </p>
    <h4>Click Start to begin</h4>
    <button onClick={() => props.StartGame()} style={startButtonStyle}>Start</button>
    </div> 
}