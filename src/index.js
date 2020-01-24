const form = document.querySelector('#itemForm')
const inputValue = document.querySelector('#itemInput')
const itemList = document.querySelector('.item-list')
const clearList = document.querySelector('#clear-list')
const feedback = document.querySelector('.feedback')

renderList();

form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (inputValue.value.length === 0) {
        feedback.innerHTML = 'Please enter a valid value!'
        feedback.classList.add('showItem', 'alert-danger')
        setTimeout(function () {
            feedback.classList.remove('showItem')
        }, 3000)
    }
    else {
        updateList(inputValue.value)
        updateLocalStorage(inputValue.value)
        inputValue.value = ''
    }
})

function updateLocalStorage(value) {
    if (!window.localStorage.getItem('shoppingList')) {
        window.localStorage.setItem('shoppingList', JSON.stringify([]))
    }
    const shoppingList = getShoppingList()
    shoppingList.push(value)
    window.localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
}

function renderList() {
    const shoppingList = getShoppingList()
    shoppingList.forEach(item => updateList(item))
}

function getShoppingList() {
    const shoppingList = window.localStorage.getItem('shoppingList')
    return shoppingList ? JSON.parse(shoppingList) : []
}

function updateList(value) {
    itemList.insertAdjacentHTML('beforeend', `
        <div class="item my-3">
            <h5 class="item-name">
                ${value}
            </div>
        </div>
    `)
}

clearList.addEventListener('click', function () {
    itemList.innerHTML = ''
    window.localStorage.removeItem('shoppingList')
})

