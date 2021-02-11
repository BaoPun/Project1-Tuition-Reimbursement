// Variables for the User Not Logged In Menu
let signup = document.getElementsByClassName('button-menu')[0]
let employeeLogin = document.getElementsByClassName('button-menu')[1]
let supervisorLogin = document.getElementsByClassName('button-menu')[2]
let departmentLogin = document.getElementsByClassName('button-menu')[3]
let benefitsLogin = document.getElementById('benefits-login-button')
let userLoggedIn = ''

// Variables for the Employee Login menu
let uploadForm = document.getElementsByClassName('button-menu')[4]
let viewForms = document.getElementsByClassName('button-menu')[5]
let logout = document.getElementsByClassName('button-menu')[6]


// Button listeners for signup
signup.addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[0].style.display = "block";

    // Disable the click events while we are on the form
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'

})

document.getElementById('password-signup').addEventListener('keydown', (e) => {
    if(!(e.key.length == 1 && e.key.match('^[a-zA-Z0-9]')) && e.key != 'Backspace' && e.key != 'Tab')
        e.preventDefault()
    
})

// Cancelling the form brings us back to the menu
document.getElementsByClassName('cancel-button')[0].addEventListener('click', () => {
    // Don't show the form anymore and brighten up the background again
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementsByClassName('form-container')[0].style.display = "none";

    // Restore the click events so that we can interact with the form again
    signup.style.pointerEvents = "auto"
    employeeLogin.style.pointerEvents = 'auto'
    supervisorLogin.style.pointerEvents = 'auto'
    departmentLogin.style.pointerEvents = "auto"
    benefitsLogin.style.pointerEvents = 'auto'

    // Also make every single text field null
    document.getElementById('first-name-signup').value = ''
    document.getElementById('last-name-signup').value = ''
    document.getElementById('email-signup').value = ''
    document.getElementById('password-signup').value = ''

})

// After filling in the fields, submit the inputs to the back-end, but only if all pieces of information are valid.
document.getElementsByClassName('submit-button')[0].addEventListener('click', function() {

    // Perform ajax calls here!
    // First, retrieve the arguments
    let firstName = document.getElementById('first-name-signup')
    let lastName = document.getElementById('last-name-signup')
    let email = document.getElementById('email-signup')
    let password = document.getElementById('password-signup')
    let supervisor = document.getElementById('supervisor-signup')

    

    
    if(isValidSignupInputs(firstName, lastName, email, password)){

        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                // Don't show the form anymore and brighten up the background again
                document.body.style.background = "rgb(200, 220, 220)"
                document.getElementsByClassName('form-container')[0].style.display = "none";

                // Restore the click events so that we can interact with the form again
                signup.style.pointerEvents = "auto"
                employeeLogin.style.pointerEvents = 'auto'
                supervisorLogin.style.pointerEvents = 'auto'
                departmentLogin.style.pointerEvents = "auto"
                benefitsLogin.style.pointerEvents = 'auto'

                // And reset input fields
                firstName.value = ''
                lastName.value = ''
                email.value = ''
                password.value = ''

                resetSignupFields(this.responseText)
            }
        }

        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/createEmployee.do?fname=${firstName.value}&lname=${lastName.value}&email=${email.value}&password=${password.value}&semail=${supervisor.value}`, true)
        xhttp.send()

        
    }
})

// Ensure that all 4 input fields are valid inputs.  
// By doing so, we minimize the # of errors made once we refer this data to our backend.
function isValidSignupInputs(firstName, lastName, email, password){
    if(!(firstName.value.match('^[a-zA-Z]+')) || firstName.value.length > 100 || firstName.value.length <= 0){
        alert('Please make sure your first name only has letters and is no more than 100 characters')
        firstName.value = ''
        return false
    }
    if(!(lastName.value.match('^[a-zA-Z]+')) || lastName.value.length > 100 || lastName.value.length <= 0){
        alert('Please make sure your last name only has letters and is no more than 100 characters')
        lastName.value = ''
        return false
    }
    if(!(email.value.match('^[a-zA-Z]+[a-zA-Z0-9|.]*@[a-z]*.(com|net|org)$')) || email.value.length > 100 || email.value.length <= 0){
        alert("Please make sure your email is an appropriate format and is no more than 100 characters")
        email.value = ''
        return false
    }
    if(!(password.value.match('^[a-zA-Z]*$')) || password.value.length > 100  || password.value.length <= 7){
        alert("Please make sure your password only contains alphanumeric characters and that the password is between 8 and 10 characters")
        password = ''
        return false
    }
    
    return true
}

// If the signup process is invalid, then return to the signup page
function resetSignupFields(errorText){

    // First show the text itself
    alert(errorText)

    // Then, if the text was an error, show the form again.
    if(errorText.includes('Error')){

        // Show the form again
        document.body.style.background = "rgb(100, 100, 100)"
        document.getElementsByClassName('form-container')[0].style.display = "block";

        // Restore the click events so that we can interact with the form again
        signup.style.pointerEvents = "none"
        employeeLogin.style.pointerEvents = 'none'
        supervisorLogin.style.pointerEvents = 'none'
        departmentLogin.style.pointerEvents = 'none'
        benefitsLogin.style.pointerEvents = 'none'

    }
}