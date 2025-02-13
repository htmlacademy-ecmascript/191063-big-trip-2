import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import { render, replace } from '../framework/render';

export default class PointPresenter {
  #pointListContainer = null;
  #tripDestinations = null;
  #tripOffers = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor ({pointListContainer, tripDestinations, tripOffers}) {
    this.#pointListContainer = pointListContainer;
    this.#tripDestinations = tripDestinations;
    this.#tripOffers = tripOffers;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onEditClick: this.#handleEditClickOnCard,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: this.#handleEditClickOnForm,
    });

    render(this.#pointComponent, this.#pointListContainer);
  }

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  }

  #handleEditClickOnCard = () => {
    this.#replaceCardToForm();
  };

  #handleEditClickOnForm = () => {
    this.#replaceFormToCard();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
