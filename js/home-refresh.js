(function () {
  'use strict';

  const services = [
    ['Manned Guarding', 'Guards at your gates, reception and patrol points, with written duties and reporting procedures.', 'guard3-800.webp', 'manned-guarding'],
    ['CCTV Installation', 'Cover entrances, tills and stockrooms. Review footage and check cameras remotely with an internet connection.', 'nfence.jpg', 'cctv-installation'],
    ['Alarm Systems & Monitoring', 'Receive intrusion alerts on your phone. Add optional PRO Monitoring for operators to review supported alerts and contact the people named in your plan.', 'ajax.png', 'ajax-smart-alarms'],
    ['Access Control', 'Manage entry to your premises. Set staff permissions, cancel lost credentials and review access records.', 'access.webp', 'access-control'],
    ['Electric Fencing', 'Protect your boundary with an electric fence that raises an alert when it detects tampering.', 'electric fence install.jpg', 'electric-fencing'],
    ['Fire Alarm Systems', 'Fire detectors and alarms selected for your building, with testing and instructions for your staff.', 'Key visual - Ajax EN54 Line - black.png', 'commercial-fire-alarm-systems'],
    ['Risk Assessments', 'A paid assessment with a written report of security gaps and recommended fixes in priority order.', 'risksurvey.jpg', 'corporate-risk-audit']
  ];
  const tabs = document.querySelector('.service-tabs');
  const toggle = document.getElementById('service-toggle');
  let expanded = false;
  let selectedService = 0;
  const visibleServiceCount = () => expanded ? services.length : 4;

  function selectService(index) {
    selectedService = index;
    [...tabs.children].forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    const service = services[index];
    document.getElementById('service-panel').setAttribute('aria-labelledby', 'tab-' + index);
    document.getElementById('service-title').textContent = service[0];
    document.getElementById('service-copy').textContent = service[1];
    document.getElementById('service-img').src = '/urban-eye-assets/' + service[2];
    document.getElementById('service-img').classList.toggle('product-visual', index === 2 || index === 5);
    document.getElementById('service-img').classList.toggle('fire-visual', index === 5);
    document.getElementById('service-img').alt = service[0] + ' equipment and service';
    const link = document.getElementById('service-link');
    link.href = '/' + service[3] + '/';
    link.textContent = 'Explore ' + service[0].toLowerCase();
    document.getElementById('service-monitoring-link').hidden = index !== 2;
  }

  services.forEach((service, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'service-tab';
    button.setAttribute('role', 'tab');
    button.id = 'tab-' + index;
    button.setAttribute('aria-controls', 'service-panel');
    button.hidden = index >= 4;
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    const arrow = document.createElement('i');
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(number, document.createTextNode(service[0]), arrow);
    button.onclick = () => selectService(index);
    button.onpointerenter = event => {
      if (event.pointerType === 'mouse') selectService(index);
    };
    button.onfocus = () => selectService(index);
    button.onkeydown = event => {
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const count = visibleServiceCount();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 :
        (index + (event.key === 'ArrowDown' ? 1 : count - 1)) % count;
      tabs.children[next].focus();
    };
    tabs.append(button);
  });
  toggle.onclick = () => {
    expanded = !expanded;
    [...tabs.children].forEach((button, index) => { button.hidden = index >= visibleServiceCount(); });
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Show fewer services' : 'Show all services';
    if (!expanded && selectedService >= 4) selectService(0);
  };
  selectService(0);

  const sectors = [
    ['Commercial Buildings & Offices', 'Manage staff and visitor access.', 'Guarding, cameras and access control for reception, shared spaces and restricted rooms.', ['Visitor entry', 'Staff permissions', 'Reception cameras', 'Guarding procedures'], 'nairobi-commercial-tower.webp', 'office-security', 'Explore office security'],
    ['Warehouses', 'Cover loading bays and stock areas.', 'Monitor deliveries, vehicle entry and storage aisles with cameras, access control and guarding.', ['Loading-bay cameras', 'Vehicle entry control', 'Storage-area coverage', 'Perimeter alerts'], 'warehouse.jpg', 'warehouse-security', 'Explore warehouse security'],
    ['Shops & Retail', 'Keep an eye on tills and stock.', 'Cameras and alarms for entrances, sales floors and stockrooms, with access control for staff areas.', ['Entrance cameras', 'Till and stockroom cameras', 'Intrusion alerts', 'Staff access control'], 'retail.webp', 'retail-storefronts', 'Explore retail security'],
    ['Construction Sites', 'Protect tools and materials on site.', 'Plan guarding, entry checks and cameras around working hours and changes to your site layout.', ['Guard patrol planning', 'Contractor access', 'Materials-area cameras', 'After-hours alerts'], 'construction-security.webp', 'construction-site-security', 'Explore site security'],
    ['Homes & Residential Properties', 'Check your home when you are away.', 'Security for homes, estates, Airbnb and short-stay properties. Manage guest access and check cameras in permitted external or shared areas.', ['Perimeter protection', 'Photo options for private homes', 'Remote camera access', 'Guest and gate access'], 'nairobi-residential-estate.webp', 'residential-security', 'Explore residential security']
  ];
  const sectorTabs = document.querySelector('.sector-tabs');

  function chooseSector(index) {
    const sector = sectors[index];
    [...sectorTabs.children].forEach((button, i) => {
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
    });
    document.getElementById('sector-panel').setAttribute('aria-labelledby', 'sector-tab-' + index);
    document.getElementById('sector-label').textContent = sector[0];
    document.getElementById('sector-title').textContent = sector[1];
    document.getElementById('sector-description').textContent = sector[2];
    document.getElementById('sector-benefits').replaceChildren(...sector[3].map(text => {
      const item = document.createElement('li');
      item.textContent = text;
      return item;
    }));
    document.getElementById('sector-image').src = '/urban-eye-assets/' + sector[4];
    document.getElementById('sector-image').alt = sector[0] + ' property';
    document.getElementById('sector-link').href = '/' + sector[5] + '/';
    document.getElementById('sector-link').textContent = sector[6];
    document.querySelector('.sector-count').textContent = String(index + 1).padStart(2, '0') + ' / ' + String(sectors.length).padStart(2, '0');
  }

  sectors.forEach((sector, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'sector-tab';
    button.id = 'sector-tab-' + index;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'sector-panel');
    const number = document.createElement('small');
    number.textContent = String(index + 1).padStart(2, '0');
    button.append(number, document.createTextNode(sector[0]));
    button.onpointerenter = event => { if (event.pointerType === 'mouse') chooseSector(index); };
    button.onfocus = () => chooseSector(index);
    button.onclick = () => chooseSector(index);
    button.onkeydown = event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % sectors.length;
      if (event.key === 'ArrowLeft') next = (index + sectors.length - 1) % sectors.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = sectors.length - 1;
      if (next !== undefined) { event.preventDefault(); sectorTabs.children[next].focus(); }
    };
    sectorTabs.append(button);
  });
  chooseSector(0);

  // Use the connected survey drawer, with a contact-page fallback while it loads.
  document.querySelectorAll('[data-survey]').forEach(link => link.addEventListener('click', event => {
    if (typeof window.openServiceDrawer === 'function' && document.getElementById('drawer')) {
      event.preventDefault();
      window.openServiceDrawer('homepage', 'Free Site Survey', 'Book a Free Site Survey', 'Share a few property details and Urban Eye will schedule a free site survey.');
    }
  }));
})();
