export default function HitPoint(props) {
    let { point } = props;
    let img = document.querySelector('.game-img')
    let x =  point.posX / 100 * img.width;
    let y =  point.posY / 100 * img.height;
    let threshold = point.threshold / 100 * img.width;
    let hitStyle = { 
        position: 'absolute', width:`${threshold*2}px`, height:`${threshold*2}px`,
        left: `${x - threshold}px`,top:`${y - threshold}px`,
        borderRadius: '50%', border: '3px solid lightgreen',
    };
    return <div style={hitStyle}>
    </div>
}