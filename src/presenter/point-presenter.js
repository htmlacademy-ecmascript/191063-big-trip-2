import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import { render, replace, remove } from '../framework/render';

export default class PointPresenter {
  #pointListContainer = null;
  #tripDestinations = null;
  #tripOffers = null;
  #handleDataChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;

  constructor ({pointListContainer, tripDestinations, tripOffers, onDataChange}) {
    this.#pointListContainer = pointListContainer;
    this.#tripDestinations = tripDestinations;
    this.#tripOffers = tripOffers;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;

    const previousPointComponent = this.#pointComponent;
    const previousPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onEditClick: this.#handleEditClickOnCard,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onFormSubmit: this.#handleFormSubmit,
      onEditClick: this.#handleEditClickOnForm,
    });

    if (previousPointComponent === null || previousPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(previousPointComponent.element)) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#pointListContainer.contains(previousPointEditComponent.element)) {
      replace(this.#pointEditComponent, previousPointEditComponent);
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
