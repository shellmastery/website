document.addEventListener('DOMContentLoaded', function() {
  // Pixelated ASCII art loading effect
  const pixelatedElements = document.querySelectorAll('.pixelated-load');
  
  pixelatedElements.forEach(element => {
    const originalText = element.textContent;
    const lines = originalText.split('\n');
    
    // Create a 2D array to store characters with their positions
    const charMap = [];
    lines.forEach((line, lineIndex) => {
      [...line].forEach((char, charIndex) => {
        if (char !== ' ') {
          charMap.push({
            char: char,
            line: lineIndex,
            position: charIndex
          });
        }
      });
    });
    
    // Shuffle the characters randomly
    for (let i = charMap.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [charMap[i], charMap[j]] = [charMap[j], charMap[i]];
    }
    
    // Clear the element and prepare for animation
    element.textContent = '';
    
    // Create empty lines
    const displayLines = lines.map(line => ' '.repeat(line.length));
    element.textContent = displayLines.join('\n');
    
    // Animate characters appearing
    let charIndex = 0;
    const animateChar = () => {
      if (charIndex < charMap.length) {
        const { char, line, position } = charMap[charIndex];
        const currentLines = element.textContent.split('\n');
        currentLines[line] = currentLines[line].substring(0, position) + char + currentLines[line].substring(position + 1);
        element.textContent = currentLines.join('\n');
        
        charIndex++;
        setTimeout(animateChar, 10); // Adjust speed here
      }
    };
    
    animateChar();
  });
  
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
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const terminalLinks = document.querySelector('.terminal-links');
  
  if (mobileMenuToggle && terminalLinks) {
    mobileMenuToggle.addEventListener('click', function() {
      terminalLinks.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = mobileMenuToggle.querySelectorAll('span');
      if (terminalLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.terminal-nav')) {
        terminalLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = terminalLinks.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        terminalLinks.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
});