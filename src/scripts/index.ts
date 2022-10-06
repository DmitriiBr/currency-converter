import '../styles/index.scss';
import { Dropdown } from './components/Dropdown/Dropdown';

// Elements
// TODO:
// Rename dropdown calsses main and dropdown controller [+]
// Type guards for dropdown class [+]
// Dropdown choosing items functional [+]
// Show choosed item inside button title [+]
// Style dropdown [+]
// Animation to dropdown list [+]

const main = document.querySelector('main');

const MyDropdown = new Dropdown('dropdown');
main?.insertAdjacentHTML('beforeend', MyDropdown.renderDropdown());

MyDropdown.addListeners();