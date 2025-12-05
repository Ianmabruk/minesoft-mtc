// Clear all data for fresh start
export const clearAllData = () => {
  // Clear all localStorage data
  const keys = [
    'mtc_users',
    'mtc_quotes', 
    'mtc_applications',
    'mtc_jobs',
    'mtc_projects',
    'business_forms',
    'authorized_admins',
    'admin_requests',
    'user_authenticated',
    'user_email',
    'current_user',
    'admin_authenticated'
  ]
  
  keys.forEach(key => localStorage.removeItem(key))
  
  // Reload page to reset state
  window.location.reload()
}

// Add to window for easy access
window.clearAllData = clearAllData