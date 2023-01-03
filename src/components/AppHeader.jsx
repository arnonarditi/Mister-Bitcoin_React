import { NavLink, withRouter } from 'react-router-dom'

function _AppHeader(props) {

    function onBack() {
        props.history.goBack()
    }

    return (
        <header className="app-header">
            <NavLink className="logo nav-link" exact to="/">Contcoin</NavLink>
            <nav>
                <NavLink className="nav-link" exact to="/contact">CONTACTS</NavLink> |
                <NavLink className="nav-link" exact to="/chart">CHARTS</NavLink>
            </nav>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader)