'use babel';

export default class ZigzagCard {

  constructor(card, attrs) {
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
    const bodyCopy = document.createElement('p');
    bodyCopy.textContent = card.bodyCopy;
    bodyCopy.classList.add('zigzag-body-copy')

    // Create ZigZag Source Element
    const source = document.createElement('p');
    source.textContent = card.source;
    source.classList.add('zigzag-source')

    container.appendChild(title)
    // container.appendChild(source)
    // container.appendChild(bodyCopy)
    //
    const footer = document.createElement('footer');
    footer.textContent = `${attrs.cardCount}/20`
    container.appendChild(footer)

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
