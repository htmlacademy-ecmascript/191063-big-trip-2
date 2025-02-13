import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import {render, RenderPosition, replace} from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripComponent = new TripView();
  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #pointListEmptyComponent = new PointListEmptyView();

  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#tripDestinations = [...this.#pointsModel.destinations];
    this.#tripOffers = [...this.#pointsModel.offers];

    this.#renderTrip();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new PointEditView({
      point,
      destinations: this.#tripDestinations,
      offers: this.#tripOffers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }

  #renderPoints() {
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#tripComponent.element);
    this.#renderPoints();
  }

  #renderPointListEmpty() {
    render(this.#pointListEmptyComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderTrip() {
    render(this.#tripComponent, this.#tripContainer);

    if (this.#tripPoints.length === 0) {
      this.#renderPointListEmpty();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
