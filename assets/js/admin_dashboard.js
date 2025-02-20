// Mock data for testing
const mockAdminData = {
  drivers: [
    { id: 'D001', name: 'John Smith', status: 'Active' },
    { id: 'D002', name: 'Jane Doe', status: 'On Route' }
  ],
  routes: [
    { id: 'R001', driver: 'D001', status: 'In Progress' },
    { id: 'R002', driver: 'D002', status: 'Scheduled' }
  ]
};

function displayDriverList() {
  const driverList = document.getElementById('driver-list');
  driverList.innerHTML = mockAdminData.drivers.map(driver => `
    <div class="driver-item">
      <div class="driver-info">
        <span>${driver.name}</span>
        <span class="status ${driver.status.toLowerCase()}">${driver.status}</span>
      </div>
      <div class="driver-actions">
        <button onclick="editDriver('${driver.id}')">Edit</button>
        <button onclick="viewDriverDetails('${driver.id}')">Details</button>
      </div>
    </div>
  `).join('');
}

function displayRouteAssignments() {
  const routeAssignments = document.getElementById('route-assignments');
  routeAssignments.innerHTML = mockAdminData.routes.map(route => `
    <div class="route-item">
      <div class="route-info">
        <span>Route #${route.id}</span>
        <span class="status ${route.status.toLowerCase()}">${route.status}</span>
      </div>
      <div class="route-actions">
        <button onclick="editRoute('${route.id}')">Edit</button>
        <button onclick="viewRouteDetails('${route.id}')">Details</button>
      </div>
    </div>
  `).join('');
}

function handleAnnouncementSubmit(event) {
  event.preventDefault();
  const announcement = document.getElementById('announcement-text').value;
  alert(`Announcement posted: ${announcement}`);
  document.getElementById('announcement-text').value = '';
}

// Add new mock functions for driver management
function openAddDriverModal() {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Add New Driver</h3>
      <form id="add-driver-form">
        <div class="form-group">
          <label for="driver-name">Driver Name</label>
          <input type="text" id="driver-name" required>
        </div>
        <div class="form-group">
          <label for="driver-id">Driver ID</label>
          <input type="text" id="driver-id" required>
        </div>
        <div class="form-group">
          <label for="driver-password">Initial Password</label>
          <input type="password" id="driver-password" required>
        </div>
        <div class="modal-buttons">
          <button type="submit">Add Driver</button>
          <button type="button" onclick="closeModal(this)">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('add-driver-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newDriver = {
      id: document.getElementById('driver-id').value,
      name: document.getElementById('driver-name').value,
      status: 'Active'
    };
    mockAdminData.drivers.push(newDriver);
    displayDriverList();
    closeModal(this);
  });
}

function editDriver(id) {
  const driver = mockAdminData.drivers.find(d => d.id === id);
  if (!driver) return;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <h3>Edit Driver</h3>
      <form id="edit-driver-form">
        <div class="form-group">
          <label for="edit-driver-name">Driver Name</label>
          <input type="text" id="edit-driver-name" value="${driver.name}" required>
        </div>
        <div class="form-group">
          <label for="edit-driver-status">Status</label>
          <select id="edit-driver-status">
            <option ${driver.status === 'Active' ? 'selected' : ''}>Active</option>
            <option ${driver.status === 'On Route' ? 'selected' : ''}>On Route</option>
            <option ${driver.status === 'Inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
        <div class="modal-buttons">
          <button type="submit">Save Changes</button>
          <button type="button" onclick="closeModal(this)">Cancel</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
  
  document.getElementById('edit-driver-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const index = mockAdminData.drivers.findIndex(d => d.id === id);
    if (index !== -1) {
      mockAdminData.drivers[index] = {
        ...mockAdminData.drivers[index],
        name: document.getElementById('edit-driver-name').value,
        status: document.getElementById('edit-driver-status').value
      };
      displayDriverList();
    }
    closeModal(this);
  });
}

function closeModal(element) {
  element.closest('.modal').remove();
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.href = '/index.html';
}

// Mock function for authentication check
function checkAuth() {
  // Replace with actual authentication logic
  return { name: 'Admin User' };
}

// Mock functions for viewing driver details
function viewDriverDetails(id) {
  alert(`Viewing driver details for ${id}`);
}

// Mock functions for editing and viewing route details
function editRoute(id) {
  alert(`Editing route ${id}`);
}

function viewRouteDetails(id) {
  alert(`Viewing route details for ${id}`);
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuth();
  if (user) {
    document.getElementById('admin-name').textContent = user.name;
    displayDriverList();
    displayRouteAssignments();
  }
});