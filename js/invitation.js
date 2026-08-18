// =============================================
// INVITATION.JS - Wedding Invitation Interactivity
// =============================================

// --- Countdown Timer ---
function updateCountdown() {
  const target = new Date('2026-12-20T09:00:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// --- Toast Notification ---
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// --- Copy Rekening ---
function copyText(text, msg) {
  navigator.clipboard.writeText(text).then(() => showToast(msg || 'Disalin!'));
}

// --- Music Button (decorative toggle) ---
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
let musicOn = false;
musicBtn.addEventListener('click', () => {
  musicOn = !musicOn;
  musicIcon.className = musicOn ? 'fa-solid fa-pause' : 'fa-solid fa-music';
  showToast(musicOn ? 'Musik diputar 🎵' : 'Musik dihentikan');
});

// --- Form Ucapan ---
const ucapanForm = document.getElementById('ucapan-form');
if (ucapanForm) {
  ucapanForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('ucapan-nama').value.trim();
    const pesan = document.getElementById('ucapan-pesan').value.trim();
    if (!nama || !pesan) return;
    const list = document.getElementById('message-list');
    const item = document.createElement('div');
    item.className = 'message-item';
    item.innerHTML = '<div class="message-sender">' + nama + '</div><div class="message-text">' + pesan + '</div>';
    list.prepend(item);
    ucapanForm.reset();
    showToast('Ucapan terkirim! Terima kasih 💛');
  });
}

// --- Form RSVP ---
const rsvpForm = document.getElementById('rsvp-form');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const nama = document.getElementById('rsvp-nama').value.trim();
    const hadir = document.querySelector('input[name="hadir"]:checked');
    if (!nama || !hadir) return;
    const msg = hadir.value === 'hadir'
      ? nama + ' - Terima kasih sudah mengkonfirmasi kehadiran! 🎉'
      : nama + ' - Terima kasih atas konfirmasinya. Doa dan restu Anda sangat berarti. 💛';
    showToast(msg);
    rsvpForm.reset();
  });
}
