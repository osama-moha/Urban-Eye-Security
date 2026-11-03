const hikvisionRange = document.querySelector('#range-2');
const hikvisionFilter = document.querySelector('#hikvision-filter');
const hikvisionGrid = hikvisionRange.querySelector('.trade-grid');
const moreProducts = document.querySelector('#hikvision-more');
const types = new Set();
let visibleLimit = 24;

for (const [type, title, model, source] of hikvisionCatalogue) {
  const card = document.querySelector('#hikvision-card').content.firstElementChild.cloneNode(true);
  card.dataset.type = type;
  card.querySelector('h3').textContent = `Hikvision ${model}`;
  const lens = model.match(/\((\d+(?:\.\d+)?)mm\)/i);
  card.querySelector('.trade-spec').textContent = lens && !title.includes(lens[0])
    ? `${title} · ${lens[1]} mm lens`
    : title;
  card.querySelector('a').href = source;
  hikvisionGrid.append(card);
  types.add(type);
}

for (const type of [...types].sort()) {
  hikvisionFilter.add(new Option(type, type));
}
document.querySelector('#hikvision-filter-label').hidden = false;

const search = document.querySelector('#trade-search');
const ranges = [...document.querySelectorAll('section[id^="range-"]')];
const cards = [...document.querySelectorAll('.trade-card')];
const quoteItems = document.querySelector('#quote-items');
const quoteStatus = document.querySelector('#quote-status');
const equipmentList = document.querySelector('#equipment-list');
const quoteLink = document.querySelector('.trade-quote-link');
const quoteCount = document.querySelector('#quote-count');

document.querySelector('.trade-search').hidden = false;
document.querySelector('#quote-builder').hidden = false;

function filterCatalogue() {
  const terms = search.value.trim().toLowerCase().split(/\s+/);
  const type = hikvisionFilter.value;
  let matches = 0;
  let hikvisionMatches = 0;

  for (const range of ranges) {
    let rangeMatches = 0;
    for (const card of range.querySelectorAll('.trade-card')) {
      const description = `${card.dataset.type || ''} ${card.textContent}`.toLowerCase();
      const typeMatches = range !== hikvisionRange || !type || card.dataset.type === type;
      const matchesQuery = typeMatches && terms.every(term => description.includes(term));
      rangeMatches += Number(matchesQuery);
      card.hidden = !matchesQuery || (range === hikvisionRange && rangeMatches > visibleLimit);
    }
    if (range === hikvisionRange) hikvisionMatches = rangeMatches;
    range.hidden = range !== hikvisionRange && rangeMatches === 0;
    matches += rangeMatches;
  }

  moreProducts.hidden = hikvisionMatches <= visibleLimit;
  document.querySelector('#hikvision-count').textContent = hikvisionMatches
    ? `Showing ${Math.min(visibleLimit, hikvisionMatches)} of ${hikvisionMatches} Hikvision models`
    : 'No Hikvision models match these filters.';
  document.querySelector('#trade-results').textContent = search.value.trim()
    ? `${matches} products match your search`
    : '';
}

for (const control of [search, hikvisionFilter]) {
  control.addEventListener('input', () => {
    visibleLimit = 24;
    filterCatalogue();
  });
}
moreProducts.addEventListener('click', () => {
  const hiddenCards = [...hikvisionGrid.children].filter(card => card.hidden);
  visibleLimit += 24;
  filterCatalogue();
  hiddenCards.find(card => !card.hidden)?.querySelector('a').focus();
});
filterCatalogue();

function updateQuote() {
  const rows = [...quoteItems.children];
  equipmentList.value = rows.map(row => {
    const quantity = row.querySelector('input').value;
    return `${quantity} × ${row.dataset.product}`;
  }).join('\n');

  quoteLink.hidden = rows.length === 0;
  quoteCount.textContent = `(${rows.length})`;
  quoteStatus.textContent = rows.length
    ? `${rows.length} products in your quote list.`
    : 'Add products above or describe your requirements below.';
}

for (const card of cards) {
  const addButton = card.querySelector('.trade-add');
  const product = card.querySelector('h3').textContent;
  let row;

  addButton.hidden = false;
  addButton.setAttribute('aria-label', `Add ${product} to quote`);
  addButton.addEventListener('click', () => {
    if (row) {
      const quantity = row.querySelector('input');
      quantity.value = Number(quantity.value) + 1;
    } else {
      row = document.createElement('li');
      row.dataset.product = product;

      const label = document.createElement('label');
      label.textContent = product;
      const quantity = document.createElement('input');
      quantity.type = 'number';
      quantity.min = '1';
      quantity.step = '1';
      quantity.value = '1';
      quantity.required = true;
      quantity.setAttribute('aria-label', `Quantity for ${product}`);
      quantity.setAttribute('form', 'trade-quote-form');
      quantity.addEventListener('input', updateQuote);
      label.append(quantity);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${product}`);
      remove.addEventListener('click', () => {
        const nextButton = row.nextElementSibling?.querySelector('button')
          ?? row.previousElementSibling?.querySelector('button')
          ?? document.querySelector('#trade-quote-form input[name="name"]');
        row.remove();
        row = undefined;
        updateQuote();
        nextButton.focus();
      });

      row.append(label, remove);
      quoteItems.append(row);
    }
    updateQuote();
    quoteStatus.textContent = `${product} quantity in quote: ${row.querySelector('input').value}.`;
  });
}
