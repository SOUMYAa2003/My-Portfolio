document.addEventListener("DOMContentLoaded", () => {
  // TYPEWRITER EFFECT
  const messages = ["Hi, I'm Soumya :)", "..a PLC Programmer", "..an Automation Enthusiast"];
  let messageIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayBetweenMessages = 1200; // pause after typing each line

  const typewriterElement = document.getElementById("typewriter");

  function type() {
    const currentMessage = messages[messageIndex];
    const visibleText = currentMessage.substring(0, charIndex);
    typewriterElement.textContent = visibleText;

    if (!isDeleting) {
      if (charIndex < currentMessage.length) {
        charIndex++;
        setTimeout(type, typeSpeed);
      } else {
        isDeleting = true;
        setTimeout(type, delayBetweenMessages);
      }
    } else {
      if (charIndex > 0) {
        charIndex--;
        setTimeout(type, deleteSpeed);
      } else {
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length;
        setTimeout(type, 500);
      }
    }
  }

  if (typewriterElement) {
    type(); // Start typing only if the element exists
  }

  // FILTER + SEARCH FUNCTIONALITY
  const filterButtons = document.querySelectorAll('.filter-btn');
  const searchBox = document.getElementById('searchBox');
  const projectCards = document.querySelectorAll('.project-card');

  function filterProjects() {
    const selectedCategory = document.querySelector('.filter-btn.active').dataset.category;
    const searchText = searchBox.value.toLowerCase();

    projectCards.forEach(card => {
      const cardCategory = card.dataset.category.toLowerCase();
      const cardText = card.textContent.toLowerCase();

      const matchCategory = selectedCategory === 'all' || cardCategory === selectedCategory;
      const matchSearch = cardText.includes(searchText);

      if (matchCategory && matchSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Handle category button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active')?.classList.remove('active');
      btn.classList.add('active');
      filterProjects();
    });
  });

  // Handle search input
  if (searchBox) {
    searchBox.addEventListener('input', filterProjects);
  }
});
