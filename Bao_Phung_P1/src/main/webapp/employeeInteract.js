// Variables for logging in as Employee
let loginCancel = document.getElementsByClassName('cancel-button')[1]
let loginSubmit = document.getElementsByClassName('submit-button')[1]
let completedListEmployees = null
let currentButton = null
let currentObject = null


// Button listeners for employee login
employeeLogin.addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[1].style.display = "block";

    // Disable the click events while we are on the form
    signup.style.pointerEvents = 'none'
    employeeLogin.style.pointerEvents = 'none'
    supervisorLogin.style.pointerEvents = 'none'
    departmentLogin.style.pointerEvents = 'none'
    benefitsLogin.style.pointerEvents = 'none'
})

// Return to the main menu after clicking on the CANCEL button on the login menu
loginCancel.addEventListener('click', () => {
    // Don't show the form anymore and brighten up the background again
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementsByClassName('form-container')[1].style.display = "none";

    // Restore the click events so that we can interact with the form again
    signup.style.pointerEvents = "auto"
    employeeLogin.style.pointerEvents = 'auto'
    supervisorLogin.style.pointerEvents = 'auto'
    departmentLogin.style.pointerEvents = "auto"
    benefitsLogin.style.pointerEvents = 'auto'

    // Also make every single text field null
    document.getElementsByClassName('email-login')[0].value = ''
    document.getElementsByClassName('password-login')[0].value = ''

})

// Attempt to login to an Employee account after clicking on the SUBMIT button
loginSubmit.addEventListener('click', function() {

    // Perform ajax calls here!
    // First, retrieve the arguments
    let email = document.getElementsByClassName('email-login')[0]
    let password = document.getElementsByClassName('password-login')[0]
    
    // Then, send the information over to the backend
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Don't show the form anymore and brighten up the background again
            document.body.style.background = "rgb(200, 220, 220)"
            document.getElementsByClassName('form-container')[1].style.display = "none";

            console.log(this.responseText)

            // Restore the click events so that we can interact with the form again
            signup.style.pointerEvents = 'auto'
            employeeLogin.style.pointerEvents = 'auto'
            supervisorLogin.style.pointerEvents = 'auto'
            departmentLogin.style.pointerEvents = 'auto'
            benefitsLogin.style.pointerEvents = 'auto'

            // In addition, hide the not-logged-in menu and show the employee logged in menu
            document.getElementById('not-logged-in').style.display = 'none'
            document.getElementById('employee-logged-in').style.display = 'block'

            // And update the user
            userLoggedIn = JSON.parse(this.responseText)

            // Finally, change the message of the greeting
            document.getElementById('emp-greeting').textContent = `Hello Employee ${userLoggedIn.firstName} ${userLoggedIn.lastName}!`

            // And reset input fields
            email.value = ''
            password.value = ''
            
            // However, revert all the changes if the login information was incorrect
            revertEmpChangesOnInvalidLogin()
        }
    }

    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/loginEmployee.do?email=${email.value}&password=${password.value}`, true)
    xhttp.send()
})

// If the login info is incorrect (i.e "Hello Employee undefined undefined!")
// Then revert back to normal
function revertEmpChangesOnInvalidLogin(){
    if(document.getElementById('emp-greeting').textContent == 'Hello Employee undefined undefined!'){
        alert('Error, your login credentials are incorrect.  Please try again')
        
        // Reshow the not logged in menu
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('employee-logged-in').style.display = 'none'

        // Disable the click events again
        signup.style.pointerEvents = 'none'
        employeeLogin.style.pointerEvents = 'none'
        supervisorLogin.style.pointerEvents = 'none'
        departmentLogin.style.pointerEvents = 'none'
        benefitsLogin.style.pointerEvents = 'none'

        // And return to the logged in menu
        document.body.style.background = "rgb(100, 100, 100)"
        document.getElementsByClassName('form-container')[1].style.display = "block";

    }
}

// Upload a new tuition form
document.getElementsByClassName('button-menu')[4].addEventListener('click', () => {
    // Make the form appear and then dim the background
    document.body.style.background = "rgb(100, 100, 100)"
    document.getElementsByClassName('form-container')[4].style.display = "block";

    // Disable the click events while we are on the form
    uploadForm.style.pointerEvents = 'none'
    viewForms.style.pointerEvents = 'none'
    logout.style.pointerEvents = 'none'

    // Preset the time to be the current time
    // Return new Date() as a string, and then get indexes 16-20.
    document.getElementById('tuition-time').value = String(new Date()).slice(16, 21)

    // Preset the date to be the current date.
    document.getElementById('tuition-date').valueAsDate = getFormattedDate()
})

// Retrieve today's date and then return a new Date representation of it.
function getFormattedDate(){
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth()).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    
    return new Date(yyyy, mm, dd)
}

// Cancel the Employee tuition form
document.getElementsByClassName('cancel-button')[4].addEventListener('click', () => {

    // Reshow the employee menu and brighten the background
    document.body.style.background = 'rgb(200, 220, 220)'
    document.getElementsByClassName('form-container')[4].style.display = 'none';

    // Re-enable the click events while we are on the form
    uploadForm.style.pointerEvents = 'auto'
    viewForms.style.pointerEvents = 'auto'
    logout.style.pointerEvents = 'auto'

    // Make every single entry on the form empty again
    document.getElementById('tuition-location').value = ''
    document.getElementById('tuition-description').value = ''
    document.getElementById('tuition-cost').value = null
    document.getElementById('tuition-justification').value = ''

})

// Submit the Employee tuition form
document.getElementsByClassName('submit-button')[4].addEventListener('click', () => {

    // Perform AXAX post call, but only if tuition form inputs are all valid
    let location = document.getElementById('tuition-location')
    let description = document.getElementById('tuition-description')
    let cost = document.getElementById('tuition-cost')
    let justification = document.getElementById('tuition-justification')
0
    if(isValidForm(location, description, cost, justification)){
        
        // Create an object to store our results
        let formObject = {
            formId: -1,
            empId: userLoggedIn.empId,
            eventId: getEventId(document.getElementById('tuition-course-type').value),
            eventDate: getFormattedDateAsString(getFormattedDate()),
            eventTime: String(document.getElementById('tuition-time').value),
            location: location.value,
            description: description.value,
            justification: justification.value,
            cost: cost.value,
            gradeId: -1
        }

        // Perform a valid ajax call
        let xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                // Reshow the employee menu and brighten the background
                document.body.style.background = 'rgb(200, 220, 220)'
                document.getElementsByClassName('form-container')[4].style.display = 'none';

                // Re-enable the click events while we are on the form
                uploadForm.style.pointerEvents = 'auto'
                viewForms.style.pointerEvents = 'auto'
                logout.style.pointerEvents = 'auto'

                // And clear the input fields
                location.value = ''
                description.value = ''
                cost.value = null
                justification.value = ''

                // If there was some weird error, then have the user re-input them.
                if(this.responseText == 'ERROR!')
                    revertTuitionFormChanges()
                // Alert the user that our form was submitted
                else
                    alert('Success, your tuition form has been submitted')

            }
        }

        xhttp.open('POST', `http://localhost:8080/Bao_Phung_P1/createTuitionForm.do`, true)
        xhttp.send(JSON.stringify(formObject))
    }
})

function revertTuitionFormChanges(){
    alert('Error, there was something wrong with the form.  Please try again')

    // Reshow the tuition form and darken the background
    document.body.style.background = 'rgb(100, 100, 100)'
    document.getElementsByClassName('form-container')[4].style.display = 'block';

    // Re-enable the click events while we are on the form
    uploadForm.style.pointerEvents = 'none'
    viewForms.style.pointerEvents = 'none'
    logout.style.pointerEvents = 'none'
}

// Return a String representation of the current date, in MM/DD/YYY format
function getFormattedDateAsString(date){
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`
}

// Depending on the event, set the id equal to that event
function getEventId(event){
    //console.log(event)
    if(event === 'University Courses')
        return 1
    else if(event === 'Seminar')
        return 2
    else if(event === 'Certification Preparation Classes')
        return 3
    else if(event === 'Certification')
        return 4
    else if(event === 'Technical Training')
        return 5
    else if(event === 'Other')
        return 6
    else
        return -1
}

// The reverse of the above function: return the appropriate String representation
// given the event id.
function getEventFromId(id){
    switch(id){
        case 1: return 'University Courses'
        case 2: return 'Seminar'
        case 3: return 'Certification Preparation Classes'
        case 4: return 'Certification'
        case 5: return 'Technical Training'
        case 6: return 'Other'
        default: return -1
    }
}

function isValidForm(location, description, cost, justification){

    // Location has to be no more than 100 characters
    if(location.value.length <= 0 || location.value.length > 100){
        alert('Please enter a location that is no more than 100 characters long')
        location.value = ''
        return false
    }

    // Both description and justification have to be no more than 200 characters
    if(description.value.length <= 0 || description.value.length > 200){
        alert('Please enter a description that is no more than 200 characters long')
        description.value = ''
        return false
    }

    if(justification.value.length <= 0 || justification.value.length > 200){
        alert('Please enter a justification that is no more than 200 characters long')
        justification.value = ''
        return false
    }

    // Cost cannot be negative and must be over 0 dollars
    if(cost.value == null || cost.value <= 0){
        alert('Please enter a valid cost for this program.')
        cost.value = null
        return false
    }

    return true;
}


// View submitted tuition forms to see updates made by supervisors and other higherups
document.getElementsByClassName('button-menu')[5].addEventListener('click', () => {

    // Afterwards, create an AJAX call to retrieve all complete forms
    if(document.getElementsByClassName('completed-forms-buttons')[0].style.display != 'block'){
        let xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){

                document.getElementsByClassName('completed-forms-buttons')[0].style.display = 'block'
                
                completedListEmployees = JSON.parse(this.responseText)
                for(let i = 0; i < completedListEmployees.length; i++){
                    let newButton = document.createElement('button')
                    newButton.setAttribute('class', 'button-form-complete')
                    let newButtonText = document.createTextNode(`View Form ${i+1}`)
                    newButton.appendChild(newButtonText)
                    document.getElementsByClassName('completed-forms-buttons')[0].appendChild(newButton)
                    newButton.addEventListener('click', () => {
                    
                        currentObject = completedListEmployees[i]

                        // Preset the form field
                        document.body.style.background = "rgb(100, 100, 100)"
                        document.getElementById('completed-forms-emp').style.display = "block";
                        document.getElementsByClassName('tuition-date-preview-final')[0].valueAsDate = new Date(currentObject.eventDate)
                        document.getElementsByClassName('tuition-time-preview-final')[0].value = currentObject.eventTime
                        document.getElementsByClassName('tuition-course-type-preview-final')[0].value = getEventFromId(currentObject.eventId)
                        document.getElementsByClassName('tuition-location-preview-final')[0].value = currentObject.location
                        document.getElementsByClassName('tuition-description-preview-final')[0].value = currentObject.description
                        document.getElementsByClassName('tuition-cost-preview-final')[0].value = currentObject.cost
                        document.getElementsByClassName('tuition-justification-preview-final')[0].value = currentObject.justification

                        // Disable click events from the other buttons
                        document.getElementsByClassName('button-menu')[4].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[5].style.pointerEvents = 'none'
                        document.getElementsByClassName('button-menu')[6].style.pointerEvents = 'none'

                        currentButton = newButton
                    
                    })
                }
            }
        }
        xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/retrieveAllEmployeeCompleteForms.do?empId=${userLoggedIn.empId}`, true)
        xhttp.send()
    }
})

// Close out of a form w/o submitting a grade just yet
document.getElementsByClassName('later-button-final')[0].addEventListener('click', () => {

    // Rebrighten the background
    document.body.style.background = "rgb(200, 220, 220)"
    document.getElementById('completed-forms-emp').style.display = 'none'

    // And restore click events
    document.getElementsByClassName('button-menu')[4].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[5].style.pointerEvents = 'auto'
    document.getElementsByClassName('button-menu')[6].style.pointerEvents = 'auto'

})

// Submit the form!
document.getElementsByClassName('yes-option-final')[0].addEventListener('click', () => {
    // Send an AJAX request, with the updated grade
    let grade
    if(document.getElementsByClassName('tuition-grade-final')[0].value == 'F')
        grade = 5
    else if(document.getElementsByClassName('tuition-grade-final')[0].value == 'D')
        grade = 4
    else if(document.getElementsByClassName('tuition-grade-final')[0].value == 'C')
        grade = 3
    else if(document.getElementsByClassName('tuition-grade-final')[0].value == 'B')
        grade = 2
    else if(document.getElementsByClassName('tuition-grade-final')[0].value == 'A')
        grade = 1

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){

            // Alert the user!
            alert('Success, you have updated your grade!')

            // Rebrighten the background
            document.body.style.background = 'rgb(200, 220, 220)'
            document.getElementById('completed-forms-emp').style.display = 'none'

            // Then re-enable the clickability of the 2 buttons
            document.getElementsByClassName('button-menu')[4].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[5].style.pointerEvents = 'auto'
            document.getElementsByClassName('button-menu')[6].style.pointerEvents = 'auto'

            // Remove that specific button
            document.getElementsByClassName('completed-forms-buttons')[0].removeChild(currentButton)
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/updateGradeOnCompletedForm.do?formId=${currentObject.formId}&gradeId=${grade}`, true)
    xhttp.send()
})

// Log out!
document.getElementsByClassName('button-menu')[6].addEventListener('click', () => {
    
    if(confirm('Are you sure you want to quit?')){
        // Make sure the variable is no longer recorded
        userLoggedIn = ''
        completedListEmployees = null

        // In addition, redisplay the main menu (to log in)
        document.getElementById('not-logged-in').style.display = 'block'
        document.getElementById('employee-logged-in').style.display = 'none'
    }
})








