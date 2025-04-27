document.addEventListener('DOMContentLoaded', function() {
  // Terminal typing effect
  const terminalElements = document.querySelectorAll('.terminal-text');
  
  terminalElements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        // Add blinking cursor at the end
        const cursor = document.createElement('span');
        cursor.className = 'blinking-cursor';
        element.parentNode.appendChild(cursor);
      }
    }, 50);
  });
  
  // Handle course card interactions
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = '#ffffff';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '#00ff00';
    });
  });
});