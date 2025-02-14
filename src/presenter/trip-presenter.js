import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointListEmptyView from '../view/point-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';
import { sortByTime, sortByPrice } from '../utils.js';
import { SortType } from '../const.js';
import { render, RenderPosition } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripComponent = new TripView();
  #pointListComponent = new PointListView();
  #sortComponent = null;
  #pointListEmptyComponent = new PointListEmptyView();

  #tripPoints = [];
  #tripDestinations = [];
  #tripOffers = [];

  #pointPresenters = new Map();
  #currentSortType = SortType.DEFAULT;
  #originalTripPoints = [];

  constructor({tripContainer, pointsModel}) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];
    this.#tripDestinations = [...this.#pointsModel.destinations];
    this.#tripOffers = [...this.#pointsModel.offers];
    this.#originalTripPoints = [...this.#pointsModel.points];

    this.#renderTrip();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#tripComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#originalTripPoints = updateItem(this.#originalTripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      default:
        this.#tripPoints = [...this.#originalTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      tripDestinations: this.#tripDestinations,
      tripOffers: this.#tripOffers,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);

    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#tripPoints.forEach((point) => this.#renderPoint(point));
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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
