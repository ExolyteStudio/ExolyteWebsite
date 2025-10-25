// 404 Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Countdown timer
    let countdown = 10;
    const countdownElement = document.getElementById('countdown');
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            window.location.href = 'index.html';
        }
    }, 1000);

    // Search functionality
    const searchInput = document.getElementById('errorSearch');
    const searchBtn = document.querySelector('.search-btn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Możesz tutaj dodać wyszukiwanie po swojej stronie
            // Na razie przekierowanie do Google
            window.open(`https://www.google.com/search?q=site:exolytestudios.pl ${encodeURIComponent(query)}`, '_blank');
            searchInput.value = '';
        }
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Floating elements animation enhancement
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random slight variations to animations
        const randomDelay = Math.random() * 2;
        const randomDuration = 5 + Math.random() * 3;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        
        // Add hover effect
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(15deg)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = 'var(--shadow)';
        });
    });

    // Add some interactive effects to the 404 number
    const number4s = document.querySelectorAll('.number-4');
    
    number4s.forEach(number => {
        number.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--primary-dark)';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.color = '';
        });
    });

    // Error page specific navigation
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === '404.html') {
        // Update browser title dynamically
        document.title = '404 - Strona Nie Znaleziona | Exolyte Studios';
        
        // Add page view tracking (możesz później dodać Google Analytics)
        console.log('404 page visited:', window.location.href);
    }
});

// Smooth scrolling for anchor links (from main script, but ensure it works)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});