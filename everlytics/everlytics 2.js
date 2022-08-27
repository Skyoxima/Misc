document.getElementById('createbutton').addEventListener('click', e => {
    e.preventDefault();   // since a button is used inside a form, default action is to submit the form contents which will reload the page (live server)... we don't want that to happen
    validate();
})

function validate() {
    // 'isEmpty?' checks
    document.getElementById('pipelinetext').value.length === 0 ? setError('pipelineerr', 'Cannot be empty!') : removeError('pipelineerr');
    document.getElementById('GCS-project-name').value.length === 0 ? setError('GCS-project-nameerr', 'Cannot be empty!') : removeError('GCS-project-nameerr');

    //regex checks
    const gs = /\bgs\:\/\/\w+/g; //should start with gs:// then anything is valid (whitespace excluded)
    // search returns -1 when no matches are found
    document.getElementById('GCS-bucket-name').value.search(gs) === -1 ? setError('GCS-bucket-nameerr', 'Invalid name!') : removeError('GCS-bucket-nameerr');
    document.getElementById('ICSF').value.search(gs) === -1 ? setError('ICSFerr', 'Invalid name!') : removeError('ICSFerr');
    document.getElementById('run-every').value.search(/\D/g) === -1 ? removeError('run-everyerr') : setError('run-everyerr', 'Only numeric values allowed!');
}

function setError(errDiv, errMessage) {
    document.getElementById(errDiv).innerHTML = `<span>${errMessage}</span>`;
    document.getElementById(errDiv).className = 'error-visible';
}

function removeError(errDiv) {
    document.getElementById(errDiv).innerHTML = ``;
    document.getElementById(errDiv).className = 'error-hidden';
}