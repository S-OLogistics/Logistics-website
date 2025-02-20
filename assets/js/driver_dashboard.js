// Mock data for testing
const mockRouteData = {
  route: {
    id: 'R001',
    stops: [
      { location: 'Warehouse A', time: '08:00 AM', type: 'Pickup' },
      { location: 'Store B', time: '10:30 AM', type: 'Delivery' },
      { location: 'Store C', time: '02:00 PM', type: 'Delivery' }
    ]
  },
  payStub: {
    period: 'May 1-15, 2023',
    regularHours: 80,
    overtimeHours: 5,
    grossPay: 2500.00
  },
  schedule: [
    { date: '2023-05-16', shift: '8:00 AM - 4:00 PM' },
    { date: '2023-05-17', shift: '8:00 AM - 4:00 PM' },
    { date: '2023-05-18', shift: '8:00 AM - 4:00 PM' }
  ],
  notifications: [
    { message: 'New route assignment for tomorrow', date: '2023-05-15 14:30' },
    { message: 'Mandatory safety meeting next week', date: '2023-05-15 09:15' }
  ]
};

// Check authentication
function checkAuth() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user || (window.location.pathname.includes('driver') && user.type !== 'driver') ||
      (window.location.pathname.includes('admin') && user.type !== 'admin')) {
    window.location.href = '/pages/login.html';
    return null;
  }
  return user;
}

// Initialize dashboard based on user type
function initializeDashboard() {
  const user = checkAuth();
  if (!user) return;

  if (user.type === 'driver') {
    document.getElementById('driver-name').textContent = user.name;
    displayRouteDetails();
    displayPayStub();
    displaySchedule();
    displayNotifications();
  } else {
    document.getElementById('admin-name').textContent = user.name;
    displayDriverList();
    displayRouteAssignments();
  }
}

// Driver dashboard functions
function displayRouteDetails() {
  const routeDetails = document.getElementById('route-details');
  const route = mockRouteData.route;
  
  routeDetails.innerHTML = `
    <h3>Route #${route.id}</h3>
    <div class="stops">
      ${route.stops.map(stop => `
        <div class="stop">
          <span class="time">${stop.time}</span>
          <span class="location">${stop.location}</span>
          <span class="type">${stop.type}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function displayPayStub() {
  const payStub = document.getElementById('pay-stub');
  const pay = mockRouteData.payStub;
  
  payStub.innerHTML = `
    <p><strong>Pay Period:</strong> ${pay.period}</p>
    <p><strong>Regular Hours:</strong> ${pay.regularHours}</p>
    <p><strong>Overtime Hours:</strong> ${pay.overtimeHours}</p>
    <p><strong>Gross Pay:</strong> $${pay.grossPay.toFixed(2)}</p>
  `;
}

function displaySchedule() {
  const schedule = document.getElementById('schedule');
  const shifts = mockRouteData.schedule;
  
  schedule.innerHTML = `
    <h3>Schedule</h3>
    <div class="shifts">
      ${shifts.map(shift => `
        <div class="shift">
          <span class="date">${shift.date}</span>
          <span class="shift-time">${shift.shift}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function displayNotifications() {
  const notifications = document.getElementById('notifications');
  const messages = mockRouteData.notifications;
  
  notifications.innerHTML = `
    <h3>Notifications</h3>
    <div class="notification-list">
      ${messages.map(message => `
        <div class="notification">
          <span class="message">${message.message}</span>
          <span class="date">${message.date}</span>
        </div>
      `).join('')}
    </div>
  `;
}

function displayDriverList() {
  // This function is currently empty. You would need to define the logic for displaying the driver list.
}

function displayRouteAssignments() {
  // This function is currently empty. You would need to define the logic for displaying the route assignments.
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.href = '/index.html';
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', initializeDashboard);