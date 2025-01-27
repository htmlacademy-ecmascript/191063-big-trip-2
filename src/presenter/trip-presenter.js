import { render } from '../render.js';
import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointView from '../view/point-view.js';
import PointAddView from '../view/point-add-view.js';
import PointEditView from '../view/point-edit-view.js';

export default class TripPresenter {
  tripComponent = new TripView();
  pointListComponent = new PointListView();

  constructor({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.tripPoints = [...this.pointsModel.getPoints()];

    render(this.tripComponent, this.tripContainer);
    render(new SortView(), this.tripComponent.getElement());
    render(this.pointListComponent, this.tripComponent.getElement());
    render(new PointEditView(), this.pointListComponent.getElement());
    render(new PointAddView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.tripPoints.length; i ++) {
      render(new PointView({point: this.tripPoints[i]}), this.pointListComponent.getElement());
    }
  }
}
