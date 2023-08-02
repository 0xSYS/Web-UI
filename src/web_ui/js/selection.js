/*
Component: Selection div elelent initialisations
Date created: 01.08.2023
Original source: https://github.com/Simonwep/selection
Original author: Simonwep
Date created (original): ...
Modified: yes
*/
import SelectionArea from './viselect.mjs';

[
    ['.boxes.red', 100]
].forEach(([selector, items]) => {
    const container = document.querySelector(selector);

    for (let i = 0; i < items; i++) {
        container.appendChild(document.createElement('div')).innerHTML += 'This text is in each div and it repets for 100 times';
        //container.innerHTML += 'Hello, I am Arun';
    }
});

const selection = new SelectionArea({
    selectables: ['.boxes > div'],
    boundaries: ['.boxes']
}).on('start', ({store, event}) => {
    if (!event.ctrlKey && !event.metaKey) {

        for (const el of store.stored) {
            el.classList.remove('selected');
        }

        selection.clearSelection();
    }
}).on('move', ({store: {changed: {added, removed}}}) => {
    for (const el of added) {
        el.classList.add('selected');
    }

    for (const el of removed) {
        el.classList.remove('selected');
    }
});

// Prevent flickering
document.body.style.display = 'unset';

// Log version
console.log(`Using Viselect v${SelectionArea.version}`);