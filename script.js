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

// Contact form: no backend yet, so open the visitor's email app with the details filled in.
const CONTACT_EMAIL = 'kf.fulfilment@outlook.com';
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
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
  document.getElementById('form-note').textContent = 'Thanks! Your email app should open so you can send your enquiry.';
});
