// ===== Levanche business details — edit here, updates every page =====
window.LEVANCHE = {
  legalName: "Levanche Trading",
  crNumber: "257568",
  ecomLicence: "",          // MoCI e-commerce licence number
  phone: "+974 5519 5747",              // e.g. "+974 5555 5555"
  whatsapp: "97455195747",          // digits only, e.g. "97455555555"
  email: "Levanchetrading@gmail.com",             // e.g. "care@levanche.qa"
  address: "Doha, State of Qatar"
};
(function(){
  const L = window.LEVANCHE;
  document.querySelectorAll('[data-info]').forEach(el => {
    const v = L[el.dataset.info];
    if (v) { el.textContent = v; }
    else { el.textContent = 'To be added'; el.classList.add('missing'); }
  });
})();
