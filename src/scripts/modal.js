export function closeModal(modalControllerClass){
  const modalController = document.querySelector(`.${modalControllerClass}`);
  const closeButton = document.querySelector(`.${modalControllerClass} .close-modal-button`);
  const cancelButton = document.querySelector(`.${modalControllerClass} .cancel-button` );
  const inputs = document.querySelectorAll('.create__post');
  
  closeButton.addEventListener('click', () => {
    modalController.close();
  })
  if(cancelButton !== null){
    cancelButton.addEventListener('click', () => {
      modalController.close();
      inputs.forEach(input => {
        input.value = '';
      });
    })
  }
} 
