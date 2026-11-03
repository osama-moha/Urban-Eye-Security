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

search.addEventListener('input', () => {
  const terms = search.value.trim().toLowerCase().split(/\s+/);
  let matches = 0;

  for (const range of ranges) {
    let rangeMatches = 0;
    for (const card of range.querySelectorAll('.trade-card')) {
      const description = card.textContent.toLowerCase();
      card.hidden = !terms.every(term => description.includes(term));
      rangeMatches += Number(!card.hidden);
    }
    range.hidden = rangeMatches === 0;
    matches += rangeMatches;
  }

  document.querySelector('#trade-results').textContent =
    matches ? `${matches} products found` : 'No matches. Try a brand or a shorter model number.';
});

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
