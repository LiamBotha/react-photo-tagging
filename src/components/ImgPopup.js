export default function ImgPopup(props) {
    let {target} = props;
    return <img src={target.img} alt={target.name} style={{
        width: '50px', height: '50px',
        objectFit: 'cover', objectPosition: 'top',
        border: '1px solid white', margin: '0 1rem',
    }}/>
}