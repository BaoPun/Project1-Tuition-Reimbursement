// Variable storing the list of Employees with completed forms that belong to a supervisor
let supListOfEmployees = null


// Button listeners for supervisor login
supervisorLogin.addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[2].style.display = "block";

    // Disable the click events while we are on the form
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'
})

// IF we choose CANCEL, return to the main menu
document.getElementsByClassName('cancel-button')[2].addEventListener('click', () => {
    // Make the form disappear and then dim the background
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementsByClassName('form-container')[2].style.display = "none";

    // Re-enable the click events
    signup.style.pointerEvents = 'auto'
    employeeLogin.style.pointerEvents = 'auto'
    supervisorLogin.style.pointerEvents = 'auto'
    departmentLogin.style.pointerEvents = 'auto'
    benefitsLogin.style.pointerEvents = 'auto'

    // Also make every single text field null
    document.getElementsByClassName('email-login')[1].value = ''
    document.getElementsByClassName('password-login')[1].value = ''
})

// If we choose SUBMIT, then call the backend to validate our login information
document.getElementsByClassName('submit-button')[2].addEventListener('click', () => {

    // Now process the form.  
    let email = document.getElementsByClassName('email-login')[1]
    let password = document.getElementsByClassName('password-login')[1]

    // AJAX time
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Make the form disappear and then brighten the background again
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementsByClassName('form-container')[2].style.display = "none";

            // Re-enable the click events
            signup.style.pointerEvents = 'auto'
            employeeLogin.style.pointerEvents = 'auto'
            supervisorLogin.style.pointerEvents = 'auto'
            departmentLogin.style.pointerEvents = 'auto'
            benefitsLogin.style.pointerEvents = 'auto'

            // Reset input fields
            email.value = ''
            password.value = ''

            // In addition, hide the not-logged-in menu and show the supervisor logged in menu
            document.getElementById('not-logged-in').style.display = 'none'
            document.getElementById('supervisor-logged-in').style.display = 'block'

            // And update the user
            userLoggedIn = JSON.parse(this.responseText)

            // Finally, change the message of the greeting
            document.getElementById('sup-greeting').textContent = `Hello Supervisor ${userLoggedIn.firstName} ${userLoggedIn.lastName}!`

            // However, revert all the changes if the login information was incorrect
            revertSupChangesOnInvalidLogin()
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/loginSupervisor.do?email=${email.value}&password=${password.value}`, true)
    xhttp.send()

})

// If our login information was incorrect, then revert the changes.
function revertSupChangesOnInvalidLogin(){
    if(document.getElementById('sup-greeting').textContent == 'Hello Supervisor undefined undefined!'){
        alert('Error, your login credentials are incorrect.  Please try again')
        
        // Reshow the not logged in menu
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('supervisor-logged-in').style.display = 'none'

        // Disable the click events again
        signup.style.pointerEvents = 'none'
        employeeLogin.style.pointerEvents = 'none'
        supervisorLogin.style.pointerEvents = 'none'
        departmentLogin.style.pointerEvents = 'none'
        benefitsLogin.style.pointerEvents = 'none'

        // And return to the logged in menu
        document.body.style.background = "rgb(100, 100, 100)"
        document.getElementsByClassName('form-container')[2].style.display = "block";
    }
}


// View all forms submitted by Employees who have the current supervisor
document.getElementsByClassName('button-menu')[7].addEventListener('click', () => {
    
    // If the menu isn't open, then create an AJAX call
    if(document.getElementsByClassName('form-list-container')[0].style.display != 'block'){
        // Retrieve a list of JSON's; requires ajax call
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                // This is an array of Objects with the following fields:
                // formId, empId, eventId, eventDate, eventTime, location, description, cost, justification
                supListOfEmployees = JSON.parse(this.responseText)

                // Open the form list container
                document.getElementsByClassName('form-list-container')[0].style.display = 'block'

                // Create various link buttons
                for(let i = 0; i < supListOfEmployees.length; i++){
                    
                    let newButton = document.createElement('button')
                    newButton.setAttribute('class', 'button-form')
                    let newButtonText = document.createTextNode(`View Form ${i+1}`)
                    newButton.appendChild(newButtonText)
                    document.getElementsByClassName('form-list-container')[0].appendChild(newButton)
                    newButton.addEventListener('click', () => {

                        currentObject = supListOfEmployees[i]

                        // This is where we will view the employee forms again+
                        document.body.style.background = "rgb(100, 100, 100)"
                        document.getElementsByClassName('form-preview')[0].style.display = "block";
                        document.getElementsByClassName('tuition-date-preview')[0].valueAsDate = new Date(currentObject.eventDate)
                        document.getElementsByClassName('tuition-time-preview')[0].value = currentObject.eventTime
                        document.getElementsByClassName('tuition-course-type-preview')[0].value = getEventFromId(currentObject.eventId)
                        document.getElementsByClassName('tuition-location-preview')[0].value = currentObject.location
                        document.getElementsByClassName('tuition-description-preview')[0].value = currentObject.description
                        document.getElementsByClassName('tuition-cost-preview')[0].value = currentObject.cost
                        document.getElementsByClassName('tuition-justification-preview')[0].value = currentObject.justification

                        // Then disable the clickability of the 2 buttons
                        document.getElementsByClassName('button-menu')[7].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[8].style.pointerEvents = 'none'

                        // Update the current button
                        currentButton = newButton
                    })
                    
                }
            }
        }
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/getAllSupervisedEmployeeForms.do?id=${userLoggedIn.empId}`, true)
        xhttp.send()
    }
})

// Basically acts as a CANCEL
document.getElementsByClassName('later-button')[0].addEventListener('click', () => {
                            
    // Rebrighten the background
    document.body.style.background = 'rgb(200, 220, 220)'
    document.getElementsByClassName('form-preview')[0].style.display = 'none';

    // Then re-enable the clickability of the 2 buttons
    document.getElementsByClassName('button-menu')[7].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[8].style.pointerEvents = 'auto'
})

// Disapprove
document.getElementsByClassName('no-option')[0].addEventListener('click', () => {

    // Send an AJAX request, with the 'NOP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Say an alert
            alert('Success, you have DISAPPROVED the Employee\'s form')
            
            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[0].style.display = 'none';

            // Then re-enable the clickability of the 2 buttons
            document.getElementsByClassName('button-menu')[7].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[8].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[0].removeChild(currentButton)
        }
    }
    
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitSupApprovalResponse.do?empId=${userLoggedIn.empId}&formId=${currentObject.formId}&approval=nop`, true)
    xhttp.send()

    
})

// Approve
document.getElementsByClassName('yes-option')[0].addEventListener('click', () => {

    // Send an AJAX request, with the 'YEP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Send an alert
            alert('Success, you have APPROVED the Employee\'s form')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[0].style.display = 'none';

            // Then re-enable the clickability of the 2 buttons
            document.getElementsByClassName('button-menu')[7].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[8].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[0].removeChild(currentButton)
            
        }
    }

    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitSupApprovalResponse.do?empId=${userLoggedIn.empId}&formId=${currentObject.formId}&approval=yep`, true)
    xhttp.send()

})


// Log out
document.getElementsByClassName('button-menu')[8].addEventListener('click', () => {
    if(confirm('Are you sure you want to quit?')){
        // Make sure the variable is no longer recorded
        userLoggedIn = ''
        supListOfEmployees = null

        // Also remove the dynamically created buttons
        while(document.getElementsByClassName('form-list-container')[0].children.length != 1)
            document.getElementsByClassName('form-list-container')[0].removeChild(document.getElementsByClassName('form-list-container')[0].lastChild)

        // In addition, redisplay the main menu (to log in)
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('supervisor-logged-in').style.display = 'none'
        document.getElementsByClassName('form-list-container')[0].style.display = 'none'

    }
})