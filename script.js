// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: sent through Netlify Forms. If that isn't available (e.g. opened locally),
// fall back to opening the visitor's email app with the details filled in.
const CONTACT_EMAIL = 'kf.fulfilment@outlook.com';
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

function openEmailApp(data) {
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Company: ${data.get('company') || '-'}`,
    `Orders per month: ${data.get('volume')}`,
    '',
    data.get('message') || '',
  ].join('\n');
  const subject = `Enquiry from ${data.get('company') || data.get('name')}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = 'Thanks! Your email app should open so you can send your enquiry.';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  note.textContent = 'Sending...';
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    note.textContent = "Thanks! We've got your enquiry and will be in touch soon.";
  } catch {
    openEmailApp(data);
  } finally {
    button.disabled = false;
  }
});
