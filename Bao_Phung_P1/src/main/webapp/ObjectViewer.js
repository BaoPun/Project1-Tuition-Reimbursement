let button = document.getElementById('button-id')
button.addEventListener('click', () => {

    let id = document.getElementById('id').value
    // document.getElementById('result').textContent = id


    // AJAX
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById('result').textContent = ''
            document.getElementById('result').insertAdjacentHTML('afterbegin', this.responseText)
            console.log(this.responseText);
        }
    }
    xhttp.open('GET', `http://localhost:8080/Bao_Phung_P1/getThisObject.do?id=${id}`, true)
    xhttp.send()
})