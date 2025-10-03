document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const editToggle = document.getElementById('edit-toggle');
  const displayDiv = document.getElementById('about-content-display');
  const editDiv = document.getElementById('about-content-edit');
  const aboutText = document.getElementById('about-text');
  const aboutTextarea = document.getElementById('about-textarea');

  // ==========================
  // FOOTER YEAR
  // ==========================
  yearEl.textContent = new Date().getFullYear();

  // ==========================
  // LOAD SAVED THEME & CONTENT
  // ==========================
  const savedTheme = localStorage.getItem('portfolio-theme');
  const savedContent = localStorage.getItem('portfolio-about');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '🖤';
  } else {
    themeIcon.textContent = '🤍';
  }

  if (savedContent) {
    aboutText.textContent = savedContent;
    aboutTextarea.value = savedContent;
  }

  // ==========================
  // THEME TOGGLE
  // ==========================
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');

    // Animate icon
    themeIcon.classList.add('spin');
    themeIcon.textContent = isDark ? '🖤' : '🤍';
    setTimeout(() => themeIcon.classList.remove('spin'), 600);
  });

  // ==========================
  // EDIT TOGGLE
  // ==========================
  editToggle.addEventListener('click', () => {
    if (editDiv.classList.contains('hidden')) {
      // Switch to edit mode
      displayDiv.classList.add('hidden');
      editDiv.classList.remove('hidden');
      editToggle.textContent = '💾 Save Changes';
      aboutTextarea.value = aboutText.textContent;
    } else {
      // Save and switch back
      const newContent = aboutTextarea.value;
      aboutText.textContent = newContent;
      localStorage.setItem('portfolio-about', newContent);

      displayDiv.classList.remove('hidden');
      editDiv.classList.add('hidden');
      editToggle.textContent = '✏️ Edit';

      // Show save feedback
      showToast('✅ Changes saved!');
    }
  });

  // ==========================
  // KEYBOARD SHORTCUT (Ctrl+E)
  // ==========================
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      editToggle.click();
    }
  });

  // ==========================
  // TOAST FUNCTION
  // ==========================
  function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '10px 15px';
    toast.style.background = 'var(--primary)';
    toast.style.color = 'var(--primary-foreground)';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';

    document.body.appendChild(toast);

    setTimeout(() => (toast.style.opacity = '1'), 50);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  }
});
// ==========================
// SCROLL REVEAL ANIMATION
// ==========================
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // animate once
      }
    });
  },
  { threshold: 0.2 } // trigger when 20% visible
);

reveals.forEach((el) => observer.observe(el));

