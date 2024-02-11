export function modalEvents() {
  const modalButton = document.getElementById('modal-button');
  const modalButtonClose = document.getElementById('closeModal');

  /* modal open */
  modalButton.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    document.body.classList.toggle('no-scroll');
    modal.showModal();
    modal.classList.remove('slide-out-blurred-top');
    modal.classList.add('slide-in-blurred-top');
  });

  /* modal close */
  modalButtonClose.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    document.body.classList.toggle('no-scroll');
    modal.classList.remove('slide-in-blurred-top');
    modal.classList.add('slide-out-blurred-top');
    setTimeout(() => {
      modal.close();
      modal.classList.remove('slide-out-blurred-top');
    }, 450);
  });
}
