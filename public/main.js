// create an array of all the buttons - document.querySelectorAll('button')
// buttons.forEach(button => button.addEventListener() console.log(event.target)) event.target.dataset.id
// create an event listener for every button on the page

// creating an array out of the buttons on the page
const buttons = document.querySelectorAll('.delete')
console.log(buttons)
// looping through the buttons array and adding an event listener to each button
// when a button is clicked, the event fires
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        console.log(event.target)

        const id = event.target.dataset.id
        console.log(id)

        fetch('delete', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id
            })

        }).then(function (response) {
            window.location.reload()
        })

    })

})