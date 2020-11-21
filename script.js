(function (win) {
    var GOOGLE_API = 'https://script.google.com/macros/s/AKfycbz1mhqP6zZQAPWEncXjUEX9t7_tMGsUG6nv2_p7HxWosqkkDFb-/exec';
    var form = document.querySelector('form');
    var responseEl = document.querySelector('.form-response');
    
    form.addEventListener('submit', handler);

    function handler (ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var data = new FormData(form);
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() { 
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log('Submission successful', req.response);
            }
        }
        req.open('POST', GOOGLE_API);
        req.send(data);        
        responseEl.innerText = 'Thank you for your enquiry. We will respond to you soon.'
        return false;
    }
})(window);