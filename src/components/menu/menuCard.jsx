import { useNavigate } from 'react-router-dom'
import '../../css/menu.css'

function RenderMenuCard ({ data, isActive, index, setIsindex }) {

    const navigate = useNavigate()

    const cardClick = () => {
        navigate(data.path)
        data.dispatch()
    }

    const cardMouseMove = () => {
        setIsindex(index)
    }

    return (
        <div className={isActive ? 'menu-card-box active' : 'menu-card-box'} onMouseMove={cardMouseMove} onClick={cardClick}>

            <div className={isActive ? 'menu-card-poster-box active' : "menu-card-poster-box"}>

                <img src={data.img} />

            </div>

            <span className="menu-card-name-box">{data.name}</span>

        </div>
    )
}

export default RenderMenuCard