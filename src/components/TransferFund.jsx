import React, { Component } from 'react'
import { userService } from '../services/userService'

export class TransferFund extends Component {
    state = {
        amount: null,
    }

    handleChange = (ev) => {
        this.setState({ amount: ev.target.value })
    }

    transfer = () => {
        if(this.state.amount && this.state.amount > 0) {
            userService.addMove(this.props.contact, this.state.amount)
            this.props.updateUser()
        }
    }

    render() {
        const { contact } = this.props
        return (
            <div className='transfer-fund'>
                <p>Transfer coins to {contact.name}</p>
                <div className='amount-countainer'>
                    <p>Amount:</p>
                    <div className="form__group field edit-field amount-field">
                        <input
                            type="number"
                            className="form__field edit-form-field"
                            placeholder="Name"
                            onChange={(ev) => this.handleChange(ev)}
                        />
                    </div>
                    <button onClick={this.transfer}>Transfer</button>
                </div>
            </div>
        )
    }
}
