export default function Photo(props) {
    return <img className='game-img' onClick={props.onClick} src={props.img} alt ='Game Window' style={props.style}/>
}