// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================

// Fecha de inicio de la relación (EDITABLE)
const startDate = new Date('2025-10-30T00:00:00');

// Página actual
let currentPage = 1;
const totalPages = 5;

// ==========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    createPetals();
    updateCounter();
    setInterval(updateCounter, 1000);
    updateNavigation();
    loadPhotos();
    loadSavedMessage();
});

// ==========================================
// LLUVIA DE PÉTALOS
// ==========================================

function createPetals() {
    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 10 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(petal);
    }
}

// ==========================================
// APERTURA DEL LIBRO
// ==========================================

document.getElementById('bookCover').addEventListener('click', function() {
    this.classList.add('opened');
    setTimeout(() => {
        this.style.display = 'none';
    }, 1500);
});

// ==========================================
// CONTADOR DE TIEMPO EN VIVO
// ==========================================

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 25));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    const counterElement = document.getElementById('timeCounter');
    if (counterElement) {
        counterElement.textContent = `${days} días, ${hours} horas y ${minutes} minutos`;
    }
}

// ==========================================
// NAVEGACIÓN ENTRE PÁGINAS
// ==========================================

function changePage(direction) {
    const newPage = currentPage + direction;
    
    if (newPage < 1 || newPage > totalPages) return;
    
    // Ocultar página actual
    const currentPageElement = document.querySelector('.page.active');
    currentPageElement.classList.remove('active');
    
    // Mostrar nueva página
    currentPage = newPage;
    const newPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    newPageElement.classList.add('active');
    
    // Actualizar navegación
    updateNavigation();
    
    // Si es la página 2 (carta), iniciar efecto máquina de escribir
    if (currentPage === 2) {
        startTypeWriter();
    }
    
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageIndicator = document.getElementById('pageIndicator');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pageIndicator.textContent = `${currentPage}/${totalPages}`;
}

// ==========================================
// EFECTO MÁQUINA DE ESCRIBIR (CARTA)
// ==========================================

// TEXTO DE LA CARTA (EDITABLE - Puedes cambiar este texto)
const letterContent = `Amochi:

Ya pasaron 30 días desde el día que nos hicimos noviecitos hermosos… pero no los siento. Siento que te conozco desde hace mucho más tiempo, siento que estuviste escondida en alguna parte de mi vida esperando el momento justo para aparecer. Porque cada segundo con vos es un regalo, mi vida. Te juro que no quiero hacer otra cosa que estar toda mi vida con vos.

30 días de novios, pero… hace más de 4 meses que hablamos y, aunque ya te lo dije, te lo vuelvo a decir: no me arrepiento de absolutamente nada de lo que hice para poder estar con vos. Estar con vos, hacerte reír, es lo más lindo que tengo. Ver cómo te cagás de risa por las boludeces que digo me hace inmensamente feliz.

También quiero pedirte perdón por no poder llenar siempre las expectativas que tenés, mi amor. Sé que no soy el mejor ni el más “apto” para vos, pero te prometo que cada día trato de ser un poquito mejor solo para ver una sonrisa en tu cara hermosa. Quiero que nunca me sueltes la mano, ni que te conformes, princesa, porque vos te merecés lo mejor del mundo y yo me voy a romper el alma para dártelo.

Gracias por elegirme todos los días, por hacerme sentir tan amado, tan cuidado, tan especial. En un mundo tan de mierda, vos sos lo más lindo que existe… y lo tengo yo. Te juro que no existen palabras para describir lo mucho que te amo.

Este regalo lo hice pensando en vos, en nosotros, en todo lo que vivimos y en todo lo que todavía nos falta por vivir juntos. Espero que te saque aunque sea la mitad de la sonrisa que vos me sacás a mí todos los días.

Te amo más de lo que cualquier palabra puede expresar, Amochi. 

Feliz primer mes… de los miles que vienen ♡`;

let letterIndex = 0;
let isTyping = false;

function startTypeWriter() {
    if (isTyping) return;
    
    const letterElement = document.getElementById('letterText');
    letterElement.textContent = '';
    letterIndex = 0;
    isTyping = true;
    
    typeWriter();
}

function typeWriter() {
    const letterElement = document.getElementById('letterText');
    
    if (letterIndex < letterContent.length) {
        letterElement.textContent += letterContent.charAt(letterIndex);
        letterIndex++;
        setTimeout(typeWriter, 30);
    } else {
        isTyping = false;
    }
}

// ==========================================
// GALERÍA DE FOTOS
// ==========================================

function loadPhotos() {
    const photoGrid = document.getElementById('photoGrid');
    
    // Información de las fotos (EDITABLE - Cambia los títulos)
    const photos = [
        { src: 'fotos1.jpg', caption: '' },
        { src: 'fotos2.jpg', caption: '' },
        { src: 'fotos3.jpg', caption: '' },
        { src: 'fotos4.jpg', caption: '' },
        { src: 'fotos5.jpg', caption: '' },
        { src: 'fotos6.jpg', caption: '' }
    ];
    
    photos.forEach((photo, index) => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        
        const img = document.createElement('img');
        // Imagen placeholder si no existe el archivo
        img.src = photo.src;
        img.alt = photo.caption;
        img.onerror = function() {
            this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23${getRandomColor()}' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23fff'%3EFoto ${index + 1}%3C/text%3E%3C/svg%3E`;
        };
        
        const caption = document.createElement('div');
        caption.className = 'photo-caption';
        caption.textContent = photo.caption;
        
        frame.appendChild(img);
        frame.appendChild(caption);
        photoGrid.appendChild(frame);
    });
}

function getRandomColor() {
    const colors = ['ff69b4', 'ff1493', 'c71585', '8b4789', '6b2d5c'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ==========================================
// RULETA DE VALES ROMÁNTICOS
// ==========================================

// VALES ROMÁNTICOS (EDITABLE - Puedes agregar o cambiar vales)
const vales = [
    "💋 Un super besote de 30 segundos",
    "🤗 Un abrazo de oso de 2 minutos completos",
    "🍝 Una cena super romántica preparada por mí (cuando se pueda obvio)",
    "💆 Masajito de espalda de 15 minutos",
    "🎬 Maratón de tu serie favorita con snacks incluidos",
    "🌹 Desayuno en la cama cuando quieras",
    "📸 Sesión de fotos juntos en el lugar que elijas",
    "🎮 Jugamos lo que vos quieras (y puede que te deje ganar)",
    "💌 Una carta de amor escrita a mano (putamai)",
    "🏃 Hago el mandado o tarea que me pidas",
    "🎵 Te canto la canción que quieras (remilputamai)",
    "🧁 Hornear galletas o postre juntos",
    "🎨 Día de manualidades o arte juntos",
    "☕ Una salida al café que vos elijas (cuando haya plata e)",
    "🌙 Noche de películas con todo preparado por mí"
];

let spinning = false;
let usedVales = [];

document.getElementById('wheel').addEventListener('click', function() {
    if (spinning) return;
    
    spinning = true;
    const wheel = this;
    
    // Resetear vales si ya se usaron todos
    if (usedVales.length >= vales.length) {
        usedVales = [];
    }
    
    // Animación de giro
    const rotations = 5 + Math.random() * 5;
    const degrees = rotations * 360 + Math.random() * 360;
    
    wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheel.style.transform = `rotate(${degrees}deg)`;
    
    // Mostrar resultado
    setTimeout(() => {
        // Seleccionar vale aleatorio que no se haya usado
        let randomVale;
        do {
            randomVale = vales[Math.floor(Math.random() * vales.length)];
        } while (usedVales.includes(randomVale) && usedVales.length < vales.length);
        
        usedVales.push(randomVale);
        
        document.getElementById('valeResult').textContent = randomVale;
        
        spinning = false;
        wheel.style.transition = 'none';
        wheel.style.transform = `rotate(${degrees % 360}deg)`;
    }, 4000);
});

// ==========================================
// GUARDAR MENSAJE DE AMOR
// ==========================================

function saveMessage() {
    const textarea = document.getElementById('messageTextarea');
    const message = textarea.value.trim();
    
    if (message === '') {
        alert('¡Escribe algo primero! 💕');
        return;
    }
    
    // Guardar en localStorage
    const messageData = {
        text: message,
        date: new Date().toISOString()
    };
    
    localStorage.setItem('paulaMessage', JSON.stringify(messageData));
    
    // Mostrar confirmación
    const savedMsg = document.getElementById('savedMessage');
    savedMsg.style.display = 'block';
    
    setTimeout(() => {
        savedMsg.style.display = 'none';
    }, 3000);
    
    // Mostrar mensaje guardado
    displaySavedMessage();
}

function loadSavedMessage() {
    displaySavedMessage();
}

function displaySavedMessage() {
    const stored = localStorage.getItem('paulaMessage');
    const displayDiv = document.getElementById('displayMessage');
    
    if (stored) {
        const messageData = JSON.parse(stored);
        const date = new Date(messageData.date);
        
        displayDiv.innerHTML = `
            <div style="background: linear-gradient(135deg, #ffe4e1, #ffb6c1); padding: 25px; border-radius: 15px; border-left: 5px solid #ff69b4;">
                <h3 style="font-family: 'Dancing Script', cursive; color: #6b2d5c; margin-bottom: 15px; font-size: 1.5rem;">
                    💌 Mensaje guardado de Amochi
                </h3>
                <p style="color: #333; line-height: 1.8; font-size: 1.1rem; margin-bottom: 10px;">
                    ${messageData.text}
                </p>
                <p style="color: #666; font-size: 0.9rem; font-style: italic;">
                    Guardado el ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}
                </p>
            </div>
        `;
    }
}

// ==========================================
// CONTROL DE MÚSICA DE FONDO (OPCIONAL)
// ==========================================

// Puedes agregar música de fondo aquí si lo deseas
const musicControl = document.getElementById('musicControl');
let backgroundMusic = null;
let isMuted = true;

musicControl.addEventListener('click', function() {
    if (!backgroundMusic) {
        // Crear elemento de audio para música de fondo (opcional)
        backgroundMusic = new Audio('musica-fondo.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3;
    }
    
    if (isMuted) {
        backgroundMusic.play().catch(e => console.log('No se pudo reproducir la música de fondo'));
        this.classList.remove('muted');
        isMuted = false;
    } else {
        backgroundMusic.pause();
        this.classList.add('muted');
        isMuted = true;
    }
});

// Iniciar con música silenciada
musicControl.classList.add('muted');