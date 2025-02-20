function trackShipment() {
  const trackingNumber = document.getElementById('tracking-number').value;
  const trackingResult = document.getElementById('tracking-result');
  
  if (!trackingNumber) {
    trackingResult.innerHTML = '<p class="error">Please enter a tracking number</p>';
    return;
  }

  trackingResult.innerHTML = '<p class="error">Tracking number does not exist</p>';
  return;

  
  // Simulate tracking result
  /* const status = ['In transit', 'Out for delivery', 'Delivered', 'Processing'][Math.floor(Math.random() * 4)];
  const location = ['Los Angeles, CA', 'Chicago, IL', 'New York, NY', 'Miami, FL'][Math.floor(Math.random() * 4)];
  
  trackingResult.innerHTML = `
    <div class="tracking-details">
      <h3>Tracking Number: ${trackingNumber}</h3>
      <p>Status: ${status}</p>
      <p>Current Location: ${location}</p>
      <p>Last Updated: ${new Date().toLocaleString()}</p>
    </div>
  `; */
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Only handle actual anchor links, not just "#"
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Add animation class to service cards when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.service-card').forEach(card => {
  observer.observe(card);
});

// Add quote modal functionality
/* function openQuoteModal() {
  const modal = document.createElement('div');
  modal.className = 'quote-modal';
  modal.innerHTML = `
    <div class="quote-modal-content">
      <h2>Request a Quote</h2>
      <form id="quote-form" onsubmit="handleQuoteSubmit(event)">
        <div class="form-group">
          <label for="pickup-location">Pickup Location</label>
          <input type="text" id="pickup-location" required>
        </div>
        <div class="form-group">
          <label for="dropoff-location">Drop-off Location</label>
          <input type="text" id="dropoff-location" required>
        </div>
        <div class="form-group">
          <label for="shipment-weight">Shipment Weight (lbs)</label>
          <input type="number" id="shipment-weight" min="1" required>
        </div>
        <div class="form-group">
          <label for="contact-name">Contact Name</label>
          <input type="text" id="contact-name" required>
        </div>
        <div class="form-group">
          <label for="contact-email">Contact Email</label>
          <input type="email" id="contact-email" required>
        </div>
        <div class="form-group">
          <label for="contact-phone">Contact Phone</label>
          <input type="tel" id="contact-phone" required>
        </div>
        <div class="modal-buttons">
          <button type="submit"> Submit Quote Request</button>
          <button type="button" onclick="closeQuoteModal()">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Add phone number formatting
  document.getElementById('contact-phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  });
  
  // Trigger animation after a small delay
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
} */

function closeQuoteModal() {
  const modal = document.querySelector('.quote-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

function handleQuoteSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = {
    pickupLocation: document.getElementById('pickup-location').value,
    dropoffLocation: document.getElementById('delivery-location').value,
    shipmentWeight: document.getElementById('weight').value,
    contactName: document.getElementById('name').value,
    contactEmail: document.getElementById('email').value,
    contactPhone: document.getElementById('phone').value
  };
  
  // Send data to the API
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      // Show confirmation modal
      document.getElementById('confirmation-modal').style.display = 'flex';
    } else {
      alert('There was an error submitting your request. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your request. Please try again..');
  });
}

function closeModal() {
  document.getElementById('confirmation-modal').style.display = 'none';
}