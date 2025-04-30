'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const showModal = document.querySelectorAll('.show-modal');
const closeModal = document.querySelector('.close-modal');

showModal.forEach(button=>{button.addEventListener('click', () => {
    modal.classList.remove('hidden')
    overlay.classList.remove("hidden")

})})


closeModal.addEventListener('click', () => {
    modal.classList.add('hidden')
    overlay.classList.add("hidden")
})



document.addEventListener('keydown', (event) => {
    if ( event.key === 'Escape' && !modal.classList.contains('hidden') ) {
        modal.classList.add('hidden')
    }
})