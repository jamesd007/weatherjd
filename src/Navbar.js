
import React, { Link, useMatch, useResolvedPath } from 'react-router-dom'
import './App.css'

const Navbar = () => {
    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvedPath.pathname, end: true })

        return (
            <li
                className={isActive ? "list_item_active" : "list_item"}
                style={props.style}
            >
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }

    return (
        <div >
            <nav className='header' >
                <Link to="/"
                    className='header-content'>
                    JD's Weather
                </Link>
                <div className='nav_btns'>
                    <CustomLink to="/">
                        HOME
                    </CustomLink>
                    <CustomLink to="/SvnDayForecast">
                        7-day Forecast
                    </CustomLink>
                    {/* TODO:need to show button as active if got there via navigation */}
                    {/* <CustomLink to="/forecast/:searchCity"
                        style={{ display: "none" }}>
                    </CustomLink> */}
                </div>
            </nav>
        </div>
    )
}




export default Navbar