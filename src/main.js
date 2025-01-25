import TripView from './view/trip-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import EventListView from './view/event-list-view.js';
import EventView from './view/event-view.js';
import EventAddView from './view/event-add-view.js';
import EventEditView from './view/event-edit-view.js';
// import EventListEmptyView from './view/event-list-empty-view.js';
// import EventListLoadingView from './view/event-list-loading-view.js';
import { render } from './render.js';

const pageHeaderElement = document.querySelector('.page-header');
const filtersElement = pageHeaderElement.querySelector('.trip-controls__filters');
const pageMainElement = document.querySelector('.page-body__page-main');
const pageBodyContainerElement = pageMainElement.querySelector('.page-body__container');


render(new FilterView(), filtersElement);
render(new TripView(), pageBodyContainerElement);

const tripEventsElement = pageBodyContainerElement.querySelector('.trip-events');

render(new SortView(), tripEventsElement);
render(new EventListView(), tripEventsElement);

const tripEventsListElement = pageBodyContainerElement.querySelector('.trip-events__list');

render(new EventEditView(), tripEventsListElement);
render(new EventAddView(), tripEventsListElement);

for (let i = 0; i < 3; i++) {
  render(new EventView(), tripEventsListElement);
}

