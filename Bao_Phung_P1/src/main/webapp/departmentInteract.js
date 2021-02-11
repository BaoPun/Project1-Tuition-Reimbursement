// Variable storing the list of Employees with completed forms 
let deptListOfEmployees = null

// Button listeners for department login
departmentLogin.addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[3].style.display = "block";

    // Disable the click events while we are on the form
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'

})

// IF we choose CANCEL, return to the main menu
document.getElementsByClassName('cancel-button')[3].addEventListener('click', () => {
    // Make the form disappear and then dim the background
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementsByClassName('form-container')[3].style.display = "none";

    // Re-enable the click events
    signup.style.pointerEvents = 'auto'
    employeeLogin.style.pointerEvents = 'auto'
    supervisorLogin.style.pointerEvents = 'auto'
    departmentLogin.style.pointerEvents = 'auto'
    benefitsLogin.style.pointerEvents = 'auto'

    // Also make every single text field null
    document.getElementsByClassName('email-login')[2].value = ''
    document.getElementsByClassName('password-login')[2].value = ''
})

// If we choose SUBMIT, then call the backend to validate our login information
document.getElementsByClassName('submit-button')[3].addEventListener('click', () => {
    
    let email = document.getElementsByClassName('email-login')[2]
    let password = document.getElementsByClassName('password-login')[2]

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            console.log(this.responseText)

            // Make the form disappear and then dim the background
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementsByClassName('form-container')[3].style.display = "none";

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
            document.getElementById('department-logged-in').style.display = 'block'

            // And update the user
            userLoggedIn = JSON.parse(this.responseText)

            // If one field is undefined, then we have invalid info
            if(userLoggedIn.type == undefined)
                revertDeptChangesOnInvalidLogin()
            else{
                document.getElementById('dept-greeting').textContent = ''
                document.getElementById('dept-greeting').insertAdjacentHTML('afterbegin', `Hello Department Head of ${userLoggedIn.type}:<br>${userLoggedIn.headEmployee.firstName} ${userLoggedIn.headEmployee.lastName}!`)
            }

            

            

        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/loginDepartment.do?email=${email.value}&password=${password.value}`, true)
    xhttp.send()
})

// Revert changes made to the Dept form if we have an invalid login
function revertDeptChangesOnInvalidLogin(){
    alert('Error, your login credentials are incorrect.  Please try again')

    // Go back to the not logged in main menu
    document.getElementById('not-logged-in').style.display = 'block'
    document.getElementById('department-logged-in').style.display = 'none'

    // Disable the click events
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'

    // And return to the logged in menu
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[3].style.display = "block";
}

// View all forms submitted
document.getElementsByClassName('button-menu')[9].addEventListener('click', () => {
    
    // If the menu isn't open, then output the list of forms
    if(document.getElementsByClassName('form-list-container')[1].style.display != 'block'){
        // Retrieve a list of JSON's; requires ajax call
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                
                // This is an array of Objects with the following fields:
                // formId, empId, eventId, eventDate, eventTime, location, description, cost, justification
                deptListOfEmployees = JSON.parse(this.responseText)

                // Open the form list container
                document.getElementsByClassName('form-list-container')[1].style.display = 'block'

                // Create various link buttons
                for(let i = 0; i < deptListOfEmployees.length; i++){
                    console.log(deptListOfEmployees[i])
                    let newButton = document.createElement('button')
                    newButton.setAttribute('class', 'button-form')
                    let newButtonText = document.createTextNode(`View Form ${i+1}`)
                    newButton.appendChild(newButtonText)
                    document.getElementsByClassName('form-list-container')[1].appendChild(newButton)
                    newButton.addEventListener('click', () => {

                        currentObject = deptListOfEmployees[i]
                        
                        // This is where we will view the employee forms again
                        // Write a function to do this instead of cramming it
                        // First, dim the background and show the form
                        document.body.style.background = "rgb(100, 100, 100)"
                        document.getElementsByClassName('form-preview')[1].style.display = "block";
                        document.getElementsByClassName('tuition-date-preview')[1].valueAsDate = new Date(currentObject.eventDate)
                        document.getElementsByClassName('tuition-time-preview')[1].value = currentObject.eventTime
                        document.getElementsByClassName('tuition-course-type-preview')[1].value = getEventFromId(currentObject.eventId)
                        document.getElementsByClassName('tuition-location-preview')[1].value = currentObject.location
                        document.getElementsByClassName('tuition-description-preview')[1].value = currentObject.description
                        document.getElementsByClassName('tuition-cost-preview')[1].value = currentObject.cost
                        document.getElementsByClassName('tuition-justification-preview')[1].value = currentObject.justification

                        // Then disable the clickability of the 2 buttons
                        document.getElementsByClassName('button-menu')[9].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[10].style.pointerEvents = 'none'

                        currentButton = newButton
                    })
                    
                    
                }
            }
        }
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/getAllEmployeeFormsDepartments.do`, true)
        xhttp.send()
    }
})

// Basically acts as a CANCEL
document.getElementsByClassName('later-button')[1].addEventListener('click', () => {
                            
    // Rebrighten the background
    document.body.style.background = 'rgb(200, 220, 220)'
    document.getElementsByClassName('form-preview')[1].style.display = 'none';

    // Then re-enable the clickability of the 2 buttons
    document.getElementsByClassName('button-menu')[9].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[10].style.pointerEvents = 'auto'
})

// Disapprove
document.getElementsByClassName('no-option')[1].addEventListener('click', () => {

    // Send an AJAX request, with the 'NOP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            
            // Alert the user
            alert('Success, you have DISAPPROVED the Employee\'s form')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[1].style.display = 'none';

            // Then re-enable the clickability of the 2 buttons
            document.getElementsByClassName('button-menu')[9].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[10].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[1].removeChild(currentButton)
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitDeptApprovalResponse.do?formId=${currentObject.formId}&approval=nop`, true)
    xhttp.send()

    
})

// Approve
document.getElementsByClassName('yes-option')[1].addEventListener('click', () => {

    // Send an AJAX request, with the 'YEP' response to update approval status
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Alert the user!
            alert('Success, you have APPROVED the Employee\'s form')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementsByClassName('form-preview')[1].style.display = 'none';

            // Then re-enable the clickability of the 2 buttons
            document.getElementsByClassName('button-menu')[9].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[10].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('form-list-container')[1].removeChild(currentButton)
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/submitDeptApprovalResponse.do?formId=${currentObject.formId}&approval=yep`, true)
    xhttp.send()

})


// Log out
document.getElementsByClassName('button-menu')[10].addEventListener('click', () => {
    if(confirm('Are you sure you want to quit?')){
        // Make sure the variable is no longer recorded
        userLoggedIn = ''
        deptListOfEmployees = null

        // Also remove the dynamically created buttons
        while(document.getElementsByClassName('form-list-container')[1].children.length != 1)
            document.getElementsByClassName('form-list-container')[1].removeChild(document.getElementsByClassName('form-list-container')[1].lastChild)

        // In addition, redisplay the main menu (to log in)
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('department-logged-in').style.display = 'none'
        document.getElementsByClassName('form-list-container')[1].style.display = 'none'
    }
})