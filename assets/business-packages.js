/* Enhance category links; without JavaScript every package remains available. */
(() => {
  const contactForm = document.getElementById('contact-step-form');
  if (contactForm) {
    const packages = {
      'essential-retail': 'Essential Retail',
      'storefront-guardian': 'Storefront Guardian',
      'office-access-plans': 'Office Access Plans',
      'warehouse-protection-plan': 'Warehouse Protection Plan',
      'site-equipment-purchase': 'Site Equipment Purchase',
      'managed-site-lease': 'Managed Site Lease',
      'commercial-fire-detection': 'Commercial Fire Detection'
    };
    const slug = new URLSearchParams(location.search).get('package');
    if (Object.hasOwn(packages, slug)) {
      const interest = document.getElementById('contactServiceInterest');
      const context = document.getElementById('contact-package-context');
      interest.value = packages[slug];
      context.textContent = `Selected plan: ${packages[slug]}`;
      context.hidden = false;
    }
  }
  const root = document.querySelector('.bp-selector');
  if (!root) return;
  const nav = root.querySelector('.bp-tabs');
  const tabs = [...root.querySelectorAll('[data-package-tab]')];
  const panels = [...root.querySelectorAll('.bp-panel')];
  if (!nav || tabs.length !== panels.length) return;

  function tabForHash() {
    const id = location.hash.slice(1);
    return tabs.find(tab => tab.hash.slice(1) === id);
  }

  function select(tab, updateHash = false, focus = false) {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }
    if (updateHash) history.replaceState(null, '', tab.hash);
    if (focus) tab.focus();
  }

  nav.setAttribute('role', 'tablist');
  for (const tab of tabs) {
    const panel = document.getElementById(tab.hash.slice(1));
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', event => {
      event.preventDefault();
      select(tab, true);
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'package_category_selected', { package_category: panel.id });
      }
    });
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let index = tabs.indexOf(tab);
      if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[index], true, true);
    });
  }
  select(tabForHash() || tabs[0]);
  window.addEventListener('hashchange', () => {
    const tab = tabForHash();
    if (tab) select(tab);
  });

  document.querySelectorAll('[data-package]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'package_enquiry_started', { package_name: link.dataset.package });
      }
    });
  });
})();
