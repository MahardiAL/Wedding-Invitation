// Cover page animation
const coverPage = document.getElementById('coverPage');
const openBtn = document.getElementById('openBtn');
const mainContent = document.getElementById('mainContent');
const playPauseBtn = document.getElementById('playPauseBtn');
// const musicStatus = document.getElementById('musicStatus'); // Element does not exist, commented out.

// Musik (menggunakan data URL untuk demo)
const musicDataUrl = "background_song.mp3";                
const audio = new Audio(musicDataUrl);
let isPlaying = false;

openBtn.addEventListener('click', () => {
    coverPage.classList.add('open');
    setTimeout(() => {
        mainContent.classList.add('visible');
        playMusic()
    }, 600);
});

// Carousel functionality
const carouselContainer = document.getElementById('carouselContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const totalSlides = 4;

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    carouselDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide
let autoSlideInterval = setInterval(nextSlide, 3000);

// Pause auto slide on interaction
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
});

// Dot navigation
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateCarousel();
    });
});

// Fungsi kontrol musik
function playMusic() {
    if (!isPlaying) {
        audio.play().catch(e => console.log("Playback failed:", e));
        audio.loop = true;
        isPlaying = true;
        playPauseBtn.textContent = '⏸';
        // musicStatus.textContent = 'Musik Diputar';
    }
}

playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.textContent = '▶';
        // musicStatus.textContent = 'Putar Musik';
    } else {
        playMusic();
    }
});
// Jeda musik saat tab tidak aktif
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        audio.pause();
    } else {
        if (isPlaying) {
            audio.play();
        }
    }
});
// Wishes form submission
const wishesForm = document.getElementById('wishesForm');
const wishesNameInput = document.getElementById('name');

wishesForm.addEventListener('submit', (e) => {
    // Set flag untuk iframe
    submittedWishes = true;
    // Tampilkan alert setelah jeda singkat agar form sempat terkirim
    setTimeout(() => {
        alert(`Terima kasih, ${wishesNameInput.value}! Ucapan Anda telah kami terima.`);
        wishesForm.reset();
        // Isi kembali nama dari URL jika ada
        if (guestName) {
            wishesNameInput.value = guestName;
        }
    }, 500);
});

// RSVP Form functionality
const rsvpForm = document.getElementById('rsvpForm');
const rsvpNameInput = document.getElementById('rsvpName');
const guestCountInput = document.getElementById('guestCount');
const guestCountGroup = document.getElementById('guestCountGroup');
const statusRadios = rsvpForm.querySelectorAll('input[name="entry.1413813021"]');
let submittedRsvp = false;
let submittedWishes = false;

statusRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'Yes, I will attend') {
            guestCountGroup.style.display = 'block';
            guestCountInput.value = '1'; // Reset ke 1 saat memilih hadir
        } else {
            guestCountGroup.style.display = 'none';
            guestCountInput.value = '0'; // Atur ke 0 saat tidak bisa hadir
        }
    });
});
rsvpForm.addEventListener('submit', () => {
    submittedRsvp = true;
});
// Mengambil parameter 'nama' dari URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
const guestNameToElement = document.getElementById('guestNameTo');

if (guestName) {
    rsvpNameInput.value = guestName;
    wishesNameInput.value = guestName;
    if (guestNameToElement) {
        guestNameToElement.textContent = `Dear ${guestName}`;
    }
}

// Handle invitation type for reception visibility
const invitationType = urlParams.get('type');
const receptionSection = document.getElementById('receptionSection');

// Hide reception section by default if the type is not 'Closed'
if (receptionSection && invitationType !== 'Closed') {
    receptionSection.style.display = 'none';
}

// Iframe untuk submit form tanpa refresh
const iframe = document.createElement('iframe');
iframe.name = 'hidden_iframe';
iframe.id = 'hidden_iframe';
iframe.style.display = 'none';
document.body.appendChild(iframe);

iframe.addEventListener('load', function() {
    if (submittedRsvp) {
        alert(`Terima kasih, ${rsvpNameInput.value}! Konfirmasi Anda telah kami terima.`);
        rsvpForm.reset();
        guestCountGroup.style.display = 'none';
        submittedRsvp = false;
    }
    if (submittedWishes) {
        submittedWishes = false; // Reset flag setelah alert dari wishesForm
    }
});

// Touch swipe for carousel (mobile)
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const minSwipeDistance = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > minSwipeDistance) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// Copy to clipboard functionality
const copyButton = document.getElementById('copyButton');
const accountNumber = document.getElementById('accountNumber');

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(accountNumber.innerText.replace(/\s/g, ''))
        .then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Number';
            }, 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
});
// Countdown Timer
const weddingDate = new Date("September 12, 2026 15:00:00").getTime();

const countdownFunction = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add leading zero if number is less than 10
    const format = (num) => num < 10 ? '0' + num : num;

    document.getElementById("days").innerText = format(days);
    document.getElementById("hours").innerText = format(hours);
    document.getElementById("minutes").innerText = format(minutes);
    document.getElementById("seconds").innerText = format(seconds);

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "The big day is here!";
        // Optionally style the final message
        document.getElementById("countdown").style.fontSize = "24px";
        document.getElementById("countdown").style.fontFamily = "'Playfair Display', serif";
        document.getElementById("countdown").style.color = "#d4af37";
    }
}, 1000);

/**
 * Converts a date string into a relative time string (e.g., "2 hours ago").
 * @param {string} dateString The date string to convert.
 * @returns {string} A string representing the relative time.
 */
function timeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return '';
    }

    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
        }
    }
    return 'just now';
}

// --- Fungsi untuk memuat dan menampilkan ucapan dari Google Sheet ---
async function loadWishes() {
    // Mengambil data dari file CSV lokal di dalam folder proyek
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSGhELhn-LywrYQeQXvlyUPYfmNpnD_397KIz9Rh8G082SPY3oDOOEE_Pl27_fwpXqOjKdhnnO7bopB/pub?gid=1016358324&single=true&output=csv';
    const gallery = document.getElementById('wishesGallery');
    gallery.innerHTML = '<p class="loading-text">Loading wishes...</p>'; // Tampilkan pesan loading

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok. Pastikan file CSV ada dan server lokal berjalan.`);
        }
        const csvData = await response.text();

        gallery.innerHTML = ''; // Hapus pesan loading

        // Memproses data CSV: hapus header, filter baris kosong, dan balik urutannya (terbaru dulu)
        const rows = csvData.split('\n').slice(1).filter(row => row.trim() !== '').reverse();

        if (rows.length === 0) {
            gallery.innerHTML = '<p class="loading-text">Be the first to leave a wish!</p>';
            return;
        }

        rows.forEach(row => {
            // Split baris CSV menjadi kolom. Regex ini menangani koma di dalam pesan yang diapit kutip.
            const columns = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];

            // Asumsi kolom: [0] Timestamp, [1] Nama, [2] Pesan
            // Membersihkan nilai dari kutip ganda yang mungkin ada
            const cleanValue = (str) => str ? str.trim().replace(/^"|"$/g, '').trim() : '';

            const timestamp = cleanValue(columns[0]);
            const name = cleanValue(columns[1]);
            const message = cleanValue(columns[2]);

            // Hanya tampilkan kartu jika ada nama dan pesan
            if (name && message) {
                const relativeTime = timeAgo(timestamp);
                const wishCard = document.createElement('div');
                wishCard.classList.add('wish-card');
                wishCard.innerHTML = `
                    <div class="wish-card-header">
                        <h3>${name}</h3>
                        <span class="timestamp">${relativeTime}</span>
                    </div>
                    <p>"${message}"</p>
                `;
                gallery.appendChild(wishCard);
            }
        });
    } catch (error) {
        console.error('Error loading wishes:', error);
        gallery.innerHTML = `<p class="loading-text" style="color: red;">Gagal memuat ucapan. ${error.message}</p>`;
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadWishes);
