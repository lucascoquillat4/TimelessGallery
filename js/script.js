//--START SWIPER.js--//
var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
    });
//--END SWIPER.js--//


//--START MODAL EXCHANGE BUTTON--//
document.addEventListener('DOMContentLoaded', function() {
const modal = document.getElementById('exchangeModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModalBtn');
const exchangeForm = document.querySelector('.exchange-form');

openBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
});

closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    setTimeout(() => modal.style.display = 'none', 300);
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeBtn.click();
    }
});

exchangeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const person = document.getElementById('personSelect').value;
    const card = document.getElementById('cardSelect').value;
    console.log('Échange proposé :', { person, card });
    closeBtn.click();
});
});
//--END MODAL EXCHANGE BUTTON--//


//--START MODAL CONNEXION BUTTON--//
document.addEventListener('DOMContentLoaded', function() {
const loginModal = document.getElementById('loginModal');
const accountBtn = document.getElementById('accountBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');

//récupére l'email stocké au chargement de la page
const savedEmail = localStorage.getItem('userEmail');
if (savedEmail) {
    emailInput.value = savedEmail;
}

//stocke l'email dans le localStorage à chaque modification
emailInput.addEventListener('input', function(e) {
    localStorage.setItem('userEmail', e.target.value);
});

//ouvre le modal de connexion
accountBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
    setTimeout(() => loginModal.classList.add('active'), 10);
});

//ferme le modal de connexion
closeLoginBtn.addEventListener('click', function() {
    loginModal.classList.remove('active');
    setTimeout(() => loginModal.style.display = 'none', 300);
});

//ferme en cliquant en dehors du modal
window.addEventListener('click', function(event) {
    if (event.target === loginModal) {
        closeLoginBtn.click();
    }
});

//gestion du formulaire
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        email: emailInput.value,
        pseudo: document.getElementById('pseudo').value,
        password: document.getElementById('password').value
    };
    console.log('Données de connexion :', formData);
    closeLoginBtn.click();
});
});


document.addEventListener('DOMContentLoaded', function() {

    const profileModal = document.getElementById('profileModal');
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const accountBtn = document.getElementById('accountBtn');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

//check si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        const userData = JSON.parse(localStorage.getItem('userData'));
        accountBtn.textContent = userData.pseudo;
    }

//gére la soumission du formulaire de connexion
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
//mémoire des données de l'utilisateur
        const userData = {
            email: document.getElementById('email').value,
            pseudo: document.getElementById('pseudo').value
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
//ferme le popup de connexion et met à jour le bouton du compte
        document.getElementById('closeLoginBtn').click();
        accountBtn.textContent = userData.pseudo;
    });

//gére le clic sur le bouton du compte
    accountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (localStorage.getItem('isLoggedIn') === 'true') {
            showProfileModal();
        } else {
            showLoginModal();
        }
    });

//ferme le popup de profil
    closeProfileBtn.addEventListener('click', function() {
        profileModal.classList.remove('active');
        setTimeout(() => profileModal.style.display = 'none', 300);
    });

//gére la déconnexion
    logoutBtn.addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        accountBtn.textContent = 'Account';
        closeProfileBtn.click();
    });

    function showProfileModal() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        document.getElementById('profileEmail').textContent = userData.email;
        document.getElementById('profilePseudo').textContent = userData.pseudo;
        profileModal.style.display = 'flex';
        setTimeout(() => profileModal.classList.add('active'), 10);
    }

    function showLoginModal() {
        loginModal.style.display = 'flex';
        setTimeout(() => loginModal.classList.add('active'), 10);
    }

//ferme le popup en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            closeProfileBtn.click();
        }
    });
});
//--END MODAL CONNEXION BUTTON--//


//--START CONTACT SECTION--//
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        pseudo: document.getElementById('contactPseudo').value,
        object: document.getElementById('contactObject').value,
        message: document.getElementById('contactMessage').value
    };
    
    console.log('Formulaire de contact soumis:', formData);

    this.reset();
    alert('Message envoyé avec succès!');
});
//--END CONTACT SECTION--//