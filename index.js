// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const formData = new FormData(this);
        let isValid = true;
        let errorMessage = '';

        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                errorMessage = 'Iltimos, barcha maydonlarni to\'ldiring';
                break;
            }
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Xabaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog\'lanamiz.');
            this.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Scroll-based animation for destination cards
const cards = document.querySelectorAll('.destination-card');
const animateOnScroll = () => {
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;

        if (cardTop < triggerBottom) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animation
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.5s ease-out';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
animateOnScroll();

// Sticky header
const header = document.querySelector('header');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.scrollY > heroSection.offsetHeight - header.offsetHeight) {
        header.style.backgroundColor = 'rgba(76, 175, 80, 0.95)';
    } else {
        header.style.backgroundColor = 'var(--primary-color)';
    }
});

// Price animation on hover
const prices = document.querySelectorAll('.price');
prices.forEach(price => {
    price.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    price.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Dark mode toggle
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Currency converter
const convertCurrency = async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('conversion-result');

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = amount * rate;
        resultDiv.innerHTML = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultDiv.innerHTML = 'Valyuta kursini olishda xatolik';
    }
};

// Chat widget
const chatWidget = document.querySelector('.chat-widget');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const closeChat = document.querySelector('.close-chat');

let chatOpen = false;

const toggleChat = () => {
    chatWidget.style.display = chatOpen ? 'none' : 'block';
    chatOpen = !chatOpen;
};

const sendMessage = () => {
    const message = chatInput.value.trim();
    if (message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <p class="user-message">${message}</p>
            <p class="bot-message">Tez orada siz bilan bog'lanamiz</p>
        `;
        chatMessages.appendChild(messageDiv);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
};

chatButton.addEventListener('click', sendMessage);
closeChat.addEventListener('click', toggleChat);

// Image gallery modal
const images = document.querySelectorAll('.destination-card img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.querySelector('.close');

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Language selector
const languageSelect = document.getElementById('language');
const translations = {
    uz: {
        home: 'Asosiy',
        destinations: 'Manzillar',
        pricing: 'Narxlar',
        contact: 'Aloqa'
    },
    en: {
        home: 'Home',
        destinations: 'Destinations',
        pricing: 'Pricing',
        contact: 'Contact'
    },
    ru: {
        home: 'Главная',
        destinations: 'Направления',
        pricing: 'Цены',
        contact: 'Контакты'
    }
};

const changeLanguage = () => {
    const lang = languageSelect.value;
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[lang][key];
    });
};

languageSelect.addEventListener('change', changeLanguage);

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize features
document.getElementById('amount').addEventListener('input', convertCurrency);
document.getElementById('from-currency').addEventListener('change', convertCurrency);
document.getElementById('to-currency').addEventListener('change', convertCurrency);

// Translations object
const translationsLang = {
    uz: {
        'asosiy': 'Asosiy',
        'davlatlar': 'Davlatlar',
        'narxlar': 'Narxlar',
        'aloqa': 'Aloqa',
        'dunyo_boylab': 'Dunyo bo\'ylab sayohat qiling',
        'mashhur_manzillar': 'Mashhur manzillar',
        'narxi': 'Narxi:',
        'dan': 'dan'
    },
    ru: {
        'asosiy': 'Главная',
        'davlatlar': 'Страны',
        'narxlar': 'Цены',
        'aloqa': 'Контакты',
        'dunyo_boylab': 'Путешествуйте по миру',
        'mashhur_manzillar': 'Популярные направления',
        'narxi': 'Цена:',
        'dan': 'от'
    },
    en: {
        'asosiy': 'Home',
        'davlatlar': 'Countries',
        'narxlar': 'Prices',
        'aloqa': 'Contact',
        'dunyo_boylab': 'Travel Around the World',
        'mashhur_manzillar': 'Popular Destinations',
        'narxi': 'Price:',
        'dan': 'from'
    }
};

// Function to change language
function changeLanguageLang(lang) {
    // Save selected language to localStorage
    localStorage.setItem('selectedLanguage', lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // Update navigation links
    document.querySelector('a[href="#asosiy"]').textContent = translationsLang[lang].asosiy;
    document.querySelector('a[href="#davlatlar"]').textContent = translationsLang[lang].davlatlar;
    document.querySelector('a[href="#narxlar"]').textContent = translationsLang[lang].narxlar;
    document.querySelector('a[href="#aloqa"]').textContent = translationsLang[lang].aloqa;

    // Update main heading
    document.querySelector('.hero-content h1').textContent = translationsLang[lang].dunyo_boylab;
    
    // Update destinations section heading
    document.querySelector('#davlatlar h2').textContent = translationsLang[lang].mashhur_manzillar;

    // Update prices text
    document.querySelectorAll('.price').forEach(price => {
        const amount = price.textContent.match(/\d+\$/)[0];
        price.textContent = `${translationsLang[lang].narxi} ${amount} ${translationsLang[lang].dan}`;
    });
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'uz';
    changeLanguageLang(savedLanguage);
});
