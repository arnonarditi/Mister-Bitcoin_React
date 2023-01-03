import { Component } from 'react'
import { Link } from "react-router-dom"
import { contactService } from "../services/contact.service"
import { ContactPreview } from "./ContactPreview"
import { eventBus } from '../services/event-bus.service'

export class ContactList extends Component {

    state = {
        contacts: null,
        filteredContacts: null,
    }

    componentDidMount() {
        this.loadContacts()
        eventBus.on('loadContacts', this.loadContacts)
    }

    loadContacts = async () => {
        try {
            const contacts = await contactService.getContacts()
            this.setState({ contacts })
            this.setState({ filteredContacts: contacts })
            this.props.setCurrContact(contactService.getCurrContact())
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleChange = (ev) => {
        this.setState({ filterBy: ev.target.value })
        this.getContactsByFilter(ev.target.value)
    }

    getContactsByFilter = async (filterBy) => {
        const filteredContacts = await contactService.getContacts(filterBy)
        this.setState({ filteredContacts: filteredContacts })
    }

    updateCurrContact(contactId) {
        this.props.toggleIsMenuOpen()
        this.props.setCurrContact(contactId)
        contactService.saveCurrContact(contactId)
    }

    render() {
        const { contacts, filteredContacts } = this.state
        const { toggleIsMenuOpen } = this.props
        if (!contacts) return <div>Loading...</div>
        return (
            <div className='contact-list-container'>
                <div className="form__group field search">
                    <input type="seacrh" className="form__field" placeholder="Name" name="name" id='name' onChange={this.handleChange} />
                    <label htmlFor="name" className="form__label">Search</label>
                </div>
                <img
                    className='icon menu'
                    src={require('../assets/imgs/menu.png')}
                    alt="save-changes"
                    title='Save'
                    onClick={toggleIsMenuOpen}
                />
                {/* <input placeholder='Search' onChange={this.handleChange}></input> */}
                <ul className='contact-list'>
                    {filteredContacts.map(contact =>
                        <Link
                            to={`/contact/${contact._id}`}
                            key={contact._id}
                            className='nav-link contact-preview'
                            onClick={() => this.updateCurrContact(contact._id)}
                        >
                            <li className='nav-link contact-preview'>
                                <ContactPreview contact={contact} />
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        )
    }
}