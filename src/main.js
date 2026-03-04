/**
 * Aquí estará la lógica principal de la aplicación.
 * Este bloque de código contiene la funcionalidad principal
 * que define el comportamiento del programa.
 */

// Import functions from  utils.js 
import { activeToggleModal, modalSearch, createCard} from "./utils"

// Import array from stays.js
import {stays} from "./stays"


// open and close toggle 
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


//metodo input

stays.forEach(element => {
    createCard(element)
});