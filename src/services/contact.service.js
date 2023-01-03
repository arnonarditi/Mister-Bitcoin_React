import { storageService } from "./storage.service"

const STORAGE_KEY = 'contact'
const STORAGE_KEY_CURR = 'currContact'

export const contactService = {
    getContacts,
    getContactById,
    deleteContact,
    saveContact,
    getEmptyContact,
    getCurrContact,
    saveCurrContact
}

const contacts = [
    {
        "_id": "5a56640269f443a5d64b32ca",
        "name": "Ochoa Hyde",
        "email": "ochoahyde@renovize.com",
        "phone": "+1 (968) 593-3824",
        "address": {
            "street": "40 Bizaron",
            "city": "Tel Aviv",
            "lat": "32.067670",
            "lon": "34.797700"
        }
    },
    {
        "_id": "5a5664025f6ae9aa24a99fde",
        "name": "Hallie Mclean",
        "email": "halliemclean@renovize.com",
        "phone": "+1 (948) 464-2888",
        "address": {
            "street": "7 Ramat Hagolan",
            "city": "Jerusalem",
            "lat": "31.801970",
            "lon": "35.222280"
        }
    },
    {
        "_id": "5a56640252d6acddd183d319",
        "name": "Parsons Norris",
        "email": "parsonsnorris@renovize.com",
        "phone": "+1 (958) 502-3495",
        "address": {
            "street": "37 Kol Moshe",
            "city": "Jerusalem",
            "lat": "31.768910",
            "lon": "35.192300"
        }
    },
    {
        "_id": "5a566402ed1cf349f0b47b4d",
        "name": "Rachel Lowe",
        "email": "rachellowe@renovize.com",
        "phone": "+1 (911) 475-2312",
        "address": {
            "street": "33 Etsel St.",
            "city": "Ramat Gan",
            "lat": "32.066920",
            "lon": "34.835910"
        }
    },
    {
        "_id": "5a566402abce24c6bfe4699d",
        "name": "Dominique Soto",
        "email": "dominiquesoto@renovize.com",
        "phone": "+1 (807) 551-3258",
        "address": {
            "street": "8 Nachum Goldman",
            "city": "Tel Aviv",
            "lat": "32.056430",
            "lon": "34.756830"
        }
    },
    {
        "_id": "5a566402a6499c1d4da9220a",
        "name": "Shana Pope",
        "email": "shanapope@renovize.com",
        "phone": "+1 (970) 527-3082",
        "address": {
            "street": "Hagefen 18",
            "city": "Haifa",
            "lat": "32.8172400",
            "lon": "34.989440"
        }
    },
    {
        "_id": "5a566402f90ae30e97f990db",
        "name": "Faulkner Flores",
        "email": "faulknerflores@renovize.com",
        "phone": "+1 (952) 501-2678",
        "address": {
            "street": "12 Barkat",
            "city": "Petah Tikva",
            "lat": "32.089870",
            "lon": "34.880450"
        }
    },
    {
        "_id": "5a5664027bae84ef280ffbdf",
        "name": "Holder Bean",
        "email": "holderbean@renovize.com",
        "phone": "+1 (989) 503-2663",
        "address": {
            "street": "59 Ben Eliezer Arie",
            "city": "Ramat Gan",
            "lat": "32.061310",
            "lon": "34.830790"
        }
    },
    {
        "_id": "5a566402e3b846c5f6aec652",
        "name": "Rosanne Shelton",
        "email": "rosanneshelton@renovize.com",
        "phone": "+1 (968) 454-3851",
        "address": {
            "street": "22 Hatzfira",
            "city": "Jerusalem",
            "lat": "31.765410",
            "lon": "35.216990"
        }
    },
    {
        "_id": "5a56640272c7dcdf59c3d411",
        "name": "Pamela Nolan",
        "email": "pamelanolan@renovize.com",
        "phone": "+1 (986) 545-2166",
        "address": {
            "street": "106 Herzl",
            "city": "Rehovot",
            "lat": "31.903410",
            "lon": "34.806830"
        }
    },
    {
        "_id": "5a5664029a8dd82a6178b15f",
        "name": "Roy Cantu",
        "email": "roycantu@renovize.com",
        "phone": "+1 (929) 571-2295",
        "address": {
            "street": "8 Margosa Yehuda",
            "city": "Tel Aviv",
            "lat": "32.0382700",
            "lon": "34.747590"
        }
    },
    {
        "_id": "5a5664028c096d08eeb13a8a",
        "name": "Ollie Christian",
        "email": "olliechristian@renovize.com",
        "phone": "+1 (977) 419-3550",
        "address": {
            "street": "1 Ben Gurion",
            "city": "Bnei Brak",
            "lat": "32.096080",
            "lon": "34.821950"
        }
    },
    {
        "_id": "5a5664026c53582bb9ebe9d1",
        "name": "Nguyen Walls",
        "email": "nguyenwalls@renovize.com",
        "phone": "+1 (963) 471-3181",
        "address": {
            "street": "17 Lazarov",
            "city": "Rishon Lezion",
            "lat": "31.993540",
            "lon": "34.770510"
        }
    },
    {
        "_id": "5a56640298ab77236845b82b",
        "name": "Glenna Santana",
        "email": "glennasantana@renovize.com",
        "phone": "+1 (860) 467-2376",
        "address": {
            "street": "21 Haorgim",
            "city": "Holon",
            "lat": "32.010270",
            "lon": "34.800970"
        }
    },
    {
        "_id": "5a56640208fba3e8ecb97305",
        "name": "Malone Clark",
        "email": "maloneclark@renovize.com",
        "phone": "+1 (818) 565-2557",
        "address": {
            "street": "26 Shabazi",
            "city": "Rosh Haayin",
            "lat": "32.096550",
            "lon": "34.943470"
        }
    },
    {
        "_id": "5a566402abb3146207bc4ec5",
        "name": "Floyd Rutledge",
        "email": "floydrutledge@renovize.com",
        "phone": "+1 (807) 597-3629",
        "address": {
            "street": "4 Da Vinci",
            "city": "Ashdod",
            "lat": "31.775570",
            "lon": "34.626070"
        }
    },
    {
        "_id": "5a56640298500fead8cb1ee5",
        "name": "Grace James",
        "email": "gracejames@renovize.com",
        "phone": "+1 (959) 525-2529",
        "address": {
            "street": "12 Agripas",
            "city": "Jerusalem",
            "lat": "31.783180",
            "lon": "35.216230"
        }
    },
    {
        "_id": "5a56640243427b8f8445231e",
        "name": "Tanner Gates",
        "email": "tannergates@renovize.com",
        "phone": "+1 (978) 591-2291",
        "address": {
            "street": "63 Abarbanel",
            "city": "Bnei Brak",
            "lat": "32.095530",
            "lon": "34.839640"
        }
    },
    {
        "_id": "5a5664025c3abdad6f5e098c",
        "name": "Lilly Conner",
        "email": "lillyconner@renovize.com",
        "phone": "+1 (842) 587-3812",
        "address": {
            "street": "1 Hamelech George",
            "city": "Jerusalem",
            "lat": "31.763350",
            "lon": "35.214790"
        }
    }
];

function sort(arr) {
    return arr.sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
            return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
            return 1;
        }

        return 0;
    })
}

function getContacts(filterBy = null) {
    var currContacts = storageService.load(STORAGE_KEY)
    if (currContacts) {
        if (filterBy) {
            currContacts = filter(filterBy)
        }
        return sort(currContacts)
    } else {
        return new Promise((resolve, reject) => {
            var contactsToReturn = contacts;
            if (filterBy) {
                contactsToReturn = filter(filterBy)
            }
            storageService.store(STORAGE_KEY, contactsToReturn)
            resolve(sort(contactsToReturn))
        })
    }
}

function getContactById(id) {
    var currContacts = storageService.load(STORAGE_KEY)
    if (currContacts) return currContacts.find(contact => contact._id === id)

    return new Promise((resolve, reject) => {
        const contact = contacts.find(contact => contact._id === id)
        contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
    })
}

function deleteContact(id) {
    return new Promise((resolve, reject) => {
        const index = contacts.findIndex(contact => contact._id === id)
        if (index !== -1) {
            contacts.splice(index, 1)
        }
        storageService.store(STORAGE_KEY, contacts)
        resolve(contacts)
    })
}

function _updateContact(contact) {
    var currContacts = storageService.load(STORAGE_KEY)

    return new Promise((resolve, reject) => {
        if (currContacts) {
            const index = currContacts.findIndex(c => contact._id === c._id)
            if (index !== -1) {
                currContacts[index] = contact
            }
            storageService.store(STORAGE_KEY, currContacts)
        }
        else {
            const index = contacts.findIndex(c => contact._id === c._id)
            if (index !== -1) {
                contacts[index] = contact
            }
            storageService.store(STORAGE_KEY, contacts)
        }

        resolve(contact)
    })
}

function _addContact(contact) {
    var currContacts = storageService.load(STORAGE_KEY)
    return new Promise((resolve, reject) => {
        contact._id = _makeId()
        if (currContacts) {
            currContacts.push(contact)
            storageService.store(STORAGE_KEY, currContacts)
        }
        else {
            contacts.push(contact)
            storageService.store(STORAGE_KEY, contacts)
        }
        resolve(contact)
    })
}

function saveContact(contact) {
    return contact._id ? _updateContact(contact) : _addContact(contact)
}

function saveCurrContact(contactId) {
    storageService.store(STORAGE_KEY_CURR, contactId)
}

function getCurrContact() {
    var currContact = storageService.load(STORAGE_KEY_CURR)
    if (currContact) return currContact
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: '',
        address: {
            street: "",
            city: "",
        }
    }
}

function filter(term) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
        return contact.name.toLocaleLowerCase().includes(term) ||
            contact.phone.toLocaleLowerCase().includes(term) ||
            contact.email.toLocaleLowerCase().includes(term)
    })
}



function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}