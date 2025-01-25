import { render } from '../render.js';
import TripView from '../view/trip-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventView from '../view/event-view.js';
import EventAddView from '../view/event-add-view.js';
import EventEditView from '../view/event-edit-view.js';
// import EventListEmptyView from '../view/event-list-empty-view.js';
// import EventListLoadingView from '../view/event-list-loading-view.js';

export default class TripPresenter {
  tripComponent = new TripView();
  eventListComponent = new EventListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.tripComponent, this.tripContainer);
    render(new SortView(), this.tripComponent.getElement());
    render(this.eventListComponent, this.tripComponent.getElement());
    render(new EventEditView(), this.eventListComponent.getElement());
    render(new EventAddView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i ++) {
      render(new EventView(), this.eventListComponent.getElement());
    }
  }
}
