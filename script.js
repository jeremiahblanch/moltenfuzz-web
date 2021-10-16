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

  const validate = () => {
    var formData = new FormData(form);
    var data = formDataToObject(formData);

    if (!data.name) {
      return { message: 'Please enter your name.' };
    }

    if (!data.phone) {
      return { message: 'Please enter your phone number.' };
    }

    if (!data.email) {
      return { message: 'Please enter your email address.' };
    }

    if (!data.message) {
      return { message: 'Please enter a message explaining your enquiry.' };
    }

    var captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse || captchaResponse.length === 0) {
      return { message: 'Please tick the "I’m not a robot" checkbox before you hit Send.' };
    }

    return { success: true };
  }

  function submitHandler(ev) {
    ev.preventDefault();
    ev.stopImmediatePropagation();

    if (isSubmitting) {
      return;
    }

    var validationResponse = validate();
    
    if (!validationResponse.success) {
      responseEl.innerText = validationResponse.message;

      return;
    }

    isSubmitting = true;

    var formData = new FormData(form);
    var data = formDataToObject(formData);
    console.log('form-submission', data);
    woopra && woopra.track('form-submission', data);
    submitEl.innerText = 'Sending...';
    submitEl.style.opacity = 0.5;

    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
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