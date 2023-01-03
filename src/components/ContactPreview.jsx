import { Component } from 'react'

export class ContactPreview extends Component {
    render() {
        return (
            <div className='contact-preview-container'>
                <img src={`https://robohash.org/${this.props.contact.name}?set=set5`} alt={this.props.contact._id}/>
                <span>{this.props.contact.name}</span>
            </div>
        )
    }
}