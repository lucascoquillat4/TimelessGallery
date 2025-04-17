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
    const cardSelect = document.getElementById('cardSelect');

    // Fonction pour mettre à jour la liste des œuvres dans le modal
    function updateExchangeModal() {
        const collection = JSON.parse(localStorage.getItem('collection') || '[]');
        cardSelect.innerHTML = ''; // Vide la liste existante
        
        // Ajoute une option par défaut
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Sélectionnez une œuvre';
        cardSelect.appendChild(defaultOption);
        
        // Ajoute chaque œuvre de la collection
        collection.forEach(artwork => {
            const option = document.createElement('option');
            option.value = artwork.id;
            option.textContent = artwork.title;
            cardSelect.appendChild(option);
        });
    }

    openBtn.addEventListener('click', function() {
        // Vérifie si l'utilisateur est connecté
        if (!isLoggedIn()) {
            alert('Veuillez vous connecter pour proposer un échange');
            return;
        }

        // Vérifie si la collection n'est pas vide
        const collection = JSON.parse(localStorage.getItem('collection') || '[]');
        if (collection.length === 0) {
            alert('Vous devez avoir des œuvres dans votre collection pour proposer un échange');
            return;
        }

        updateExchangeModal(); // Met à jour la liste des œuvres
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
        const cardId = cardSelect.value;
        
        // Trouve l'œuvre sélectionnée dans la collection
        const collection = JSON.parse(localStorage.getItem('collection') || '[]');
        const selectedArtwork = collection.find(artwork => artwork.id == cardId);

        if (selectedArtwork) {
            console.log('Échange proposé :', {
                person: person,
                artwork: selectedArtwork
            });
            alert(`Échange proposé : ${selectedArtwork.title} avec ${person}`);
        }
        
        closeBtn.click();
    });

    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe slide-in-right
    document.querySelectorAll('.slide-in-right').forEach(element => {
        observer.observe(element);
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

// Configuration de l'API Harvard Art Museums
const apiKey = 'f8d91983-f617-4667-9946-f1d6c3aba244';
const baseUrl = 'https://api.harvardartmuseums.org/object';

// Fonction pour charger les œuvres d'art
async function loadArtworks() {
    try {
        const params = new URLSearchParams({
            apikey: apiKey,
            classification: 'Paintings',
            size: 10, // Augmente le nombre d'œuvres pour plus de variété
            hasimage: 1,
            sort: 'random', // Ajoute le paramètre sort=random pour un ordre aléatoire
            q: '*', // Ajoute une recherche générale
            fields: 'primaryimageurl,title,dated'
        });

        const response = await fetch(`${baseUrl}?${params}`);
        const data = await response.json();
        
        // Mélanger le tableau des résultats
        const shuffledRecords = data.records.sort(() => Math.random() - 0.5);
        
        const artworkContainer = document.getElementById('artworkContainer');
        artworkContainer.innerHTML = '';

        // Limiter à 5 œuvres maximum
        const selectedArtworks = shuffledRecords.slice(0, 5);

        selectedArtworks.forEach(artwork => {
            if (artwork.primaryimageurl) {
                const slide = createArtworkSlide(artwork);
                artworkContainer.appendChild(slide);
            }
        });

        // Initialiser Swiper
        if (window.swiper) {
            window.swiper.destroy();
        }

        window.swiper = new Swiper('.mySwiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            on: {
                slideChange: function() {
                    const activeIndex = this.realIndex;
                    const currentArtwork = selectedArtworks[activeIndex];
                    
                    // Mettre à jour les informations
                    const infoDiv = document.querySelector('.artwork-info');
                    const addButton = document.querySelector('.add-collection-btn');
                    infoDiv.innerHTML = `
                        <h3>${currentArtwork.title}</h3>
                        <p>Date: ${currentArtwork.dated || 'Non Disponible'}</p>
                    `;

                    // Mettre à jour le onclick du bouton
                    addButton.onclick = () => addToCollection({
                        id: currentArtwork.id,
                        title: currentArtwork.title,
                        image: currentArtwork.primaryimageurl
                    });
                }
            }
        });

        // Afficher les informations initiales
        window.swiper.emit('slideChange');

    } catch (error) {
        console.error('Erreur lors du chargement des œuvres:', error);
    }
}

// Charger les œuvres au chargement de la page
document.addEventListener('DOMContentLoaded', loadArtworks);

function createArtworkSlide(artwork) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    slide.innerHTML = `
        <div class="slide-content">
            <img src="${artwork.primaryimageurl}" alt="${artwork.title}">
        </div>
    `;

    return slide;
}

// Dark Mode
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = darkModeToggle.querySelector('.icon');
    const darkModeText = darkModeToggle.querySelector('.text');
    
    // Vérifier la préférence enregistrée
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Appliquer le mode initial
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeIcon.textContent = '🌙';
        darkModeText.textContent = 'sombre';
    }
    
    // Gérer le click sur le bouton
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        
        // Mettre à jour l'icône et le texte
        darkModeIcon.textContent = isNowDark ? '🌙' : '☀️';
        darkModeText.textContent = isNowDark ? 'sombre' : 'clair';
        
        // Sauvegarder la préférence
        localStorage.setItem('darkMode', isNowDark);
    });
});

function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

document.addEventListener('DOMContentLoaded', () => {
    const accountBtn = document.getElementById('accountBtn');
    const loginModal = document.getElementById('loginModal');
    const profileModal = document.getElementById('profileModal');

    // Mettre à jour le texte du bouton compte
    function updateAccountButton() {
        accountBtn.textContent = isLoggedIn() ? 'Mon Compte' : 'Connexion';
    }

    // Gérer le clic sur le bouton compte
    accountBtn.addEventListener('click', () => {
        if (isLoggedIn()) {
            profileModal.style.display = 'flex';
        } else {
            loginModal.style.display = 'flex';
        }
        updateCollectionDisplay();
    });

    // Mettre à jour l'interface après connexion
    function handleLogin(username) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        updateAccountButton();
        loginModal.style.display = 'none';
        // Optionnel : afficher directement le profil
        profileModal.style.display = 'flex';
    }

    // Gérer la déconnexion
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        updateAccountButton();
        profileModal.style.display = 'none';
    });

    // Initialiser l'état du bouton au chargement
    updateAccountButton();
});



//testtestetstestst
// Ajouter ceci au début du fichier
let collection = JSON.parse(localStorage.getItem('collection') || '[]');

function updateCollection() {
    const collectionDiv = document.getElementById('collection');
    collectionDiv.innerHTML = '';

    collection.forEach(artwork => {
        const card = document.createElement('div');
        card.className = 'artwork-card';
        card.innerHTML = `
            <img src="${artwork.image}" alt="${artwork.title}">
            <h3>${artwork.title}</h3>
            <button onclick="removeFromCollection(${artwork.id})">Retirer</button>
        `;
        collectionDiv.appendChild(card);
    });
}
// remove de la collection
function removeFromCollection(artworkId) {
    collection = collection.filter(item => item.id !== artworkId);
    localStorage.setItem('collection', JSON.stringify(collection));
    updateCollection();
}

// chargement de la page
document.addEventListener('DOMContentLoaded', updateCollection);

function addToCollection(artwork) {
    // Récupérer la collection existante ou créer un tableau vide
    let collection = JSON.parse(localStorage.getItem('collection') || '[]');
    
    // Vérifier si l'œuvre n'est pas déjà dans la collection
    if (!collection.find(item => item.id === artwork.id)) {
        collection.push(artwork);
        localStorage.setItem('collection', JSON.stringify(collection));
        alert('Œuvre ajoutée à votre collection !');
        // Mettre à jour l'affichage si le modal de profil est ouvert
        updateCollectionDisplay();
    } else {
        alert('Cette œuvre est déjà dans votre collection !');
    }
}

function updateCollectionDisplay() {
    const collectionDiv = document.getElementById('collection');
    if (!collectionDiv) return;

    const collection = JSON.parse(localStorage.getItem('collection') || '[]');
    collectionDiv.innerHTML = collection.map(artwork => `
        <div class="artwork-card">
            <img src="${artwork.image}" alt="${artwork.title}">
            <h3>${artwork.title}</h3>
            <p>${artwork.artist}</p>
            <button onclick="removeFromCollection(${artwork.id})">Retirer</button>
        </div>
    `).join('');
}

//--START BOOSTER--//
document.addEventListener('DOMContentLoaded', function() {
    const boosterBtn = document.getElementById('boosterBtn');
    const timerText = document.getElementById('boosterTimer');

    function checkBoosterAvailability() {
        const lastBoosterTime = localStorage.getItem('lastBoosterTime');
        const now = new Date().getTime();
        const cooldownPeriod = 600000; // 24 heures en millisecondes

        if (lastBoosterTime) {
            const timeElapsed = now - parseInt(lastBoosterTime);
            if (timeElapsed < cooldownPeriod) {
                const timeRemaining = cooldownPeriod - timeElapsed;
                const hoursRemaining = Math.floor(timeRemaining / (60 * 60 * 1000));
                const minutesRemaining = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
                
                boosterBtn.disabled = true;
                timerText.textContent = `Prochain booster disponible dans ${hoursRemaining}h ${minutesRemaining}m`;
                return false;
            }
        }
        
        boosterBtn.disabled = false;
        timerText.textContent = 'Booster disponible !';
        return true;
    }

    async function openBooster() {
        try {
            const params = new URLSearchParams({
                apikey: apiKey,
                classification: 'Paintings',
                size: 20,
                hasimage: 1,
                sort: 'random'
            });

            const response = await fetch(`${baseUrl}?${params}`);
            const data = await response.json();
            
            // Sélectionner 5 œuvres aléatoires
            const randomArtworks = data.records
                .filter(artwork => artwork.primaryimageurl)
                .sort(() => Math.random() - 0.5)
                .slice(0, 5);

            // Ajouter à la collection
            let collection = JSON.parse(localStorage.getItem('collection') || '[]');
            randomArtworks.forEach(artwork => {
                collection.push({
                    id: artwork.id,
                    title: artwork.title,
                    image: artwork.primaryimageurl
                });
            });
            
            localStorage.setItem('collection', JSON.stringify(collection));
            localStorage.setItem('lastBoosterTime', new Date().getTime().toString());

            // Afficher un message de succès
            alert('Félicitations ! 5 nouvelles œuvres ont été ajoutées à votre collection !');
            
            // Mettre à jour le timer
            checkBoosterAvailability();
            
            // Mettre à jour l'affichage de la collection si le profil est ouvert
            updateCollectionDisplay();

        } catch (error) {
            console.error('Erreur lors de l\'ouverture du booster:', error);
            alert('Une erreur est survenue lors de l\'ouverture du booster.');
        }
    }

    boosterBtn.addEventListener('click', function() {
        if (!localStorage.getItem('isLoggedIn')) {
            alert('Veuillez vous connecter pour ouvrir un booster !');
            return;
        }
        openBooster();
    });

    // Vérifier la disponibilité du booster toutes les minutes
    checkBoosterAvailability();
    setInterval(checkBoosterAvailability, 60000);
});
//--END BOOSTER FUNCTIONALITY--//