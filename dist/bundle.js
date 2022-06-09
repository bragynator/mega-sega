/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants/controls.js":
/*!***********************************!*\
  !*** ./src/constants/controls.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controls": () => (/* binding */ controls)
/* harmony export */ });
const controls = {
  PlayerOneAttack: 'KeyA',
  PlayerOneBlock: 'KeyD',
  PlayerTwoAttack: 'KeyJ',
  PlayerTwoBlock: 'KeyL',
  PlayerOneCriticalHitCombination: ['KeyQ', 'KeyW', 'KeyE'],
  PlayerTwoCriticalHitCombination: ['KeyU', 'KeyI', 'KeyO']
};

/***/ }),

/***/ "./src/javascript/app.js":
/*!*******************************!*\
  !*** ./src/javascript/app.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_fightersView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/fightersView */ "./src/javascript/components/fightersView.js");
/* harmony import */ var _services_fightersService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/fightersService */ "./src/javascript/services/fightersService.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class App {
  static async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      const fighters = await _services_fightersService__WEBPACK_IMPORTED_MODULE_1__.fighterService.getFighters();
      const fightersElement = (0,_components_fightersView__WEBPACK_IMPORTED_MODULE_0__.createFighters)(fighters);
      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }

}

_defineProperty(App, "rootElement", document.getElementById('root'));

_defineProperty(App, "loadingElement", document.getElementById('loading-overlay'));

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./src/javascript/components/arena.js":
/*!********************************************!*\
  !*** ./src/javascript/components/arena.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderArena": () => (/* binding */ renderArena)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");
/* harmony import */ var _fighterPreview__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fighterPreview */ "./src/javascript/components/fighterPreview.js");
/* harmony import */ var _fight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fight */ "./src/javascript/components/fight.js");
/* harmony import */ var _modal_winner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal/winner */ "./src/javascript/components/modal/winner.js");




function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);
  root.innerHTML = '';
  root.append(arena); // todo:
  // - start the fight
  // - when fight is finished show winner

  const [firstFighter, secondFighter] = selectedFighters;
  (0,_fight__WEBPACK_IMPORTED_MODULE_2__.fight)(firstFighter, secondFighter).then(_modal_winner__WEBPACK_IMPORTED_MODULE_3__.showWinnerModal);
}

function createArena(selectedFighters) {
  const arena = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___root'
  });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);
  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___fight-status'
  });
  const versusSign = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___versus-sign'
  });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');
  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const {
    name
  } = fighter;
  const container = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___fighter-indicator'
  });
  const fighterName = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'span',
    className: 'arena___fighter-name'
  });
  const indicator = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___health-indicator'
  });
  const bar = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'arena___health-bar',
    attributes: {
      id: `${position}-fighter-indicator`
    }
  });
  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);
  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: `arena___battlefield`
  });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');
  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = (0,_fighterPreview__WEBPACK_IMPORTED_MODULE_1__.createFighterImage)(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`
  });
  fighterElement.append(imgElement);
  return fighterElement;
}

/***/ }),

/***/ "./src/javascript/components/fight.js":
/*!********************************************!*\
  !*** ./src/javascript/components/fight.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fight": () => (/* binding */ fight),
/* harmony export */   "getDamage": () => (/* binding */ getDamage),
/* harmony export */   "getHitPower": () => (/* binding */ getHitPower),
/* harmony export */   "getBlockPower": () => (/* binding */ getBlockPower)
/* harmony export */ });
/* harmony import */ var _constants_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../constants/controls */ "./src/constants/controls.js");

async function fight(firstFighter, secondFighter) {
  let {
    name: firstFighterName,
    health: firstFighterHealth
  } = firstFighter;
  let {
    name: secondFighterName,
    health: secondFighterHealth
  } = secondFighter;
  document.addEventListener('keydown', e => console.log(e.code));
  let i = 1;

  while (firstFighterHealth > 0 && secondFighterHealth > 0) {
    console.log('round - ', i);

    if (i % 2 === 1) {
      const resDmg = await getDamage(firstFighter, secondFighter);
      console.log('result damage - ', resDmg);
      i += 1;
      secondFighterHealth -= resDmg;
      console.log('secondFighterHealth - ', secondFighterHealth);
      continue;
    }

    const resDmg = await getDamage(secondFighter, firstFighter);
    console.log('result damage - ', resDmg);
    i += 1;
    firstFighterHealth -= resDmg;
    console.log('firstFighterHealth - ', firstFighterHealth);
  }

  const winner = firstFighterHealth > 0 ? firstFighter : secondFighter;
  return new Promise(resolve => {
    // resolve the promise with the winner when fight is over
    resolve(winner);
  });
}
async function getDamage(attacker, defender) {
  // return damage
  const attack = getHitPower(attacker);
  const block = getBlockPower(defender);

  if (attack <= block) {
    return 0;
  }

  return attack - block;
}
function getHitPower(fighter) {
  // return hit power
  const {
    attack
  } = fighter;
  const criticalHitChance = Math.random() + 1;
  console.log('attack - ', attack * criticalHitChance);
  return attack * criticalHitChance;
}
function getBlockPower(fighter) {
  // return block power
  const {
    defense
  } = fighter;
  const dodgeChance = Math.random() + 1;
  console.log('defense - ', defense * dodgeChance);
  return defense * dodgeChance;
} // async function pressedKey(event) {
//   console.log(event.code);
//   return event.code;
// }

/***/ }),

/***/ "./src/javascript/components/fighterPreview.js":
/*!*****************************************************!*\
  !*** ./src/javascript/components/fighterPreview.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFighterPreview": () => (/* binding */ createFighterPreview),
/* harmony export */   "createFighterImage": () => (/* binding */ createFighterImage)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");

function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  }); // todo: show fighter info (image, name, health, etc.)

  const fighterImage = createFighterImage(fighter);
  fighterElement.append(fighterImage);
  const fighterParams = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'ul',
    className: 'fighterParams'
  });
  const fighterParamsItems = [];
  Object.keys(fighter).forEach(key => {
    if (key === '_id' || key === 'source') {
      return;
    }

    const fighterParamsItem = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
      tagName: 'li',
      className: 'fighterParams__item'
    });
    fighterParamsItem.textContent = `${key[0].toUpperCase() + key.slice(1)}: ${fighter[key]}`;
    fighterParamsItems.push(fighterParamsItem);
  });
  fighterParams.append(...fighterParamsItems);
  fighterElement.append(fighterParams);
  return fighterElement;
}
function createFighterImage(fighter) {
  const {
    source,
    name
  } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });
  return imgElement;
}

/***/ }),

/***/ "./src/javascript/components/fighterSelector.js":
/*!******************************************************!*\
  !*** ./src/javascript/components/fighterSelector.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFightersSelector": () => (/* binding */ createFightersSelector),
/* harmony export */   "getFighterInfo": () => (/* binding */ getFighterInfo)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");
/* harmony import */ var _arena__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arena */ "./src/javascript/components/arena.js");
/* harmony import */ var _resources_versus_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../resources/versus.png */ "./resources/versus.png");
/* harmony import */ var _fighterPreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fighterPreview */ "./src/javascript/components/fighterPreview.js");
/* harmony import */ var _services_fightersService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/fightersService */ "./src/javascript/services/fightersService.js");





function createFightersSelector() {
  let selectedFighters = [];
  return async (event, fighterId) => {
    const fighter = await getFighterInfo(fighterId);
    const [playerOne, playerTwo] = selectedFighters;
    const firstFighter = playerOne !== null && playerOne !== void 0 ? playerOne : fighter;
    const secondFighter = Boolean(playerOne) ? playerTwo !== null && playerTwo !== void 0 ? playerTwo : fighter : playerTwo;
    selectedFighters = [firstFighter, secondFighter];
    renderSelectedFighters(selectedFighters);
  };
}
0;
const fighterDetailsMap = new Map();
async function getFighterInfo(fighterId) {
  // get fighter info from fighterDetailsMap or from service and write it to fighterDetailsMap
  const fighterDetails = await _services_fightersService__WEBPACK_IMPORTED_MODULE_4__.fighterService.getFighterDetails(fighterId); // Object.entries(fighterDetails).map((el) => fighterDetailsMap.set(...el));

  return fighterDetails;
}

function renderSelectedFighters(selectedFighters) {
  const fightersPreview = document.querySelector('.preview-container___root');
  const [playerOne, playerTwo] = selectedFighters;
  const firstPreview = (0,_fighterPreview__WEBPACK_IMPORTED_MODULE_3__.createFighterPreview)(playerOne, 'left');
  const secondPreview = (0,_fighterPreview__WEBPACK_IMPORTED_MODULE_3__.createFighterPreview)(playerTwo, 'right');
  const versusBlock = createVersusBlock(selectedFighters);
  fightersPreview.innerHTML = '';
  fightersPreview.append(firstPreview, versusBlock, secondPreview);
}

function createVersusBlock(selectedFighters) {
  const canStartFight = selectedFighters.filter(Boolean).length === 2;

  const onClick = () => startFight(selectedFighters);

  const container = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'preview-container___versus-block'
  });
  const image = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'img',
    className: 'preview-container___versus-img',
    attributes: {
      src: _resources_versus_png__WEBPACK_IMPORTED_MODULE_2__
    }
  });
  const disabledBtn = canStartFight ? '' : 'disabled';
  const fightBtn = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'button',
    className: `preview-container___fight-btn ${disabledBtn}`
  });
  fightBtn.addEventListener('click', onClick, false);
  fightBtn.innerText = 'Fight';
  container.append(image, fightBtn);
  return container;
}

function startFight(selectedFighters) {
  (0,_arena__WEBPACK_IMPORTED_MODULE_1__.renderArena)(selectedFighters);
}

/***/ }),

/***/ "./src/javascript/components/fightersView.js":
/*!***************************************************!*\
  !*** ./src/javascript/components/fightersView.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFighters": () => (/* binding */ createFighters)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");
/* harmony import */ var _fighterSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fighterSelector */ "./src/javascript/components/fighterSelector.js");


function createFighters(fighters) {
  const selectFighter = (0,_fighterSelector__WEBPACK_IMPORTED_MODULE_1__.createFightersSelector)();
  const container = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'fighters___root'
  });
  const preview = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'preview-container___root'
  });
  const fightersList = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'fighters___list'
  });
  const fighterElements = fighters.map(fighter => createFighter(fighter, selectFighter));
  fightersList.append(...fighterElements);
  container.append(preview, fightersList);
  return container;
}

function createFighter(fighter, selectFighter) {
  const fighterElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'fighters___fighter'
  });
  const imageElement = createImage(fighter);

  const onClick = event => selectFighter(event, fighter._id);

  fighterElement.append(imageElement);
  fighterElement.addEventListener('click', onClick, false);
  return fighterElement;
}

function createImage(fighter) {
  const {
    source,
    name
  } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes
  });
  return imgElement;
}

/***/ }),

/***/ "./src/javascript/components/modal/modal.js":
/*!**************************************************!*\
  !*** ./src/javascript/components/modal/modal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showModal": () => (/* binding */ showModal)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");

function showModal({
  title,
  bodyElement,
  onClose = () => {}
}) {
  const root = getModalContainer();
  const modal = createModal({
    title,
    bodyElement,
    onClose
  });
  root.append(modal);
}

function getModalContainer() {
  return document.getElementById('root');
}

function createModal({
  title,
  bodyElement,
  onClose
}) {
  const layer = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'modal-layer'
  });
  const modalContainer = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'modal-root'
  });
  const header = createHeader(title, onClose);
  modalContainer.append(header, bodyElement);
  layer.append(modalContainer);
  return layer;
}

function createHeader(title, onClose) {
  const headerElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'modal-header'
  });
  const titleElement = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'span'
  });
  const closeButton = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'close-btn'
  });
  titleElement.innerText = title;
  closeButton.innerText = '×';

  const close = () => {
    hideModal();
    onClose();
  };

  closeButton.addEventListener('click', close);
  headerElement.append(titleElement, closeButton);
  return headerElement;
}

function hideModal() {
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal === null || modal === void 0 ? void 0 : modal.remove();
}

/***/ }),

/***/ "./src/javascript/components/modal/winner.js":
/*!***************************************************!*\
  !*** ./src/javascript/components/modal/winner.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showWinnerModal": () => (/* binding */ showWinnerModal)
/* harmony export */ });
/* harmony import */ var _helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/domHelper */ "./src/javascript/helpers/domHelper.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/javascript/components/modal/modal.js");


function showWinnerModal(fighter) {
  // call showModal function
  const {
    name
  } = fighter;
  const modalBody = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'div',
    className: 'modal-body'
  });
  const modalMessage = (0,_helpers_domHelper__WEBPACK_IMPORTED_MODULE_0__.createElement)({
    tagName: 'p',
    className: 'modal-message'
  });
  modalMessage.textContent = `WINNER - ${name}`;
  modalBody.append(modalMessage);
  const params = {
    title: 'Fight result:',
    bodyElement: modalBody,
    onClose: () => {
      window.location.reload();
    }
  };
  (0,_modal__WEBPACK_IMPORTED_MODULE_1__.showModal)(params);
}

/***/ }),

/***/ "./src/javascript/helpers/apiHelper.js":
/*!*********************************************!*\
  !*** ./src/javascript/helpers/apiHelper.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callApi": () => (/* binding */ callApi)
/* harmony export */ });
/* harmony import */ var _mockData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mockData */ "./src/javascript/helpers/mockData.js");

const BASE_API_URL = 'https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/';
const SECURITY_HEADERS = {
  headers: {
    /*
     * For the development, you shouldn't use the remote data source, but set useMockAPI=true.
     * To test the application against the real dataset set useMockAPI=false.
     * But to test the application you don't need to extend the GitHub REST API rate limit to 5000 requests with the token
     */
    // authorization: 'token %github_token%'
  }
};
const useMockAPI = true;
async function callApi(endpoint, method = 'GET') {
  const url = BASE_API_URL + endpoint;
  const options = {
    method,
    ...SECURITY_HEADERS
  };
  return useMockAPI ? fakeCallApi(endpoint) : fetch(url, options).then(response => response.ok ? response.json() : Promise.reject(Error('Failed to load'))).then(result => JSON.parse(atob(result.content))).catch(error => {
    throw error;
  });
}

async function fakeCallApi(endpoint) {
  const response = endpoint === 'fighters.json' ? _mockData__WEBPACK_IMPORTED_MODULE_0__.fighters : getFighterById(endpoint);
  return new Promise((resolve, reject) => {
    setTimeout(() => response ? resolve(response) : reject(Error('Failed to load')), 500);
  });
}

function getFighterById(endpoint) {
  const start = endpoint.lastIndexOf('/');
  const end = endpoint.lastIndexOf('.json');
  const id = endpoint.substring(start + 1, end);
  return _mockData__WEBPACK_IMPORTED_MODULE_0__.fightersDetails.find(it => it._id === id);
}

/***/ }),

/***/ "./src/javascript/helpers/domHelper.js":
/*!*********************************************!*\
  !*** ./src/javascript/helpers/domHelper.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
function createElement({
  tagName,
  className,
  attributes = {}
}) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting

    element.classList.add(...classNames);
  }

  Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  return element;
}

/***/ }),

/***/ "./src/javascript/helpers/mockData.js":
/*!********************************************!*\
  !*** ./src/javascript/helpers/mockData.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fighters": () => (/* binding */ fighters),
/* harmony export */   "fightersDetails": () => (/* binding */ fightersDetails)
/* harmony export */ });
const fighters = [{
  _id: '1',
  name: 'Ryu',
  source: 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif'
}, {
  _id: '2',
  name: 'Dhalsim',
  source: 'https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif'
}, {
  _id: '3',
  name: 'Guile',
  source: 'https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif'
}, {
  _id: '4',
  name: 'Zangief',
  source: 'https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif'
}, {
  _id: '5',
  name: 'Ken',
  source: 'https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif'
}, {
  _id: '6',
  name: 'Bison',
  source: 'http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif'
}];
const fightersDetails = [{
  _id: '1',
  name: 'Ryu',
  health: 45,
  attack: 4,
  defense: 3,
  source: 'https://media.giphy.com/media/kdHa4JvihB2gM/giphy.gif'
}, {
  _id: '2',
  name: 'Dhalsim',
  health: 60,
  attack: 3,
  defense: 1,
  source: 'https://i.pinimg.com/originals/c0/53/f2/c053f2bce4d2375fee8741acfb35d44d.gif'
}, {
  _id: '3',
  name: 'Guile',
  health: 45,
  attack: 4,
  defense: 3,
  source: 'https://66.media.tumblr.com/tumblr_lq8g3548bC1qd0wh3o1_400.gif'
}, {
  _id: '4',
  name: 'Zangief',
  health: 60,
  attack: 4,
  defense: 1,
  source: 'https://media1.giphy.com/media/nlbIvY9K0jfAA/source.gif'
}, {
  _id: '5',
  name: 'Ken',
  health: 45,
  attack: 3,
  defense: 4,
  source: 'https://i.pinimg.com/originals/46/4b/36/464b36a7aecd988e3c51e56a823dbedc.gif'
}, {
  _id: '6',
  name: 'Bison',
  health: 45,
  attack: 5,
  defense: 4,
  source: 'http://www.fightersgeneration.com/np5/char/ssf2hd/bison-hdstance.gif'
}];

/***/ }),

/***/ "./src/javascript/services/fightersService.js":
/*!****************************************************!*\
  !*** ./src/javascript/services/fightersService.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fighterService": () => (/* binding */ fighterService)
/* harmony export */ });
/* harmony import */ var _helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/apiHelper */ "./src/javascript/helpers/apiHelper.js");
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _endpoint = /*#__PURE__*/new WeakMap();

class FighterService {
  constructor() {
    _classPrivateFieldInitSpec(this, _endpoint, {
      writable: true,
      value: 'fighters.json'
    });
  }

  async getFighters() {
    try {
      const apiResult = await (0,_helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.callApi)(_classPrivateFieldGet(this, _endpoint));
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    try {
      const apiResult = await (0,_helpers_apiHelper__WEBPACK_IMPORTED_MODULE_0__.callApi)(`details/fighter/${id}.json`);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

}

const fighterService = new FighterService();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/arena.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/arena.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../resources/arena.jpg */ "./resources/arena.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".arena___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-size: cover;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.arena___battlefield {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  margin-bottom: 60px;\r\n}\r\n\r\n.arena___right-fighter img {\r\n  transform: scaleX(-1);\r\n}\r\n\r\n.arena___fighter img {\r\n  height: 480px;\r\n}\r\n\r\n.arena___fight-status {\r\n  display: flex;\r\n  margin: 30px;\r\n  justify-content: center;\r\n}\r\n\r\n.arena___fighter-name {\r\n  color: black;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 26px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n}\r\n\r\n.arena___fighter-indicator {\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  flex-direction: column;\r\n  margin: 0 30px;\r\n}\r\n\r\n.arena___health-indicator {\r\n  width: 100%;\r\n  height: 25px;\r\n  border: 2px solid;\r\n  border-radius: 5px;\r\n  margin: 0 10px;\r\n  overflow: hidden;\r\n}\r\n\r\n.arena___health-bar {\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: #ebd759;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/arena.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,8BAA8B;EAC9B,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,yDAAkD;EAClD,4BAA4B;EAC5B,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,eAAe;EACf,0BAA0B;EAC1B,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;EACd,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;AAC3B","sourcesContent":[".arena___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-size: cover;\r\n  background-image: url('../../resources/arena.jpg');\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.arena___battlefield {\r\n  display: flex;\r\n  justify-content: space-around;\r\n  margin-bottom: 60px;\r\n}\r\n\r\n.arena___right-fighter img {\r\n  transform: scaleX(-1);\r\n}\r\n\r\n.arena___fighter img {\r\n  height: 480px;\r\n}\r\n\r\n.arena___fight-status {\r\n  display: flex;\r\n  margin: 30px;\r\n  justify-content: center;\r\n}\r\n\r\n.arena___fighter-name {\r\n  color: black;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 26px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n}\r\n\r\n.arena___fighter-indicator {\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  flex-direction: column;\r\n  margin: 0 30px;\r\n}\r\n\r\n.arena___health-indicator {\r\n  width: 100%;\r\n  height: 25px;\r\n  border: 2px solid;\r\n  border-radius: 5px;\r\n  margin: 0 10px;\r\n  overflow: hidden;\r\n}\r\n\r\n.arena___health-bar {\r\n  height: 100%;\r\n  width: 100%;\r\n  background-color: #ebd759;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/fighterPreview.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/fighterPreview.css ***!
  \*****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".fighter-preview___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-basis: 250px;\r\n}\r\n\r\n.fighter-preview___right {\r\n  align-items: flex-end;\r\n}\r\n\r\n.fighter-preview___left {\r\n  align-items: flex-start;\r\n}\r\n\r\n.fighter-preview___right img,\r\n.fighter-preview___left img {\r\n  max-height: 300px;\r\n}\r\n.fighter-preview___right img {\r\n  transform: scaleX(-1);\r\n}\r\n\r\n.fighterParams {\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\n.fighterParams__item {\r\n  color: black;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 20px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/fighterPreview.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;;EAEE,iBAAiB;AACnB;AACA;EACE,qBAAqB;AACvB;;AAEA;EACE,SAAS;EACT,UAAU;EACV,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,8BAA8B;EAC9B,8BAA8B;EAC9B,eAAe;EACf,0BAA0B;EAC1B,gBAAgB;AAClB","sourcesContent":[".fighter-preview___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-basis: 250px;\r\n}\r\n\r\n.fighter-preview___right {\r\n  align-items: flex-end;\r\n}\r\n\r\n.fighter-preview___left {\r\n  align-items: flex-start;\r\n}\r\n\r\n.fighter-preview___right img,\r\n.fighter-preview___left img {\r\n  max-height: 300px;\r\n}\r\n.fighter-preview___right img {\r\n  transform: scaleX(-1);\r\n}\r\n\r\n.fighterParams {\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\n.fighterParams__item {\r\n  color: black;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 20px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/fighters.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/fighters.css ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../../resources/main-bg.jpg */ "./resources/main-bg.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".fighters___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.fighters___list {\r\n  margin: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.fighters___fighter {\r\n  height: 150px;\r\n  max-width: 150px;\r\n  flex: 1;\r\n  display: flex;\r\n  justify-content: center;\r\n  cursor: pointer;\r\n  background: #ffdfa7;\r\n  margin: 10px;\r\n  border: 5px solid #ca9650;\r\n}\r\n\r\n.fighters___fighter:hover {\r\n  background: #cbe4f8;\r\n  border: 5px solid #267abf;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/fighters.css"],"names":[],"mappings":"AAAA;EACE,aAAa;EACb,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,yDAAoD;EACpD,sBAAsB;EACtB,4BAA4B;EAC5B,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,OAAO;EACP,aAAa;EACb,uBAAuB;EACvB,eAAe;EACf,mBAAmB;EACnB,YAAY;EACZ,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,yBAAyB;AAC3B","sourcesContent":[".fighters___root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-image: url('../../resources/main-bg.jpg');\r\n  background-size: cover;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.fighters___list {\r\n  margin: 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.fighters___fighter {\r\n  height: 150px;\r\n  max-width: 150px;\r\n  flex: 1;\r\n  display: flex;\r\n  justify-content: center;\r\n  cursor: pointer;\r\n  background: #ffdfa7;\r\n  margin: 10px;\r\n  border: 5px solid #ca9650;\r\n}\r\n\r\n.fighters___fighter:hover {\r\n  background: #cbe4f8;\r\n  border: 5px solid #267abf;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/modal.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/modal.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".modal-layer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: rgba(128, 128, 128, 0.6);\r\n}\r\n\r\n.modal-root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  background-color: white;\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  min-width: 300px;\r\n  padding: 1rem;\r\n  border-bottom: 1px solid #e9ecef;\r\n  font-weight: 700;\r\n  font-size: 22px;\r\n  background-color: #ca9650;\r\n}\r\n\r\n.modal-body {\r\n  padding: 1rem;\r\n  color: black;\r\n  background-color: #ffdfa7;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 28px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n  text-align: center;\r\n}\r\n\r\n.close-btn {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  line-height: 1;\r\n  cursor: pointer;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/modal.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,0CAA0C;AAC5C;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,oCAAoC;EACpC,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,gBAAgB;EAChB,aAAa;EACb,gCAAgC;EAChC,gBAAgB;EAChB,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,YAAY;EACZ,yBAAyB;EACzB,8BAA8B;EAC9B,8BAA8B;EAC9B,eAAe;EACf,0BAA0B;EAC1B,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,cAAc;EACd,eAAe;AACjB","sourcesContent":[".modal-layer {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  height: 100%;\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  background-color: rgba(128, 128, 128, 0.6);\r\n}\r\n\r\n.modal-root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  border: 1px solid rgba(0, 0, 0, 0.2);\r\n  background-color: white;\r\n}\r\n\r\n.modal-header {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  min-width: 300px;\r\n  padding: 1rem;\r\n  border-bottom: 1px solid #e9ecef;\r\n  font-weight: 700;\r\n  font-size: 22px;\r\n  background-color: #ca9650;\r\n}\r\n\r\n.modal-body {\r\n  padding: 1rem;\r\n  color: black;\r\n  background-color: #ffdfa7;\r\n  -webkit-text-fill-color: white;\r\n  -webkit-text-stroke-width: 1px;\r\n  font-size: 28px;\r\n  font-family: 'Arial Black';\r\n  font-weight: 700;\r\n  text-align: center;\r\n}\r\n\r\n.close-btn {\r\n  font-size: 1.5rem;\r\n  font-weight: 700;\r\n  line-height: 1;\r\n  cursor: pointer;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/previewContainer.css":
/*!*******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/previewContainer.css ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".preview-container___root {\r\n  flex: 1;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin: 40px;\r\n}\r\n\r\n.preview-container___versus-block {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 50px;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.preview-container___versus-img {\r\n  width: 130px;\r\n}\r\n\r\n.preview-container___fight-btn {\r\n  padding: 8px 35px;\r\n  justify-self: right;\r\n  text-align: center;\r\n  background: #ba0303;\r\n  margin: 40px 0;\r\n  color: #f8f9f4;\r\n  font-size: 22px;\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n  box-shadow: 6px 6px 7px 0px rgba(0, 0, 0, 0.75);\r\n}\r\n\r\n.preview-container___fight-btn.disabled {\r\n  opacity: 0;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/previewContainer.css"],"names":[],"mappings":"AAAA;EACE,OAAO;EACP,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,cAAc;EACd,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;EAClB,mBAAmB;EACnB,cAAc;EACd,cAAc;EACd,eAAe;EACf,eAAe;EACf,iBAAiB;EACjB,+CAA+C;AACjD;;AAEA;EACE,UAAU;AACZ","sourcesContent":[".preview-container___root {\r\n  flex: 1;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  margin: 40px;\r\n}\r\n\r\n.preview-container___versus-block {\r\n  display: flex;\r\n  flex-direction: column;\r\n  margin: 0 50px;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.preview-container___versus-img {\r\n  width: 130px;\r\n}\r\n\r\n.preview-container___fight-btn {\r\n  padding: 8px 35px;\r\n  justify-self: right;\r\n  text-align: center;\r\n  background: #ba0303;\r\n  margin: 40px 0;\r\n  color: #f8f9f4;\r\n  font-size: 22px;\r\n  cursor: pointer;\r\n  font-weight: bold;\r\n  box-shadow: 6px 6px 7px 0px rgba(0, 0, 0, 0.75);\r\n}\r\n\r\n.preview-container___fight-btn.disabled {\r\n  opacity: 0;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_arena_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./arena.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/arena.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fighters_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./fighters.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/fighters.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_fighterPreview_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./fighterPreview.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/fighterPreview.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_previewContainer_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./previewContainer.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/previewContainer.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./modal.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/modal.css");
// Imports







var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_arena_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_fighters_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_fighterPreview_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_previewContainer_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_modal_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html,\r\nbody {\r\n  height: 100%;\r\n  width: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n#root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 100%;\r\n  width: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n}\r\n\r\n#loading-overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 18px;\r\n  background: rgba(255, 255, 255, 0.7);\r\n  visibility: hidden;\r\n}", "",{"version":3,"sources":["webpack://./src/styles/styles.css"],"names":[],"mappings":"AAMA;;EAEE,YAAY;EACZ,WAAW;EACX,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,oCAAoC;EACpC,kBAAkB;AACpB","sourcesContent":["@import 'arena.css';\r\n@import 'fighters.css';\r\n@import 'fighterPreview.css';\r\n@import 'previewContainer.css';\r\n@import 'modal.css';\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n  width: 100%;\r\n  margin: 0;\r\n  padding: 0;\r\n}\r\n\r\n#root {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 100%;\r\n  width: 100%;\r\n  overflow: hidden;\r\n}\r\n\r\nimg {\r\n  max-width: 100%;\r\n  max-height: 100%;\r\n}\r\n\r\n#loading-overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 18px;\r\n  background: rgba(255, 255, 255, 0.7);\r\n  visibility: hidden;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/styles.css":
/*!*******************************!*\
  !*** ./src/styles/styles.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./resources/arena.jpg":
/*!*****************************!*\
  !*** ./resources/arena.jpg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "63e501d6a20393917561.jpg";

/***/ }),

/***/ "./resources/main-bg.jpg":
/*!*******************************!*\
  !*** ./resources/main-bg.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "425472c17869f0d9c74b.jpg";

/***/ }),

/***/ "./resources/versus.png":
/*!******************************!*\
  !*** ./resources/versus.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b4ec8f9e4840ca95d591.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_javascript_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/javascript/app */ "./src/javascript/app.js");
/* harmony import */ var _src_styles_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/styles/styles.css */ "./src/styles/styles.css");


_src_javascript_app__WEBPACK_IMPORTED_MODULE_0__["default"].startApp();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map