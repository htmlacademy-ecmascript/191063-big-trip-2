import TripFiltersView from './view/new-trip-filters-view.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const filtersElement = siteHeaderElement.querySelector('.trip-controls__filters');

render(new TripFiltersView(), filtersElement);
