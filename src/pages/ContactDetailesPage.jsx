import { Component } from 'react'
import { Link } from "react-router-dom"
import { contactService } from "../services/contact.service"
import { TransferFund } from '../components/TransferFund'
import { MovesList } from '../components/MovesList'
import { AppContact } from "../components/AddContact"
import { eventBus } from '../services/event-bus.service'

export class ContactDetailsPage extends Component {

    state = {
        contact: null,
        editableContact: null,
        isEditOn: false,
        isAddContactMode: false
    }

    async componentDidMount() {
        this.loadContact()
        eventBus.on('closeAddNewContact', ()=> {
            this.setState({ isAddContactMode: false })
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.contactId !== prevProps.contactId) {
            this.loadContact()
        }
    }

    loadContact = async () => {
        try {
            const contactId = this.props.contactId
            if (contactId) {
                const contact = await contactService.getContactById(contactId)
                this.setState({ contact })
            }
        } catch (err) {
            console.log('err:', err)
        }
    }

    handleContactDetailesChanged = (ev, type) => {
        this.setState(prevState => ({
            contact: {
                ...prevState.contact,
                [type]: ev.target.value,
            }
        }))
    }

    toggleIsEditOn = () => {
        this.setState({ isEditOn: !this.state.isEditOn })
    }

    toggleIsAddContactOn = () => {
        this.setState({ isAddContactMode: !this.state.isAddContactMode })
    }

    saveContactDetailes = () => {
        contactService.saveContact(this.state.contact)
        this.setState({ isEditOn: false })
    }

    render() {
        const { contact, isEditOn, isAddContactMode } = this.state
        const { user, updateUser, toggleIsMenuOpen } = this.props
        if (!contact) return <div className='main-detailes-page'>
            <img
                className='icon menu'
                src={require('../assets/imgs/menu.png')}
                alt="save-changes"
                title='Save'
                onClick={toggleIsMenuOpen}
            />
            <h1 className='primary-title'>Welcome to our contact web app!</h1>
            <h2 className='secomdary-title'> We offer a simple and efficient way to manage and store all of your personal and professional contacts in one place.</h2>
            <img src='https://www.rotork.com/uploads/page-images/5625/1575989448.jpg' alt='contact-img'/>
        </div>
        return (
            <section className='contact-detailes-container'>
                <div className='icon top-left'>
                    <img
                        className='icon menu'
                        src={require('../assets/imgs/menu.png')}
                        alt="save-changes"
                        title='Save'
                        onClick={toggleIsMenuOpen}
                    />
                    <Link
                        to={'/contact'}
                        onClick={this.toggleIsAddContactOn}
                    >
                        <img
                            className='icon plus'
                            src={require('../assets/imgs/plus.png')}
                            alt="save-changes"
                            title='Save'
                        />
                    </Link>
                </div>
                <img
                    className='icon edit'
                    src={!isEditOn ? require('../assets/imgs/edit-text.png') : require('../assets/imgs/turn-back.png')}
                    alt="edit-contact"
                    title={!isEditOn ? 'Edit' : 'Cancle'}
                    onClick={this.toggleIsEditOn}
                />
                {
                    !isAddContactMode &&
                    <img className='avatar' src={`https://robohash.org/${contact.name}?set=set5`} alt={contact._id} />
                }
                {!isAddContactMode && !isEditOn ?
                    <p className='detailes-info'>{contact.name}</p> :
                    !isAddContactMode &&
                    <div className="form__group field edit-field">
                        <input
                            type="text"
                            className="form__field  edit-form-field"
                            placeholder="Name"
                            value={contact.name}
                            onChange={(ev) => this.handleContactDetailesChanged(ev, "name")}
                        />
                    </div>
                }
                {isAddContactMode ?
                    <AppContact 
                        toggleIsAddContactOn={this.toggleIsAddContactOn}
                        toggleIsMenuOpen={toggleIsMenuOpen}
                    /> :
                    <section className='detailes-container'>
                        <div className='detailes'>
                            <div className='phone-section'>
                                <img className='icon' src={require('../assets/imgs/phone-call.png')} alt="phone-icon" />
                                {!isEditOn ?
                                    <p className='detailes-info'>{contact.phone}</p> :
                                    <div className="form__group field edit-field detailes-field">
                                        <input
                                            type="tel"
                                            className="form__field  edit-form-field phone-field"
                                            placeholder='Phone'
                                            value={contact.phone}
                                            onChange={(ev) => this.handleContactDetailesChanged(ev, "phone")}
                                        />
                                    </div>
                                }
                            </div>
                            <div className='email-section'>
                                <img className='icon' src={require('../assets/imgs/email.png')} alt="email-icon" />
                                {!isEditOn ?
                                    <p className='detailes-info'>{contact.email}</p> :
                                    <div className="form__group field edit-field detailes-field">
                                        <input
                                            type="email"
                                            className="form__field edit-form-field email-field"
                                            placeholder='Email'
                                            value={contact.email}
                                            onChange={(ev) => this.handleContactDetailesChanged(ev, "email")}
                                        />
                                    </div>
                                }
                            </div>
                            <div className='address-section'>
                                <img className='icon' src={require('../assets/imgs/location.png')} alt="location-icon" />
                                <div className='location'>
                                    <p>{contact.address.city}</p>
                                    <p>{contact.address.street}</p>
                                </div>
                            </div>
                        </div>
                        <TransferFund contact={contact} updateUser={updateUser} />
                        {user &&
                            user.moves.length > 0 &&
                            user.moves.filter(move => move.contactId === contact._id).length > 0 &&
                            <MovesList user={user} contactId={contact._id} />
                        }
                    </section>
                }
                {isEditOn &&
                    <img
                        className='icon save'
                        src={require('../assets/imgs/save-file.png')}
                        alt="save-changes"
                        title='Save'
                        onClick={this.saveContactDetailes}
                    />
                }
            </section>
        )
    }
}