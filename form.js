// array of elements like [input#userName, input#email, input#password, input#confirmPass] 
const FORM = [...document.forms.formValidation.elements]
//select button element and assign to BTN constant
const BTN = document.getElementById('btn-submit')

//
const showError = (root, message) => {
    root.style.borderColor = `red`
    root.nextElementSibling.innerHTML = message
    root.nextElementSibling.style.visibility = `visible`
} 

//
const showSucces = (root) => {
    root.style.borderColor = `green` 
    root.nextElementSibling.style.visibility = `hidden`
}

// 
const checkRequired = () => {
    FORM.map(node => (node.value == '') ? showError(node, `Required ${node.name} input`) : showSucces(node)) 
}

//
const checkLength = (node, min, max) => {

    if(node.value.length < min || node.value.length >= max ) {
        showError(node, `${node.name} must be at least ${min} characters`)
    } else {
        showSucces(node)
    }
}

//
const checkEmail = () => {
    const charact = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(charact.test(FORM[1].value)) {
        showSucces(FORM[1])
    } else {
        showError(FORM[1], `${FORM[1].name} is not valid`)
    }
}

//
const checkPasswordMatch = () => {
    if(FORM[3].value.length >= 1) {
        if(FORM[2].value == FORM[3].value) {
            showSucces(FORM[3])
        } else {
            showError(FORM[3], `Password don't match`)
        }
    } else {showError(FORM[3], `Password2 is required`)}    
}

BTN.addEventListener('click', () => {
    if(FORM[0].value == '') {
        checkRequired()
    } else {
        checkLength(userName, 3, 20)
        checkEmail()
        checkLength(password, 6, 15)
        checkPasswordMatch()
    }
    
    
})
