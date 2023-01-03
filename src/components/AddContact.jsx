import { Component } from 'react'
import { Link } from "react-router-dom"
import { contactService } from "../services/contact.service"
import { eventBus } from '../services/event-bus.service'

export class AppContact extends Component {

    state = {
        contact: contactService.getEmptyContact(),
    }

    handleContactDetailesChanged = (ev, type) => {
        var value = ev.target.value
        if (type === "city" || type === "street") {
            this.setState(prevState => ({
                contact: {
                    ...prevState.contact,
                    address: {
                        ...prevState.contact.address,
                        [type]: value
                    },
                }
            }))
        } else {
            this.setState(prevState => ({
                contact: {
                    ...prevState.contact,
                    [type]: value,
                }
            }))
        }
    }

    saveNewContact = async () => {
        if (this.state.contact.name !== "" &&
            this.state.contact.phone !== "" &&
            this.state.contact.email !== "" &&
            this.state.contact.address.city !== "" &&
            this.state.contact.address.street !== ""
        ) {
            await contactService.saveContact(this.state.contact)
            eventBus.emit('loadContacts')
            eventBus.emit('closeAddNewContact')
        }
        else {
            console.log('Missing Detailes')
        }
    }

    render() {
        const { contact } = this.state
        const { toggleIsAddContactOn, toggleIsMenuOpen } = this.props
        return (
            <section>
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
                        onClick={toggleIsAddContactOn}
                    >
                        <img
                            className='icon plus'
                            src={require('../assets/imgs/plus.png')}
                            alt="save-changes"
                            title='Save'
                        />
                    </Link>
                </div>
                <img className='avatar' src={contact.name === "" ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : `https://robohash.org/${contact.name}?set=set5`} alt="avatar" />
                <div className="form__group field edit-field">
                    <input
                        type="text"
                        className="form__field  edit-form-field"
                        placeholder="Name"
                        value={contact.name}
                        onChange={(ev) => this.handleContactDetailesChanged(ev, "name")}
                    />
                </div>
                <section className='detailes-container'>
                    <div className='detailes'>
                        <div className='phone-section'>
                            <img className='icon' src={require('../assets/imgs/phone-call.png')} alt="phone-icon" />
                            <div className="form__group field edit-field detailes-field">
                                <input
                                    type="tel"
                                    className="form__field edit-form-field phone-field"
                                    placeholder='Phone'
                                    value={contact.phone}
                                    onChange={(ev) => this.handleContactDetailesChanged(ev, "phone")}
                                />
                            </div>
                        </div>
                        <div className='email-section'>
                            <img className='icon' src={require('../assets/imgs/email.png')} alt="email-icon" />
                            <div className="form__group field edit-field detailes-field">
                                <input
                                    type="email"
                                    className="form__field edit-form-field email-field"
                                    placeholder='Email'
                                    value={contact.email}
                                    onChange={(ev) => this.handleContactDetailesChanged(ev, "email")}
                                />
                            </div>
                        </div>
                        <div className='address-section'>
                            <img className='icon' src={require('../assets/imgs/location.png')} alt="location-icon" />
                            <div className='location'>
                                <div className="form__group field edit-field detailes-field">
                                    <input
                                        type="text"
                                        className="form__field edit-form-field email-field"
                                        placeholder='City'
                                        value={contact.address.city}
                                        onChange={(ev) => this.handleContactDetailesChanged(ev, "city")}
                                    />
                                </div>
                                <div className="form__group field edit-field detailes-field">
                                    <input
                                        type="text"
                                        className="form__field edit-form-field email-field"
                                        placeholder='Street'
                                        value={contact.address.street}
                                        onChange={(ev) => this.handleContactDetailesChanged(ev, "street")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <img
                    className='icon save'
                    src={require('../assets/imgs/save-file.png')}
                    alt="save-changes"
                    title='Save'
                    onClick={this.saveNewContact}
                />
            </section>
        )
    }
}