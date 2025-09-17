console.log('Loading portfolio JavaScript...');
var mobileMenuButton = document.getElementById('mobile-menu-btn');
var mobileNavMenu = document.getElementById('mobile-nav-menu');
var allNavLinks = document.querySelectorAll('.mobile-navigation a, .desktop-nav a');
var allSections = document.querySelectorAll('section[id$="-section"]');
console.log('Found', allNavLinks.length, 'navigation links');
console.log('Found', allSections.length, 'sections');
function toggleMobileMenu() {
    console.log('Mobile menu button was clicked!');
    if (mobileNavMenu.classList.contains('active')) {
        mobileNavMenu.classList.remove('active');
        console.log('Mobile menu closed');
    } else {
        mobileNavMenu.classList.add('active');
        console.log('Mobile menu opened');
    }
}
if (mobileMenuButton && mobileNavMenu) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    console.log('Mobile menu button event listener added');
} else {
    console.log('ERROR: Could not find mobile menu elements!');
}
function closeMobileMenuOnLinkClick() {
    console.log('A navigation link was clicked');
    if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
        mobileNavMenu.classList.remove('active');
        console.log('Mobile menu closed after clicking nav link');
    }
}
for (var i = 0; i < allNavLinks.length; i++) {
    allNavLinks[i].addEventListener('click', closeMobileMenuOnLinkClick);
}
console.log('Navigation link event listeners added');
function closeMenuOnOutsideClick(event) {
    if (!mobileNavMenu) { return }
    var clickedInsideMenu = mobileNavMenu.contains(event.target);
    var clickedMenuButton = mobileMenuButton && mobileMenuButton.contains(event.target);
    if (!clickedInsideMenu && !clickedMenuButton && mobileNavMenu.classList.contains('active')) {
        mobileNavMenu.classList.remove('active');
        console.log('Mobile menu closed because user clicked outside');
    }
}
document.addEventListener('click', closeMenuOnOutsideClick);
console.log('Outside click event listener added');
function closeMenuOnEscapeKey(event) {
    if (event.key === 'Escape') {
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
            console.log('Mobile menu closed with Escape key');
        }
    }
}
document.addEventListener('keydown', closeMenuOnEscapeKey);
console.log('Escape key event listener added');
function handleSmoothScrolling(event) {
    var linkHref = this.getAttribute('href');
    console.log('Trying to scroll to:', linkHref);
    if (linkHref && linkHref.startsWith('#') && linkHref.length > 1) {
        event.preventDefault();
        var targetSection = document.querySelector(linkHref);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('Smooth scrolled to section:', linkHref);
            if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
                mobileNavMenu.classList.remove('active');
                console.log('Mobile menu closed after smooth scroll');
            }
        } else {
            console.log('ERROR: Could not find section:', linkHref);
        }
    }
}
var internalLinks = document.querySelectorAll('a[href^="#"]');
for (var j = 0; j < internalLinks.length; j++) {
    internalLinks[j].addEventListener('click', handleSmoothScrolling);
}
console.log('Smooth scrolling event listeners added to', internalLinks.length, 'links');
function highlightCurrentSection() {
    var windowHeight = window.innerHeight;
    var middleOfScreen = windowHeight / 2;
    var currentActiveSection = null;
    for (var k = 0; k < allSections.length; k++) {
        var section = allSections[k];
        var sectionPosition = section.getBoundingClientRect();
        if (sectionPosition.top <= middleOfScreen && sectionPosition.bottom >= middleOfScreen) {
            currentActiveSection = section.getAttribute('id');
            break;
        }
    }
    if (currentActiveSection) {
        console.log('Current active section:', currentActiveSection);
        for (var l = 0; l < allNavLinks.length; l++) {
            allNavLinks[l].classList.remove('active');
        }
        var currentNavLink = document.querySelector('a[href="#' + currentActiveSection + '"]');
        if (currentNavLink) {
            currentNavLink.classList.add('active');
            console.log('Navigation updated for section:', currentActiveSection);
        }
    }
}
window.addEventListener('scroll', highlightCurrentSection);
console.log('Scroll event listener added for navigation highlighting');
window.addEventListener('load', function () {
    console.log('Page loaded, updating navigation');
    highlightCurrentSection();
});
console.log('Portfolio JavaScript file loaded successfully! ');
