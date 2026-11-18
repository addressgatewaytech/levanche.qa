// ===== Levanche business details — edit here, updates every page =====
window.LEVANCHE = {
  legalName: "Levanche Trading",
  crNumber: "257568",
  ecomLicence: "",          // MoCI e-commerce licence number
  phone: "+974 5519 5747",
  whatsapp: "97455195747",  // digits only
  email: "Levanchetrading@gmail.com",
  address: "Doha, State of Qatar",
  facebook: "https://www.facebook.com/levanchetrading",
  instagram: "https://www.instagram.com/levanche.qa",
  tiktok: "https://www.tiktok.com/@levancheqa",
  youtube: "https://www.youtube.com/@levanche-s9e"
};
(function(){
  const L = window.LEVANCHE;
  document.querySelectorAll('[data-info]').forEach(el => {
    const v = L[el.dataset.info];
    if (v) { el.textContent = v; }
    else { el.textContent = 'To be added'; el.classList.add('missing'); }
  });

  // ---- Social media links (footer on every page + contact section on home) ----
  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1.1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1M12 0C8.7 0 8.3 0 7.1.1 5.8.1 4.9.3 4.1.6c-.8.3-1.5.7-2.1 1.4C1.3 2.6.9 3.3.6 4.1.3 4.9.1 5.8.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.1 1.3.3 2.2.6 2.9.3.8.7 1.5 1.4 2.1.7.7 1.3 1.1 2.1 1.4.8.3 1.6.5 2.9.6 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.2-.3 2.9-.6.8-.3 1.5-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.8.5-1.6.6-2.9.1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.2-.6-2.9-.3-.8-.7-1.5-1.4-2.1C21.4 1.3 20.7.9 19.9.6 19.1.3 18.2.1 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.6 0h-4v16.2a3.4 3.4 0 1 1-3.4-3.4c.3 0 .7 0 1 .1V8.8a7.5 7.5 0 1 0 6.4 7.4V8a9.7 9.7 0 0 0 5.6 1.8v-4A5.6 5.6 0 0 1 16.6 0z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2l-.5-.2z"/></svg>'
  };
  const links = [
    ['instagram', L.instagram, 'Instagram @levanche.qa'],
    ['facebook', L.facebook, 'Facebook'],
    ['tiktok', L.tiktok, 'TikTok @levancheqa'],
    ['youtube', L.youtube, 'YouTube'],
    ['whatsapp', L.whatsapp ? 'https://wa.me/' + L.whatsapp : '', 'WhatsApp']
  ].filter(l => l[1]);
  const html = links.map(([k, url, label]) =>
    `<a class="soc" href="${url}" target="_blank" rel="noopener" aria-label="${label}" title="${label}">${ICONS[k]}</a>`).join('');

  const css = document.createElement('style');
  css.textContent = `
    .socials{display:flex;gap:12px;margin-top:16px;flex-wrap:wrap}
    .socials.center{justify-content:center;margin-top:22px}
    .soc{width:42px;height:42px;border-radius:50%;display:inline-flex !important;align-items:center;justify-content:center;margin:0 !important;
      background:linear-gradient(180deg,#2a2016,#0f0b07);color:#f0d796;
      box-shadow:inset 0 0 0 2px #0f0b07,inset 0 0 0 3px #b48a45;transition:.3s}
    .soc svg{width:19px;height:19px}
    .soc:hover{color:#fff3cf;transform:translateY(-2px);box-shadow:inset 0 0 0 2px #0f0b07,inset 0 0 0 3px #e9cf93}
    .follow-label{font-family:'Cinzel',serif;color:#f0d796;font-size:12px;letter-spacing:.14em;margin:18px 0 0}`;
  document.head.appendChild(css);

  // Footer (all pages): under the brand / CR block
  document.querySelectorAll('.foot > div:first-child').forEach(col => {
    col.insertAdjacentHTML('beforeend', '<div class="follow-label">FOLLOW US</div><div class="socials">' + html + '</div>');
  });
  // Home page contact section
  const contact = document.querySelector('#contact .wrap');
  if (contact) contact.insertAdjacentHTML('beforeend', '<div class="socials center">' + html + '</div>');
})();
