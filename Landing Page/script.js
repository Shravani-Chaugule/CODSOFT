console.log('Loading Spotify  JavaScript...');
var mobileToggleBtn = document.getElementById('mobile-toggle');
var navigationMenu = document.getElementById('navigation-menu');
console.log('Found mobile toggle button:', mobileToggleBtn);
console.log('Found navigation menu:', navigationMenu);
function toggleMobileMenu() {
    console.log('Mobile menu toggle clicked!');
    if (navigationMenu.classList.contains('open')) {
        navigationMenu.classList.remove('open');
        console.log('Mobile menu closed');
    } else {
        navigationMenu.classList.add('open');
        console.log('Mobile menu opened');
    }
}
if (mobileToggleBtn && navigationMenu) {
    mobileToggleBtn.addEventListener('click', toggleMobileMenu);
    console.log('Mobile menu event listener added');
} else {
    console.log('ERROR: Could not find mobile menu elements!');
}
var allNavLinks = document.querySelectorAll('.nav-links a');
function closeMenuOnLinkClick() {
    console.log('Navigation link was clicked');
    if (navigationMenu && navigationMenu.classList.contains('open')) {
        navigationMenu.classList.remove('open');
        console.log('Mobile menu closed after link click');
    }
}
for (var i = 0; i < allNavLinks.length; i++) {
    allNavLinks[i].addEventListener('click', closeMenuOnLinkClick);
}
console.log('Added click listeners to', allNavLinks.length, 'navigation links');
var homeSection = document.getElementById('home');
var aboutSection = document.getElementById('about');
var featuresSection = document.getElementById('features');
var contactSection = document.getElementById('contact');
console.log('Found sections:', homeSection, aboutSection, featuresSection, contactSection);
function updateActiveNavigation() {
    var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    console.log('Current scroll position:', currentScrollPosition);

    for (var i = 0; i < allNavLinks.length; i++) {
        allNavLinks[i].classList.remove('active');
    }
    var homeTop = homeSection ? homeSection.offsetTop - 80 : 0;
    var featuresTop = featuresSection ? featuresSection.offsetTop - 80 : 999999;
    var aboutTop = aboutSection ? aboutSection.offsetTop - 80 : 999999;
    var contactTop = contactSection ? contactSection.offsetTop - 80 : 999999;

    if (currentScrollPosition >= homeTop && currentScrollPosition < featuresTop) {
        var homeLink = document.querySelector('a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
            console.log('Home section is active');
        }
    } else if (currentScrollPosition >= featuresTop && currentScrollPosition < aboutTop) {
        var featuresLink = document.querySelector('a[href="#features"]');
        if (featuresLink) {
            featuresLink.classList.add('active');
            console.log('Features section is active');
        }
    } else if (currentScrollPosition >= aboutTop && currentScrollPosition < contactTop) {
        var aboutLink = document.querySelector('a[href="#about"]');
        if (aboutLink) {
            aboutLink.classList.add('active');
            console.log('About section is active');
        }
    } else if (currentScrollPosition >= contactTop) {
        var contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) {
            contactLink.classList.add('active');
            console.log('Contact section is active');
        }
    }
}

window.addEventListener('DOMContentLoaded', updateActiveNavigation); // ensures it runs after DOM is built
window.addEventListener('resize', updateActiveNavigation); // ensures it runs after DOM is built
window.addEventListener('scroll', updateActiveNavigation);
window.addEventListener('load', updateActiveNavigation);
console.log('Scroll event listeners added for navigation highlighting');
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    var targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log('Smooth scroll initiated to:', sectionId);
    } else {
        console.log('ERROR: Could not find section:', sectionId);
    }
}
var contactForm = document.getElementById('contact-form');
console.log('Found contact form:', contactForm);
function handleFormSubmission(event) {
    event.preventDefault();
    console.log('Contact form submitted');
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var messageInput = document.getElementById('message');
    var statusDiv = document.getElementById('form-message');
    var nameValue = nameInput.value.trim();
    var emailValue = emailInput.value.trim();
    var messageValue = messageInput.value.trim();
    console.log('Form data - Name:', nameValue, 'Email:', emailValue, 'Message length:', messageValue.length);
    if (nameValue === '') {
        statusDiv.textContent = 'Please enter your name.';
        statusDiv.className = 'status-message error-msg';
        console.log('Validation failed: name is empty');
        return;
    }
    if (emailValue === '') {
        statusDiv.textContent = 'Please enter your email address.';
        statusDiv.className = 'status-message error-msg';
        console.log('Validation failed: email is empty');
        return;
    }
    if (emailValue.indexOf('@') === -1 || emailValue.indexOf('.') === -1) {
        statusDiv.textContent = 'Please enter a valid email address.';
        statusDiv.className = 'status-message error-msg';
        console.log('Validation failed: email format invalid');
        return;
    }
    if (messageValue === '') {
        statusDiv.textContent = 'Please enter a message.';
        statusDiv.className = 'status-message error-msg';
        console.log('Validation failed: message is empty');
        return;
    }
    if (messageValue.length < 10) {
        statusDiv.textContent = 'Please enter a longer message (at least 10 characters).';
        statusDiv.className = 'status-message error-msg';
        console.log('Validation failed: message too short');
        return;
    }
    statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
    statusDiv.className = 'status-message success-msg';
    console.log('Form validation passed! Message sent successfully');
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    setTimeout(function () {
        statusDiv.textContent = '';
        statusDiv.className = 'status-message';
        console.log('Success message cleared after timeout');
    }, 5000);
}
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmission);
    console.log('Contact form submission handler added');
} else {
    console.log('ERROR: Contact form not found!');
}
console.log('Spotify JavaScript loaded successfully!');
