'use babel';

export default class ZigzagCard {

  constructor(card) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('zigzag');

    // Create Card element
    const container = document.createElement('div');
    container.classList.add('card');

    // Create Title Element
    const title = document.createElement('h3');
    title.textContent = card.title;
    title.classList.add('card-title');

    // Create ZigZag Source Element
    const source = document.createElement('p');
    source.textContent = card.source;
    source.classList.add('zigzag-source')

    container.appendChild(title)
    container.appendChild(source)

    this.element.appendChild(container);

  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
