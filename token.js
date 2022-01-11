import { fillData, hideSpinner, showForm, showMessage, fecthInvitation } from "./service.js";
import { setNameValidationMessage } from "./validation.js";

$(function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('code')
    sessionStorage.setItem('code', token);
    fecthInvitation(token)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(response);
    } )
    .then((data) => {
            fillData(data);
            hideSpinner();
            showForm();
            setNameValidationMessage('#firstNameInput');
            setNameValidationMessage('#lastNameInput');
     })
    .catch((error) => {
        hideSpinner();
        showForm();
        showMessage("Lejárt a meghívó érvényessége! Kérjük, lépj kapcsolatba a feladóval!");
    })
})
