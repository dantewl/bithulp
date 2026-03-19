// BitHulp - Main JavaScript

// Mobile menu toggle
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.getElementById('navLinks');
  if (navLinks && !navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// Chatbot toggle
function openChat() {
  const box = document.getElementById('chatbotBox');
  if (box) {
    box.classList.toggle('open');
    if (box.classList.contains('open')) {
      document.getElementById('chatInput').focus();
    }
  }
}

// Simple chatbot responses
const botResponses = {
  'whatsapp': 'Voor hulp met WhatsApp: ga naar onze dienstenpagina voor een stap-voor-stap uitleg!',
  'digid': 'DigiD is uw digitale identiteit. Wij helpen u graag bij het instellen. Bel ons op 06-12345678.',
  'facebook': 'Voor uitleg over Facebook hebben wij een duidelijke handleiding. Bekijk onze dienstenpagina!',
  'wachtwoord': 'Een goed wachtwoord heeft minimaal 8 tekens. Gebruik letters, cijfers en symbolen.',
  'installeren': 'Wij helpen u bij het installeren van apps. Neem contact op via het formulier of bel ons!',
  'help': 'Ik kan u helpen met vragen over WhatsApp, DigiD, Facebook, wachtwoorden en meer. Wat wilt u weten?',
  'contact': 'U kunt ons bereiken via telefoon: 06-12345678 of e-mail: info@bithulp.nl',
  'default': 'Bedankt voor uw vraag! Voor persoonlijke hulp kunt u ons bellen op 06-12345678 of het contactformulier invullen.'
};

function sendChat() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!input || !messages) return;
  
  const text = input.value.trim();
  if (!text) return;

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'user-msg';
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  // Find bot response
  const lowerText = text.toLowerCase();
  let response = botResponses.default;
  for (const [key, value] of Object.entries(botResponses)) {
    if (lowerText.includes(key)) {
      response = value;
      break;
    }
  }

  // Add bot response after short delay
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-msg';
    botMsg.textContent = response;
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 600);

  input.value = '';
  messages.scrollTop = messages.scrollHeight;
}

// Allow pressing Enter to send chat
document.addEventListener('keydown', function(e) {
  const chatInput = document.getElementById('chatInput');
  if (e.key === 'Enter' && document.activeElement === chatInput) {
    sendChat();
  }
});

// Contact form validation
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', function(e) {
    const naam = document.getElementById('naam');
    const email = document.getElementById('email');
    const bericht = document.getElementById('bericht');
    
    if (!naam.value || !email.value || !bericht.value) {
      e.preventDefault();
      alert('Vul alstublieft alle verplichte velden in.');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      e.preventDefault();
      alert('Voer een geldig e-mailadres in.');
      return;
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log('BitHulp website geladen!');
