import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)
  const fighterImage = createFighterImage(fighter);
  fighterElement.append(fighterImage);

  const fighterParams = createElement({
    tagName: 'ul',
    className: 'fighterParams'
  });

  const fighterParamsItems = [];
  Object.keys(fighter).forEach((key) => {
    if (key === '_id' || key === 'source') {
      return;
    }
    const fighterParamsItem = createElement({
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

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
