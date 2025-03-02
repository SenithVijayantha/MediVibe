document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create indicator dots
    for (let i = 0; i < slideCount; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (i === 0) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    // Initialize the carousel
    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // Navigation functions
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }
    
    function goToPrevSlide() {
      currentIndex = (currentIndex === 0) ? slideCount - 1 : currentIndex - 1;
      updateCarousel();
    }
    
    function goToNextSlide() {
      currentIndex = (currentIndex === slideCount - 1) ? 0 : currentIndex + 1;
      updateCarousel();
    }
    
    // Add event listeners
    prevButton.addEventListener('click', goToPrevSlide);
    nextButton.addEventListener('click', goToNextSlide);
    
    // Auto-advance the carousel every 5 seconds
    const autoAdvance = setInterval(goToNextSlide, 5000);
    
    // Pause auto-advance when hovering over the carousel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
      clearInterval(autoAdvance);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
      clearInterval(autoAdvance); // Clear any existing interval
      setInterval(goToNextSlide, 5000); // Restart the interval
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      }
    });
    
    // Initialize the carousel
    updateCarousel();
  });