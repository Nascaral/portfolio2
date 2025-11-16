/**
 * Theme Toggle with localStorage
 * This script manages light/dark theme switching across all pages
 */

(function() {
    'use strict';

    // Initialize theme on page load (before DOMContentLoaded to prevent flash)
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Priority: localStorage > system preference > default (light)
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        // Apply theme immediately
        document.documentElement.setAttribute('data-theme', theme);
        
        return theme;
    }

    // Apply theme immediately (before page renders)
    const currentTheme = initTheme();

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        
        if (!themeToggle) {
            console.warn('Theme toggle element not found. Make sure an element with id="theme-toggle" exists.');
            return;
        }

        // Set initial checkbox state
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        themeToggle.checked = (theme === 'light'); // Checked = light mode
        updateThemeIcon(theme);

        // Toggle theme function
        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update toggle state and icon
            themeToggle.checked = (newTheme === 'light');
            updateThemeIcon(newTheme);
        }

        // Update icon based on theme
        function updateThemeIcon(theme) {
            const label = document.querySelector('label[for="theme-toggle"]');
            if (label) {
                label.textContent = theme === 'dark' ? '☀︎/☾' : '☀︎/☾';
                label.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
            }
        }

        // Listen for toggle changes
        themeToggle.addEventListener('change', toggleTheme);

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                themeToggle.checked = (newTheme === 'light');
                updateThemeIcon(newTheme);
            }
        });
    });
})();