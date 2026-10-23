(() => {
  const mobile = window.matchMedia('(max-width: 760px)');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-plan-row]').forEach((row, index) => {
    const cards = Array.from(row.children).filter(card => card.matches('article'));
    if (cards.length < 2) return;
    row.id ||= `plan-row-${index + 1}`;
    row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Compare plans. Swipe or use the previous and next buttons.');
    const controls = document.createElement('div');
    controls.className = 'plan-row-controls';
    controls.innerHTML = '<span class="plan-row-hint">Swipe to compare</span><div class="plan-row-dots"></div><div class="plan-row-nav"><button type="button" aria-label="Previous plan">&#8592;</button><span class="plan-row-position" aria-live="polite" aria-atomic="true"></span><button type="button" aria-label="Next plan">&#8594;</button></div>';
    row.before(controls);
    const dots = controls.querySelector('.plan-row-dots');
    const [previous, next] = controls.querySelectorAll('.plan-row-nav button');
    const position = controls.querySelector('.plan-row-position');
    let active = 0;
    const select = i => {
      const target = Math.max(0, Math.min(cards.length - 1, i));
      row.scrollTo({left: cards[target].offsetLeft - cards[0].offsetLeft, behavior: reduced.matches ? 'instant' : 'smooth'});
    };
    cards.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Show ${card.querySelector('h3')?.textContent.trim() || `plan ${i + 1}`}`);
      dot.setAttribute('aria-controls', row.id);
      dot.addEventListener('click', () => select(i));
      dots.append(dot);
    });
    [previous, next].forEach(button => button.setAttribute('aria-controls', row.id));
    previous.addEventListener('click', () => select(active - 1));
    next.addEventListener('click', () => select(active + 1));
    row.addEventListener('keydown', event => {
      if (!mobile.matches || event.target !== row) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    const update = () => {
      if (!row.clientWidth) return; // A package category can be hidden by its tabs.
      const start = cards[0].offsetLeft;
      active = cards.reduce((best, card, i) => Math.abs(card.offsetLeft - start - row.scrollLeft) < Math.abs(cards[best].offsetLeft - start - row.scrollLeft) ? i : best, 0);
      if (row.scrollWidth > row.clientWidth && row.scrollLeft >= row.scrollWidth - row.clientWidth - 3) active = cards.length - 1;
      previous.disabled = active === 0;
      next.disabled = active === cards.length - 1;
      position.textContent = `${active + 1} / ${cards.length}`;
      Array.from(dots.children).forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
    };
    let scheduled = false;
    row.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; update(); });
    }, {passive: true});
    const disclosureLayout = () => {
      row.querySelectorAll('.plan-equipment-toggle').forEach(detail => { detail.open = !mobile.matches; });
      update();
    };
    mobile.addEventListener('change', disclosureLayout);
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(update).observe(row);
    disclosureLayout();
  });
})();
