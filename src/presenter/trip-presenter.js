import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointAddView from '../view/point-add-view.js';
import PointEditView from '../view/point-edit-view.js';
import { render } from '../framework/render.js';

export default class TripPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripComponent = new TripView();
  #pointListComponent = new PointListView();

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

    render(this.#tripComponent, this.#tripContainer);
    render(new SortView(), this.#tripComponent.element);
    render(this.#pointListComponent, this.#tripComponent.element);
    render(new PointEditView({
      point: this.#tripPoints[0],
      destinations: this.#tripDestinations,
      offers: this.#tripOffers
    }), this.#pointListComponent.element);
    render(new PointAddView(), this.#pointListComponent.element);

    for (const point of this.#tripPoints) {
      render(new PointView({
        point,
        destinations: this.#tripDestinations,
        offers: this.#tripOffers
      }), this.#pointListComponent.element);
    }
  }
}
