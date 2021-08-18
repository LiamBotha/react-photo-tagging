import ImgPopup from "./ImgPopup";

const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    background: '#1f1f1fdf',
    color: 'white',
    alignItems: 'center',
}
const targetStyle = {
    fontSize: '1.2rem',
    margin: '1rem 0.6rem',
    display: 'flex',
    alignItems: 'center',
}

export default function Navbar(props) {
    const populateTargets = (target, index) => {
        props.setCurTarget({ name: target.name, id: index });
    }
    let timerTime = props.time;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = (Math.floor(timerTime / 60000));
    return <div style={navStyle}>
        {
            props.targets.map((target, index) => {
                return <h2 onClick={() => populateTargets(target, index)} style={targetStyle}>
                    { target.name }
                    <ImgPopup target={target} />
                </h2>    
            })
        }
        <h3 style={{marginLeft: 'auto', padding: ' 0 2rem'}}>{minutes < 10 ? '0' + minutes : minutes} : {seconds}</h3>
    </div>
}