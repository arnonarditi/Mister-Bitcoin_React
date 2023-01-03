import { storageService } from "./storage.service"

const STORAGE_KEY = 'user'

export const userService = {
    getUser,
    signup,
    addMove,
    getEmptyUser
}

function signup(name) {
    const currUser = getEmptyUser()
    currUser.name = name
    storageService.store(STORAGE_KEY, currUser)
    return currUser
}

function addMove(contact, amount) {
    const user = getUser()
    if(user && user.coins > 0) {
        user.coins -= amount
        user.moves.push(
            {
                "contactId": contact._id,
                "at": Date.now(),
                "amount": amount
            }
        )
        storageService.store(STORAGE_KEY, user)
    }
}

function getUser() {
    const currUser = storageService.load(STORAGE_KEY)
    if (currUser) return currUser
    return null
}

function getEmptyUser() {
    return {
        name: "",
        coins: 100,
        moves: []
    }
}