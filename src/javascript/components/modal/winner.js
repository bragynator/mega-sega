import { createElement } from '../../helpers/domHelper';
import { showModal } from './modal';

export function showWinnerModal(fighter) {
  // call showModal function
  const { name } = fighter;

  const modalBody = createElement({ tagName: 'div', className: 'modal-body' });
  const modalMessage = createElement({ tagName: 'p', className: 'modal-message' });
  modalMessage.textContent = `WINNER - ${name}`;
  modalBody.append(modalMessage);

  const params = {
    title: 'Fight result:',
    bodyElement: modalBody,
    onClose: () => {
      window.location.reload();
    }
  };

  showModal(params);
}
