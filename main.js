(() => {
  const WHATSAPP = '34643572491';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cabecera: fondo al hacer scroll + botón flotante de WhatsApp
  const header = document.querySelector('.site-header');
  const waFloat = document.querySelector('.wa-float');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    if (waFloat) waFloat.classList.toggle('show', y > window.innerHeight * 0.7);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');
  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  // Aparición al entrar en pantalla (con un pequeño escalonado entre hermanos)
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 4) * 80}ms`;
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // Partículas que suben, como burbujas bajo el agua
  if (!reduceMotion) {
    document.querySelectorAll('.particles').forEach((box) => {
      const count = window.innerWidth < 640 ? 14 : 26;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        const size = 2 + Math.random() * 5;
        p.style.width = p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.opacity = String(0.3 + Math.random() * 0.6);
        p.style.animationDuration = `${12 + Math.random() * 16}s`;
        p.style.animationDelay = `${-Math.random() * 24}s`;
        p.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
        box.appendChild(p);
      }
    });
  }

  // Formulario → WhatsApp con el mensaje ya escrito
  const form = document.getElementById('contact-form');
  if (form) {
    const select = form.elements.servicio;
    const errorBox = form.querySelector('.form-error');

    document.querySelectorAll('[data-servicio]').forEach((link) => {
      link.addEventListener('click', () => { select.value = link.dataset.servicio; });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const missing = ['nombre', 'negocio'].filter((k) => !String(data[k] || '').trim());
      ['nombre', 'negocio'].forEach((k) => form.elements[k].classList.toggle('invalid', missing.includes(k)));
      errorBox.hidden = missing.length === 0;
      if (missing.length) { form.elements[missing[0]].focus(); return; }

      const negocio = data.negocio.trim() + (data.localidad.trim() ? ` (${data.localidad.trim()})` : '');
      const lines = [
        `Hola, soy ${data.nombre.trim()}, de ${negocio}.`,
        `Me interesa: ${data.servicio}.`,
      ];
      if (data.mensaje.trim()) lines.push('', data.mensaje.trim());
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
    });

    form.addEventListener('input', (e) => {
      if (e.target.classList.contains('invalid') && e.target.value.trim()) e.target.classList.remove('invalid');
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
