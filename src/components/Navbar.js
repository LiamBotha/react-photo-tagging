export default function Navbar(props) {
    const navStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        background: '#1f1f1fdf',
        color: 'white',
    }
    const targetStyle = {
        fontSize: '1.2rem',
        margin: '1rem 0.6rem',
    }
    const populateTargets = (target, index) => {
        props.setCurTarget({ name: target.name, id: index });
    }
    return <div style={navStyle}>
        {
            props.targets.map((target, index) => {
                return <h2 onClick={() => populateTargets(target, index)} style={targetStyle}>
                    { target.name }
                </h2>    
            })
        }
    </div>
}