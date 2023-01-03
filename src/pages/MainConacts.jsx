import { Component } from 'react'
import { ContactList } from '../components/ContactList'
import { ContactDetailsPage } from './ContactDetailesPage'

export class MainContacts extends Component {

    state = {
        currContactId: null,
        isMenuOpen : false
    }

    setCurrContact = (contactId) => {
        this.setState({ currContactId: contactId })
    }

    toggleIsMenuOpen = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen })
    }

    render() {
        const { currContactId, isMenuOpen } = this.state
        const { user, updateUser } = this.props
        return (
            <div className='main-contacts'>
                <section className={isMenuOpen? 'contacts-container' : 'contacts-container close'}>
                    <ContactList currContactId={currContactId} setCurrContact={this.setCurrContact} isMenuOpen={isMenuOpen} toggleIsMenuOpen={this.toggleIsMenuOpen}/>
                </section>
                <section className="contact-detailes">
                    <ContactDetailsPage currContactId={currContactId} user={user} updateUser={updateUser} contactId={currContactId} isMenuOpen={isMenuOpen} toggleIsMenuOpen={this.toggleIsMenuOpen}/>
                </section>
            </div>
        )
    }
}