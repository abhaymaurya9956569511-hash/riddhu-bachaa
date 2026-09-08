// ========== CONFIG ==========
// Change this name for personalization
const DEFAULT_NAME = "Riddhuu";
const CUSTOM_MESSAGE = `Happy Birthday meri jaan <b>Riddhuu</b>! ❤️<br><br>
14 September – aaj ka din sirf tumhara hai.<br><br>
Tumhare saath guzra har pal itna special hai ki dil bhar aata hai. Tumhari muskaan, tumhari baatein, aur tumhara pyaar… sab kuch meri duniya hai.<br><br>
Tumhare liye dua hai ki zindagi hamesha khushiyon se bhari rahe, har sapna pura ho, aur main hamesha tumhare saath rahoon.<br><br>
I love you so much ❤️<br>
Hamesha tumhara...`;

// ========== NAME PERSONALIZATION ==========
function getNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('name') || DEFAULT_NAME;
}

document.getElementById('birthdayName').textContent = getNameFromURL();
document.getElementById('wishMessage').innerHTML = CUSTOM_MESSAGE;

// ========== BALLOONS ==========
const balloonColors = [
    '#ff6b9d', '#ffd166', '#4ecdc4', '#a78bfa', 
    '#f472b6', '#60a5fa', '#34d399', '#fb7185'
];

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.animationDuration = (8 + Math.random() * 8) + 's';
    balloon.style.animationDelay = Math.random() * 5 + 's';
    balloon.style.width = (40 + Math.random() * 40) + 'px';
    balloon.style.height = (55 + Math.random() * 40) + 'px';
    document.getElementById('balloons').appendChild(balloon);

    // Remove after animation
    setTimeout(() => balloon.remove(), 16000);
}

// Create initial balloons and keep adding
for (let i = 0; i < 12; i++) {
    setTimeout(createBalloon, i * 400);
}
setInterval(createBalloon, 1200);

// ========== FALLING PETALS / FLOWERS ==========
function createPetal() {
    const petal = document.createElement('div');
    petal.className = Math.random() > 0.6 ? 'petal flower' : 'petal';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (5 + Math.random() * 7) + 's';
    petal.style.animationDelay = Math.random() * 2 + 's';
    petal.style.opacity = 0.5 + Math.random() * 0.5;
    
    // Random colors for petals
    if (!petal.classList.contains('flower')) {
        const hues = ['#ff6b9d', '#ff9a9e', '#fad0c4', '#ffd166', '#c084fc'];
        petal.style.background = hues[Math.floor(Math.random() * hues.length)];
    }
    
    document.getElementById('petals').appendChild(petal);
    setTimeout(() => petal.remove(), 14000);
}

for (let i = 0; i < 15; i++) {
    setTimeout(createPetal, i * 300);
}
setInterval(createPetal, 400);

// ========== MUSIC ==========
const music = document.getElementById('bgMusic');
const playBtn = document.getElementById('playMusic');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        playBtn.textContent = '🎵 Play Special Song';
        isPlaying = false;
    } else {
        music.play().then(() => {
            playBtn.textContent = '⏸️ Pause Song';
            isPlaying = true;
        }).catch(err => {
            alert('Song play nahi ho raha. Please "birthday-song.mp3" file add karo folder me (jo song aapne bataya hai usko convert karke daalo), ya browser autoplay block kar raha hai.');
            console.log(err);
        });
    }
});

// ========== BLOW CANDLES ==========
const blowBtn = document.getElementById('blowCandles');
const flames = document.querySelectorAll('.flame');

blowBtn.addEventListener('click', () => {
    flames.forEach(flame => {
        flame.classList.add('off');
    });
    
    // Confetti burst effect
    createConfettiBurst();
    
    blowBtn.textContent = '✨ Candles Blown!';
    blowBtn.disabled = true;
    
    // Optional: re-light after 5 seconds
    setTimeout(() => {
        flames.forEach(flame => flame.classList.remove('off'));
        blowBtn.textContent = '💨 Blow Candles';
        blowBtn.disabled = false;
    }, 5000);
});

// ========== CONFETTI BURST ==========
function createConfettiBurst() {
    const colors = ['#ff6b9d', '#ffd166', '#4ecdc4', '#a78bfa', '#fb7185', '#60a5fa'];
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = (6 + Math.random() * 8) + 'px';
        confetti.style.height = (6 + Math.random() * 8) + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.zIndex = '100';
        confetti.style.pointerEvents = 'none';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 80 + Math.random() * 120;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 50;
        
        document.body.appendChild(confetti);
        
        let x = 0, y = 0, opacity = 1;
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02;
            vy += 3; // gravity
            opacity -= 0.015;
            
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${x*2}deg)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        requestAnimationFrame(animate);
    }
}

// ========== STAR PARTICLES (optional background sparkle) ==========
function createStar() {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.width = '3px';
    star.style.height = '3px';
    star.style.background = '#fff';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.opacity = Math.random() * 0.8;
    star.style.zIndex = '0';
    star.style.pointerEvents = 'none';
    star.style.boxShadow = '0 0 6px #fff';
    document.getElementById('particles').appendChild(star);
    
    // Twinkle
    setInterval(() => {
        star.style.opacity = 0.2 + Math.random() * 0.8;
    }, 1000 + Math.random() * 2000);
}

for (let i = 0; i < 40; i++) {
    createStar();
}

console.log('🎉 Birthday website loaded successfully!');
