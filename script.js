(function (win) {
    const GOOGLE_API = 'https://script.google.com/macros/s/AKfycbz6fIHtiqpbhuzuqQV3iRe2nvkMWWari_CBEtwVOnfs_FNyL_nMq4ORFGbq-eDXNkjBkw/exec';
    var form = document.querySelector('form');
    var responseEl = document.querySelector('.form-response');
    var submitEl = document.querySelector('button[type=submit]');
    var isSubmitting;
    
    form.addEventListener('submit', submitHandler);

    var formDataToObject = (formData) => {
        var obj = {};
        formData.forEach((value, key) => obj[key] = value);
        return obj;
    }
    function submitHandler (ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        if (isSubmitting) {
            return
        }
        isSubmitting = true;

        var formData = new FormData(form);
        var data = formDataToObject(formData);
        console.log('form-submission', data);
        woopra && woopra.track('form-submission', data);
        submitEl.innerText = 'Sending...';
        submitEl.style.opacity = 0.5;
        
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() { 
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log('Submission successful', req.response);
                submitEl.style.display = 'none';
                responseEl.innerText = 'Thank you for your enquiry. We will respond to you soon.';
                isSubmitting = false;
            }
            
        }
        req.open('POST', GOOGLE_API);
        req.send(formData);

        responseEl.innerText = '';
        return false;
    }
})(window);