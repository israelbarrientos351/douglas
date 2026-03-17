// ============================================
// FUNCIONES DE NAVEGACIÓN Y SCROLL
// ============================================

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards de servicios
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    const projectCards = document.querySelectorAll('.proyecto-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

const formContacto = document.getElementById('form-contacto');
if (formContacto) {
    formContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = this.querySelector('input[type="text"]').value;
        const telefono = this.querySelector('input[type="tel"]').value;
        const proyecto = this.querySelector('textarea').value;
        
        // Mostrar confirmación
        alert(`¡Gracias ${nombre}! Tu solicitud ha sido enviada. Te contactaremos al ${telefono} pronto.`);
        
        // Limpiar formulario
        this.reset();
    });
}

// ============================================
// ANIMACIONES DE HOVER EN CARDS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .proyecto-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ============================================
// CONTADOR DE ESTADÍSTICAS
// ============================================

function animateCounter(element, finalValue, duration = 2000) {
    let currentValue = 0;
    const increment = finalValue / (duration / 30);
    
    const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
            element.textContent = finalValue;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 30);
}

// Animar contadores cuando se vean
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const stat = entry.target.querySelector('h4');
            const value = stat.textContent.match(/\d+/)[0];
            animateCounter(stat, parseInt(value));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
});

// ============================================
// RIPPLE EFFECT EN BOTONES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-cta, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Estilo para ripple (agregar a CSS si lo necesitas)
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL PROGRESIVO DEL HEADER
// ============================================

let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scroll down - ocultar header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll up - mostrar header
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// VALIDACIÓN DE FORMULARIO EN TIEMPO REAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.contacto-form input, .contacto-form textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff6b35';
                this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.3)';
            } else {
                this.style.borderColor = '#4CAF50';
                this.style.boxShadow = '0 0 10px rgba(76, 175, 80, 0.2)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = '#ff6b35';
            this.style.boxShadow = '0 0 10px rgba(255, 107, 53, 0.2)';
        });
    });
});

// ============================================
// NOTIFICACIÓN SIMPLE
// ============================================

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#4CAF50' : '#ff6b35'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notif.textContent = mensaje;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

console.log('✅ Script cargado correctamente - Página lista para acciones');
