/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

// Import functions from  utils.js 
import { activeToggleModal, modalSearch, createCard, getLocation, selectguests, filterStays, locationContainer, activeDataLocationArea} from "./utils"

// Import array from stays.js
import {stays} from "./stays"


// open and close toggle with difetent options
let searchMain = document.querySelector("#search_main")

searchMain.addEventListener("click", () => {
    activeToggleModal()
})


let closeButtonModal = document.querySelector("#close_button__modal")

closeButtonModal.addEventListener("click", () => {
    activeToggleModal()
})


modalSearch.addEventListener("click", () => {
    activeToggleModal()
})


let modalSearchForm = document.querySelector("#modal_search__form")

modalSearchForm.addEventListener("click", (e) => {
    e.stopPropagation()
})


let buttonSearchModal = document.querySelector("#button_search_modal")

buttonSearchModal.addEventListener("click", () => {
    activeToggleModal()
})


// Getting all cards when you just get on the page 
stays.forEach(element => {
    createCard(element)
});


//add event listener to active the filters when changing location

let inputLocation = document.querySelector("#input_location")

inputLocation.addEventListener("input", (e) => {
    let result1 = e.target.value
    let result2 = e.target.value.toLowerCase()
    getLocation(result2, result1)
    filterStays(result2, counterAdult + counterChildren)
})

// change amount of guest needed and filter updated 


let lessAdult = document.querySelector("#less_adult")
let moreAdult = document.querySelector("#more_adult")
let lessChildren = document.querySelector("#less_children")
let moreChildren = document.querySelector("#more_children")

let counterAdult = 0

lessAdult.addEventListener("click", () => {
    if(counterAdult > 0 ){
    counterAdult --
    selectguests(counterAdult, counterChildren)
    filterStays(inputLocation.value, counterAdult + counterChildren)
    }
})

moreAdult.addEventListener("click", ()=> {
    counterAdult ++
    selectguests(counterAdult, counterChildren)
    filterStays(inputLocation.value, counterAdult + counterChildren)
})

let counterChildren = 0

lessChildren.addEventListener("click", () => {
    if(counterChildren > 0 ){
    counterChildren --
    selectguests(counterAdult, counterChildren)
    filterStays(inputLocation.value, counterAdult + counterChildren)
    }
})

moreChildren.addEventListener("click", ()=> {
    counterChildren ++
    selectguests(counterAdult, counterChildren)
    filterStays(inputLocation.value, counterAdult + counterChildren)
})


// add event listneer to filter when a location sugestion is clicked and update info in the input and button

locationContainer.addEventListener("click", (e) => {
    let item = e.target.closest(".location_option")
    if(item) {
        let option = item.getAttribute("data-city")
        inputLocation.value = option
    
        let addLocationButton = document.querySelector("#add_location__button")
        if(addLocationButton) {
            addLocationButton.textContent = option
        }
        filterStays(option, counterAdult + counterChildren)
        locationContainer.innerHTML = ``
    }
    
})


// Adding option to hide the guest options 

let guestOption = document.querySelector("#guest_option")

guestOption.addEventListener("click", ()=> {
    activeDataLocationArea()
})



