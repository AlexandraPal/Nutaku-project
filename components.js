class ModalDialog extends HTMLElement {
  constructor() {
    super();

    this.gameCards = document.querySelectorAll('.product-tile');
    this.overlay = document.querySelector('.overlay');
    this.modalForm = document.querySelector('.modal-form');

    document.addEventListener('click', (event) => {
      let clickOutsideGameCards = true;

      this.gameCards.forEach(gameCard => {
        if (event.path.includes(gameCard)) {
          clickOutsideGameCards = false;
        }
      })
      
      if (event.path.includes(this.overlay)) {
        return;
      }

      if (clickOutsideGameCards) {
        this.showModal();
        this.overlay.style.display = 'block';
      }
    });

    this.overlay.addEventListener('click', (event) => {
      if (event.path.includes(this.modalForm)) {
        return
      }

      this.hideModal();
    })

    document.addEventListener('keyup', (event) => {
      if (event.code.toUpperCase() === 'ESCAPE') {
        this.hideModal();
        this.overlay.style.display = 'none';
      }
    });
  }

  modalIsOpen() {
    return this.hasAttribute('open');
  }

  showModal() {
    this.setAttribute('open', '');
  }

  hideModal() {
    if (this.modalIsOpen()) {
      this.removeAttribute('open', '');
      this.overlay.style.display = 'none';
    }
  }
}
  
customElements.define('modal-dialog', ModalDialog);
