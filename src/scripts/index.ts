import '../styles/index.scss';
import { DropdownController } from './components/Dropdown/DropdownController';
//import { listItemsData } from './data';
//import { IDropdownListItem } from './data/types';

// Elements
const main = document.querySelector('main');

const MyDropdownController = new DropdownController('dropdown');
main?.insertAdjacentElement('beforeend', MyDropdownController.renderDropdown());

MyDropdownController.addListeners();