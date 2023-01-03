import React, { Component } from 'react'

export class MovesList extends Component {
    render() {
        const { user, contactId } = this.props
        return (
            <div className='moves-list'>
                <h4>Your Moves:</h4>
                <hr />
                <ul>
                    {user && user.moves.map(move =>
                        move.contactId === contactId &&
                        <li key={move.at} >
                            <p>At: {move.at}</p>
                            <p>Amount: {move.amount}</p>
                            <hr />
                        </li>
                    )}
                </ul>
            </div >
        )
    }
}
