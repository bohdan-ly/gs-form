// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('.services').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Form submission handler
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simple form validation and animation
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
    // Placeholder for API call
    bookAppointment(new FormData(this))
        .then(() => {
            submitBtn.textContent = 'Appointment Requested!';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
                this.reset();
            }, 2000);
        })
        .catch(() => {
            submitBtn.textContent = 'Error! Try Again';
            submitBtn.style.background = 'linear-gradient(45deg, #dc3545, #ff6b6b)';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
            }, 2000);
        });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for scroll animation
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    // Hide scroll indicator when scrolling
    if (scrollIndicator) {
        scrollIndicator.style.opacity = scrolled > 100 ? '0' : '1';
    }
});

// Set minimum date to today for booking form
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Placeholder for API integration for booking and future forms
function bookAppointment(formData) {
    // Example: send data to /api/book endpoint (to be implemented)
    // return fetch('/api/book', {
    //     method: 'POST',
    //     body: formData
    // }).then(res => {
    //     if (!res.ok) throw new Error('Network error');
    //     return res.json();
    // });
    // For now, simulate API delay
    return new Promise((resolve) => setTimeout(resolve, 1500));
}

// Future: Add more functions for user interactions and forms here 