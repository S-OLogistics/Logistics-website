// Mock user data for testing
const mockUsers = {
  drivers: [
    { id: 'D001', password: 'driver123', name: 'John Smith' }
  ],
  admins: [
    { id: 'A001', password: 'admin123', name: 'Admin User' }
  ]
};

function handleDriverLogin(event) {
  event.preventDefault();
  const driverId = document.getElementById('driver-id').value;
  const password = document.getElementById('driver-password').value;

  const driver = mockUsers.drivers.find(d => d.id === driverId && d.password === password);
  
  if (driver) {
    localStorage.setItem('currentUser', JSON.stringify({
      type: 'driver',
      ...driver
    }));
    window.location.href = '/pages/driver_dashboard.html';
  } else {
    alert('Invalid credentials');
  }
}

function handleAdminLogin(event) {
  event.preventDefault();
  const adminId = document.getElementById('admin-id').value;
  const password = document.getElementById('admin-password').value;

  const admin = mockUsers.admins.find(a => a.id === adminId && a.password === password);
  
  if (admin) {
    localStorage.setItem('currentUser', JSON.stringify({
      type: 'admin',
      ...admin
    }));
    window.location.href = '/pages/admin_dashboard.html';
  } else {
    alert('Invalid credentials');
  }
}

function handleLogout() {
  localStorage.removeItem('currentUser');
  window.location.href = '/index.html';
}

function bypassLogin(userType) {
  const mockBypassUser = {
    type: userType,
    id: userType === 'driver' ? 'D999' : 'A999',
    name: userType === 'driver' ? 'Test Driver' : 'Test Admin'
  };
  
  localStorage.setItem('currentUser', JSON.stringify(mockBypassUser));
  window.location.href = userType === 'driver' ? '/pages/driver_dashboard.html' : '/pages/admin_dashboard.html';
}