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
    window.scrollTo({ top: 0 });
});

// Fungsi kontrol musik
function playMusic() {
    if (!isPlaying) {
        audio.play().catch(e => console.log("Playback failed:", e));
        audio.loop = true;
        isPlaying = true;
        playPauseBtn.classList.add('playing');
        // musicStatus.textContent = 'Musik Diputar';
    }
}

playPauseBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
        playPauseBtn.classList.remove('playing');
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
const eventChoiceSelect = document.getElementById('eventChoice');
let submittedRsvp = false;
let submittedWishes = false;

statusRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        const isAttending = radio.value === 'Yes, I will attend';
        
        if (isAttending) {
            guestCountGroup.style.display = 'block';
            guestCountInput.value = '1'; // Reset ke 1 saat memilih hadir
            // Show event choice only if type is Closed AND user is attending
            if (invitationType === 'Closed' && eventChoiceGroup) {
                if (eventChoiceSelect) {
                    eventChoiceSelect.value = ''; // Reset pilihan acara ke default
                }
                eventChoiceGroup.style.display = 'block';
            }
        } else {
            guestCountGroup.style.display = 'none';
            guestCountInput.value = '0'; // Atur ke 0 saat tidak bisa hadir
            // Always hide event choice if not attending
            if (eventChoiceGroup) {
                eventChoiceGroup.style.display = 'none';
            }
            if (eventChoiceSelect) {
                eventChoiceSelect.value = '-'; // Set value to '-' if not attending
            }
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
        guestNameToElement.textContent = `Dear ${guestName},`;
    }
}

// Handle invitation type for reception visibility
const invitationType = urlParams.get('type');
const eventChoiceGroup = document.getElementById('eventChoiceGroup');
const weddingDinnerSection = document.getElementById('weddingDinnerSection');

// Show event choice dropdown only if the invitation type is 'Closed'
if (invitationType === 'Closed') {
    // Show Wedding Intimate Dinner section if type is 'Closed'
    if (weddingDinnerSection) {
        weddingDinnerSection.style.display = 'block';
    }
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
        gallery.innerHTML = `<p class="loading-text" style="color: red;"> ${error.message}</p>`;
    }
}

// Panggil fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadWishes);

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible'); // Add class when element is visible
        } else {
            entry.target.classList.remove('is-visible'); // Remove class when element is not visible
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

// Observe all elements with the .section class
document.addEventListener('DOMContentLoaded', () => {
    const animatedItems = document.querySelectorAll('.anim-item');
    animatedItems.forEach(item => {
        observer.observe(item);
    });
});

// --- Photo Album Lightbox/Slideshow ---
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    const albumPhotos = document.querySelectorAll('.photo-album .photo-item img');
    let currentImageIndex;

    if (!lightbox || !lightboxImg || !closeBtn || !prevBtn || !nextBtn) return;

    const showImage = (index) => {
        if (index >= albumPhotos.length) {
            currentImageIndex = 0; // Loop to start
        } else if (index < 0) {
            currentImageIndex = albumPhotos.length - 1; // Loop to end
        } else {
            currentImageIndex = index;
        }
        lightboxImg.src = albumPhotos[currentImageIndex].src;
    };

    albumPhotos.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            showImage(index);
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
