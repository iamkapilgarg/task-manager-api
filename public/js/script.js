const button = document.querySelector('.btn')
const form = document.querySelector('.form')
const RegisterForm = document.querySelector('form')
const name = document.querySelector('#name')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const age = document.querySelector('#age')

button.addEventListener('click', async function() {
    form.classList.add('form--no')
    const url = 'http://localhost:3000/Users'
        //const url = 'https://kapil-task-manager.herokuapp.com/Users'
    const data = {
        name: name.value,
        email: email.value,
        password: password.value,
        age: age.value
    }
    console.log(data)
    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }
});