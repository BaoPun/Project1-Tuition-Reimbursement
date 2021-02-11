// Variables storing benefits coordinator info
let benefitsListOfEmployees = null

// Login as a Benefits Coordinator
document.getElementById('benefits-login-button').addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementById('form-container-benefits').style.display = "block";

    // Disable the click events while we are on the form
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'
})

// Cancel the login
document.getElementById('cancel-button-benefits').addEventListener('click', () => {
    // Make the form disappear and then dim the background
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementById('form-container-benefits').style.display = "none";

    // Re-enable the click events
    signup.style.pointerEvents = 'auto'
    employeeLogin.style.pointerEvents = 'auto'
    supervisorLogin.style.pointerEvents = 'auto'
    departmentLogin.style.pointerEvents = 'auto'
    benefitsLogin.style.pointerEvents = 'auto'

    // Also make every single text field null
    document.getElementById('email-login-benefits').value = ''
    document.getElementById('password-login-benefits').value = ''
})

// Submit login information
document.getElementById('submit-button-benefits').addEventListener('click', () => {
    let email = document.getElementById('email-login-benefits')
    let password = document.getElementById('password-login-benefits')

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            console.log(this.responseText)

            // Make the form disappear and then dim the background
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementById('form-container-benefits').style.display = "none";

            // Re-enable the click events
            signup.style.pointerEvents = 'auto'
            employeeLogin.style.pointerEvents = 'auto'
            supervisorLogin.style.pointerEvents = 'auto'
            departmentLogin.style.pointerEvents = 'auto'
            benefitsLogin.style.pointerEvents = 'auto'

            // Also make every single text field null
            email.value = ''
            password.value = ''

            // In addition, hide the not-logged-in menu and show the department logged in menu
            document.getElementById('not-logged-in').style.display = 'none'
            document.getElementById('benefits-logged-in').style.display = 'block'

            // And update the user
            userLoggedIn = JSON.parse(this.responseText)
            console.log(userLoggedIn.email)

            // Finally, change the message of the greeting, but if only it's valid
            if(userLoggedIn.email == undefined)
                revertBenefitsChangesOnInvalidLogin()
            
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/loginBenefitsCoordinator.do?email=${email.value}&password=${password.value}`, true)
    xhttp.send()
})

function revertBenefitsChangesOnInvalidLogin(){
    alert('Error, your login credentials are incorrect.  Please try again')

    // Go back to the not logged in main menu
    document.getElementById('not-logged-in').style.display = 'block'
    document.getElementById('benefits-logged-in').style.display = 'none'

    // Disable the click events
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'

    // And return to the logged in menu
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementById('form-container-benefits').style.display = "block";
}



// View all forms approved by both supervisors and department heads
document.getElementsByClassName('button-menu')[11].addEventListener('click', () => {
    // If the menu isn't open, then output the list of forms
    if(document.getElementsByClassName('form-list-container')[2].style.display != 'block'){
        // Retrieve a list of JSON's; requires ajax call
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                // This is an array of Objects with the following fields:
                // formId, empId, eventId, eventDate, eventTime, location, description, cost, justification
                benefitsListOfEmployees = JSON.parse(this.responseText)

                // Open the form list container
                document.getElementsByClassName('form-list-container')[2].style.display = 'block'

                // Create various link buttons
                for(let i = 0; i < benefitsListOfEmployees.length; i++){
                    console.log(benefitsListOfEmployees[i])
                    let newButton = document.createElement('button')
                    newButton.setAttribute('class', 'button-form')
                    let newButtonText = document.createTextNode(`View Form ${i+1}`)
                    newButton.appendChild(newButtonText)
                    document.getElementsByClassName('form-list-container')[2].appendChild(newButton)
                    newButton.addEventListener('click', () => {

                        currentObject = benefitsListOfEmployees[i]
                        
                        // This is where we will view the employee forms again
                        // Write a function to do this instead of cramming it
                        // First, dim the background and show the form
                        document.body.style.background = "rgb(100, 100, 100)"
                        document.getElementsByClassName('form-preview')[2].style.display = "block";
                        document.getElementsByClassName('tuition-date-preview')[2].valueAsDate = new Date(currentObject.eventDate)
                        document.getElementsByClassName('tuition-time-preview')[2].value = currentObject.eventTime
                        document.getElementsByClassName('tuition-course-type-preview')[2].value = getEventFromId(currentObject.eventId)
                        document.getElementsByClassName('tuition-location-preview')[2].value = currentObject.location
                        document.getElementsByClassName('tuition-description-preview')[2].value = currentObject.description
                        document.getElementsByClassName('tuition-cost-preview')[2].value = currentObject.cost
                        document.getElementsByClassName('tuition-justification-preview')[2].value = currentObject.justification

                        // Then disable the clickability of the 3 buttons
                        document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'none'

                        currentButton = newButton
                    })
                    
                    
                }
            }
        }
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/getAllEmployeeFormsBenefits.do`, true)
        xhttp.send()
    }
})

// Basically acts as a CANCEL
document.getElementsByClassName('later-button')[2].addEventListener('click', () => {
                            
    // Rebrighten the background
    document.body.style.background = 'rgb(200, 220, 220)'
    document.getElementsByClassName('form-preview')[2].style.display = 'none';

    // Then re-enable the clickability of the 3 buttons
    document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'
})

// Disapprove
document.getElementsByClassName('no-option')[2].addEventListener('click', () => {

    // Send an AJAX request, with the 'NOP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
            // Alert the user
            alert('Success, you have DISAPPROVED the Employee\'s form')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[2].style.display = 'none';

            // Then re-enable the clickability of the 3 buttons
            document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[2].removeChild(currentButton)
        
            console.log(this.responseText)
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitBenefitsApprovalResponse.do?formId=${currentObject.formId}&approval=nop`, true)
    xhttp.send()

    
})

// Approve
document.getElementsByClassName('yes-option')[2].addEventListener('click', () => {

    // Send an AJAX request, with the 'YEP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Alert the user!
            alert('Success, you have APPROVED the Employee\'s form')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[2].style.display = 'none';

            // Then re-enable the clickability of the 3 buttons
            document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[2].removeChild(currentButton)

            console.log(this.responseText)
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitBenefitsApprovalResponse.do?formId=${currentObject.formId}&approval=yep`, true)
    xhttp.send()

})



// After an employee assigns a grade to their form(s), make a final approval of it.
// View listings of forms
document.getElementsByClassName('button-menu')[12].addEventListener('click', () => {

    // Afterwards, create an AJAX call to retrieve all complete forms
    if(document.getElementsByClassName('completed-forms-buttons')[1].style.display != 'block'){
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                document.getElementsByClassName('completed-forms-buttons')[1].style.display = 'block'
                
                completedListEmployees = JSON.parse(this.responseText)


                for(let i = 0; i < completedListEmployees.length; i++){
                    let newButton = document.createElement('button')
                    newButton.setAttribute('class', 'button-form-complete')
                    let newButtonText = document.createTextNode(`View Form ${i+1}`)
                    newButton.appendChild(newButtonText)
                    document.getElementsByClassName('completed-forms-buttons')[1].appendChild(newButton)
                    newButton.addEventListener('click', () => {
                    
                        currentObject = completedListEmployees[i]

                        // Preset the form field
                        document.body.style.background = "rgb(100, 100, 100)"
                        document.getElementById('completed-forms-ben').style.display = "block";
                        document.getElementsByClassName('tuition-date-preview-final')[1].valueAsDate = new Date(currentObject.eventDate)
                        document.getElementsByClassName('tuition-time-preview-final')[1].value = currentObject.eventTime
                        document.getElementsByClassName('tuition-course-type-preview-final')[1].value = getEventFromId(currentObject.eventId)
                        document.getElementsByClassName('tuition-location-preview-final')[1].value = currentObject.location
                        document.getElementsByClassName('tuition-description-preview-final')[1].value = currentObject.description
                        document.getElementsByClassName('tuition-cost-preview-final')[1].value = currentObject.cost
                        document.getElementsByClassName('tuition-justification-preview-final')[1].value = currentObject.justification
                        document.getElementsByClassName('tuition-grade-final')[1].value = getGradeFromId(currentObject.gradeId)

                        // Disable click events from the other buttons
                        document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'none'

                        currentButton = newButton
                    
                    })
                }
            }
        }
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/retrieveAllGradedForms.do`, true)
        xhttp.send()
    }
})

function getGradeFromId(id){
    switch(id){
        case 1:
            return 'A'
        case 2:
            return 'B'
        case 3:
            return 'C'
        case 4:
            return 'D'
        case 5:
            return 'F'
        default:
            return '?'
    }
}

// Escape from the grade approval menu
document.getElementsByClassName('later-button-final')[1].addEventListener('click', () => {
    // Re-enable click events from the other buttons
    document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'

    // Brighten the background and exit the form
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementById('completed-forms-ben').style.display = 'none'
})

// Approval denied!
document.getElementById('absolutely-not').addEventListener('click', () => {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Alert the user that it was a success
            alert('Tuition form denied!')

            // Re-enable click events from the other buttons
            document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'

            // Brighten the background and exit the form
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementById('completed-forms-ben').style.display = 'none'
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/denyGradedForm.do?formId=${currentObject.formId}`, true)
    xhttp.send()
})

// Approval approved!
document.getElementsByClassName('yes-option-final')[1].addEventListener('click', () => {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            if(currentObject.gradeId >= 4)
                alert('Tuition form approved!  However, the grade was unsatisfactory so tuition form denied anyways!')
            else   
                alert('Tuition form approved!')

            // Re-enable click events from the other buttons
            document.getElementsByClassName('button-menu')[11].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[12].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[13].style.pointerEvents = 'auto'

            // Brighten the background and exit the form
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementById('completed-forms-ben').style.display = 'none'
        }
    }

    // D or F is NOT passing!
    if(currentObject.gradeId >= 4)
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/denyGradedForm.do?formId=${currentObject.formId}`, true)
    else
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/approveGradedForm.do?formId=${currentObject.formId}`, true)
    xhttp.send()
})

// Log out!
document.getElementsByClassName('button-menu')[13].addEventListener('click', () => {
    if(confirm('Are you sure you want to quit?')){
        // Make sure the variable is no longer recorded
        userLoggedIn = ''
        benefitsListOfEmployees = null

        // Also remove the dynamically created buttons
        while(document.getElementsByClassName('form-list-container')[2].children.length != 1)
            document.getElementsByClassName('form-list-container')[2].removeChild(document.getElementsByClassName('form-list-container')[1].lastChild)

        // In addition, redisplay the main menu (to log in)
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('benefits-logged-in').style.display = 'none'
        document.getElementsByClassName('form-list-container')[2].style.display = 'none'
    }
})