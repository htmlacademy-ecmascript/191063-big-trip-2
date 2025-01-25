import { createElement } from '../render.js';

function createEventListLoadingTemplate() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class EventListLoadingView {
  getTemplate() {
    return createEventListLoadingTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
