/**
 * Módulo de funciones utilitarias.
 * Este archivo contiene funciones auxiliares que serán utilizadas y llamadas
 * desde el archivo principal para realizar varias operaciones.
 */
import {stays} from "./stays"

let staysList = [...stays]

// To open and close modal window
export let modalSearch = document.querySelector("#modal_search");
let body = document.querySelector("body");

export function activeToggleModal() {
    modalSearch.classList.toggle("hidden");
    body.classList.toggle("overflow-hidden");
}

// To create a card

let cardsSection = document.querySelector("#cards_section");

export function createCard(element) {
    let card = ``
    card = `
    <article class="hover:shadow-lg rounded-2xl p-2">
            <div class="overflow-hidden rounded-2xl aspect-8/5">
                <img src=${element.photo} alt="${element.type}" class="rounded-2xl object-cover w-full h-full object-center transition-all duration-500 hover:scale-120 ">
            </div>
            
            <div class="flex justify-between mt-3 items-center">
    `
    if (element.superHost === true) {
        card += `
        <p class="border rounded-xl font-bold p-1 text-xs text-[#3b3b3b] ">SUPERHOST</p>
        `
    }
    if (element.beds === null) {
        card += `<p class="text-[#818181] font-semibold text-sm mx-1 text-center">${element.type}</p>`
    } else {
        card += `<p class="text-[#818181] font-semibold text-sm mx-1 text-center">${element.type}. ${element.beds} beds</p>`
    }
    card += 
    `
        <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-[#eb5757] fill-[#eb5757] ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <p class="text-[#3b3b3b] font-semibold text-sm">${element.rating}</p>
                </div>
            </div>
            <p class="font-bold text-[#333333] text-sm my-1">${element.title}</p>
        </article>
    `
    cardsSection.innerHTML += card
}

// Add sugestion for locations

export function getLocation(result, originalResult){
    let found = staysList.filter(object => {
        return object.city.toLocaleLowerCase().includes(result) 
    })
    let cities = found.filter((item, index, self) => {
        return index === self.findIndex(t => t.city === item.city)
    })

    showResults(cities, originalResult)
}

export let locationContainer = document.querySelector("#location_container")

function showResults(elements, originalResult) {
    let addLocationButton = document.querySelector("#add_location__button")
    addLocationButton.textContent = originalResult

    locationContainer.innerHTML = ``

    elements.forEach(element => {
        locationContainer.innerHTML += `
    <div class="flex items-center gap-2 pl-2 cursor-pointer hover:bg-[#f5f5f5] active:bg-[#e6e6e6] rounded-2xl location_option" data-city="${element.city}">
        <img src="img/icons/location.png" alt="Location logo" class="w-4 h-4">
        <p>${element.city}, ${element.country}</p>
    </div>
    `
    })
}

//Add number of guests

export function selectguests(adult, children){
    let guestAdult = document.querySelector("#guest_adult")
    let guestChildren = document.querySelector("#guest_children")
    let guestsSum = document.querySelector("#guests_sum")
    let addGuestButton = document.querySelector("#add_guest__button")

    guestAdult.textContent = adult
    guestChildren.textContent =  children
    let sum = adult + children
    guestsSum.innerHTML = sum
    addGuestButton.textContent = `${sum} guests`
}


// to filter the stays based on data entered 

export let staysAmount = document.querySelector("#stays_amount")

export function filterStays(city, total) {
    cardsSection.innerHTML = ``
    let filtered = staysList.filter(stay => {
        let matchCity = stay.city.toLowerCase().includes(city.toLowerCase())
        let matchGuests = stay.maxGuests >= total
        return matchCity && matchGuests
    })

    filtered.forEach(element=> {
        createCard(element)
    })
    staysAmount.textContent = filtered.length 
}
