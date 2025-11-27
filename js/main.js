// Translations and UI behavior
const translations = {
  pt: {
    hero_h1: "Protegemos o que é seu, 24 horas por dia, há mais de 20 anos.",
    hero_sub: "Sistemas de segurança eletrónica com certificação oficial. Durma descansado sabendo que a Alarmaroubo vigia por si.",
    services_title: "Nossas Soluções",
    about_title: "Sobre a Alarmaroubo",
    btn_sim: "Pedir Simulação Agora"
  },
  en: {
    hero_h1: "Protecting what is yours, 24/7, for over 20 years.",
    hero_sub: "Officially certified electronic security systems. Sleep soundly knowing Alarmaroubo is watching over you.",
    services_title: "Our Solutions",
    about_title: "About Alarmaroubo",
    btn_sim: "Get a Free Quote"
  },
  es: {
    hero_h1: "Protegemos lo que es suyo, 24 horas al día, desde hace 20 años.",
    hero_sub: "Sistemas de seguridad electrónica certificados. Duerma tranquilo sabiendo que Alarmaroubo vigila por usted.",
    services_title: "Nuestras Soluciones",
    about_title: "Sobre Alarmaroubo",
    btn_sim: "Solicitar Presupuesto"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Language buttons
  document.querySelectorAll('.lang').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLanguage(btn.dataset.lang);
    });
  });

  // Form mock behaviour
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.btn-submit');
    const originalText = btn ? btn.innerText : 'Enviando...';
    if(btn){ btn.innerText = 'Enviando...'; btn.style.opacity = '0.7'; }
    setTimeout(() => {
      alert('Obrigado! O seu pedido foi recebido. Um técnico entrará em contacto brevemente.');
      form.reset();
      if(btn){ btn.innerText = originalText; btn.style.opacity = '1'; }
    }, 1500);
  };

  document.getElementById('hero-lead-form')?.addEventListener('submit', handleForm);
  document.getElementById('footer-contact-form')?.addEventListener('submit', handleForm);

  // Duplicate testimonials for infinite scroll
  const track = document.querySelector('.testimonials-track');
  if(track) {
    const children = Array.from(track.children);
    if(children.length > 3) {
      children.forEach(node => { const clone = node.cloneNode(true); track.appendChild(clone); });
    }
  }

  ensureImageFallbacks();
  const activeBtn = document.querySelector('.lang.active');
  applyLanguage(activeBtn?.dataset.lang || 'pt');
});

function applyLanguage(lang='pt'){
  const t = translations[lang] || translations.pt;
  document.querySelectorAll('[data-i18n-key]').forEach(el => {
    const key = el.dataset.i18nKey;
    if(key === 'hero'){
      const h1 = el.querySelector('h1');
      const sub = el.querySelector('.subheadline');
      if(h1) h1.textContent = t.hero_h1;
      if(sub) sub.textContent = t.hero_sub;
    } else if(t[key]){
      el.textContent = t[key];
    }
  });
  const submitBtn = document.querySelector('#hero-lead-form .btn-submit');
  if(submitBtn) submitBtn.textContent = t.btn_sim;
  document.documentElement.lang = lang;
}

function ensureImageFallbacks(){
  const placeholder = 'https://via.placeholder.com/200x80?text=Imagem+em+falta';
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      if(img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = '1';
      img.src = placeholder;
      img.alt = img.alt || 'Imagem em falta';
    });
    if(img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)){
      img.src = placeholder;
    }
  });
}
