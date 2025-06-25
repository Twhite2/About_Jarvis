// This script handles theme initialization before the React app loads
// to prevent flash of incorrect theme
(function() {
  try {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // If saved theme exists, use it
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', savedTheme);
      return;
    }
    
    // Otherwise check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    
  } catch {
    // Fallback to dark theme if there's an error
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
