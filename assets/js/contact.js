function handleContactSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    affiliation: document.getElementById('affiliation').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    summary: document.getElementById('summary').value
  };
  
  // For demonstration purposes, log the data and show success message
  console.log('Contact form submission:', formData);
  
  // Create success message
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
  
  // Add message to the page
  const form = document.querySelector('.contact-form');
  form.innerHTML = '';
  form.appendChild(successMessage);
  
  // In a real application, you would send this data to a server
  return false;
}

// Add phone number formatting
document.getElementById('phone').addEventListener('input', function(e) {
  let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});