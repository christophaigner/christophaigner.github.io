// Typing animation for navbar brand name
(function() {
  function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
      console.log('Typing element not found');
      return;
    }

    const text = typingElement.getAttribute('data-text');
    if (!text) {
      console.log('No text data found');
      return;
    }

    // Respect reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typingElement.textContent = text;
      typingElement.classList.remove('typing-text');
      return;
    }

    // Check if this is a navigation (not a reload)
    // Use performance API to detect reload vs navigation
    const navEntry = performance.getEntriesByType('navigation')[0];
    const isReload = navEntry?.type === 'reload' || 
                     (performance.navigation && performance.navigation.type === 1); // TYPE_RELOAD = 1
    
    // Check sessionStorage to see if we've already animated in this session
    const hasAnimated = sessionStorage.getItem('navbar-typed');
    
    // Only animate on actual page reload, not on navigation
    if (!isReload && hasAnimated) {
      // This is navigation, not a reload - just show the text
      typingElement.textContent = text;
      typingElement.classList.remove('typing-text');
      return;
    }

    // This is a reload - start typing animation
    let index = 0;
    typingElement.textContent = '';
    typingElement.classList.add('typing-active');
    typingElement.style.display = 'inline'; // Ensure it's visible

    function typeChar() {
      if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        // Vary typing speed slightly for more natural feel
        const speed = Math.random() * 30 + 70; // 70-100ms
        setTimeout(typeChar, speed);
      } else {
        // Animation complete - keep cursor blinking
        typingElement.classList.remove('typing-active');
        // Mark as animated in this session
        sessionStorage.setItem('navbar-typed', 'true');
      }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 400);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypingAnimation);
  } else {
    // DOM already loaded, run immediately
    setTimeout(initTypingAnimation, 100);
  }
})();

