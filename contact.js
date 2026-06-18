document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = form.querySelector('.btn-submit');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !subject || !message) {
      showFormMessage('error', 'Please fill in all fields.');
      return;
    }
    
    if (!isValidEmail(email)) {
      showFormMessage('error', 'Please enter a valid email address.');
      return;
    }
    
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      showFormMessage('success', 'Thanks for reaching out! I\'ll get back to you soon.');
      form.reset();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      setTimeout(() => {
        const messageEl = document.querySelector('.form-message');
        if (messageEl) messageEl.style.display = 'none';
      }, 5000);
    }, 1500);
  });
  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function showFormMessage(type, text) {
    let messageEl = document.querySelector('.form-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'form-message';
      form.insertBefore(messageEl, form.firstChild);
    }
    messageEl.className = 'form-message ' + type;
    messageEl.textContent = text;
    messageEl.style.display = 'block';
  }
});