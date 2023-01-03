import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bitcoinService } from "../services/bitcoinService"
import { userService } from "../services/userService"

class _HomePage extends Component {
    state = {
        userName: null,
        rate: null,
    }

    componentDidMount() {
        if (this.props.user) this.loadRate()
    }

    loadRate = async () => {
        try {
            const rate = await bitcoinService.getRate(this.props.user.coins)
            this.setState({ rate })
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = (ev) => {
        this.setState({userName: ev.target.value})
    }

    signup = () => {
        userService.signup(this.state.userName)
        this.props.history.push('/contact')
        this.props.updateUser()
    }

    render() {
        const { rate } = this.state
        const { user } = this.props
        return (
            <section className='home-page'>
                {
                    !user ?
                        <div className='signup'>
                            <h1 className='title'>Bitcoin is an innovative payment network and a new kind of money.</h1>
                            <div className="form__group field">
                                <input type="text" className="form__field" placeholder="Name" name="name" id='name' onChange={this.handleChange} />
                                <label htmlFor="name" className="form__label">Name</label>
                            </div>
                            <button className='signup-btn' onClick={this.signup}>
                                <img className='icon' src={require('../assets/imgs/signup.png')} alt="signup" />
                            </button>
                        </div> :
                        <div>
                            <h4>Home {user?.name}!</h4>
                            <p>Coins: {user?.coins}</p>
                            <p>BTC: {rate}</p>
                        </div>
                }

                {/* <div>
                    <h4>Home {user?.name}!</h4>
                    <p>Coins: {user?.coins}</p>
                    <p>BTC: {rate}</p>
                </div> */}
            </section>
        )
    }
}

export const HomePage = withRouter(_HomePage)