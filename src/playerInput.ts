import { setPlayerName, setupPlayfab } from './game/playfab';

setTimeout(() => {
  if (!localStorage.getItem('player-name')) {
    const usernameInput = document.getElementById('#username-input-container');
    if (usernameInput) {
      usernameInput.style.visibility = 'visible';
    }
  } else {
    setupPlayfab();
  }
}, 1250);

const submitButton = document.getElementById('#submit-button');
if (submitButton) {
  submitButton.onclick = function () {
    const usernameInput = document.getElementById('#user-name') as HTMLInputElement;
    const usernameLabel = document.getElementById('#username-label');
    const username = usernameInput?.value;
    if (username.length <= 2) {
      return;
    }
    setPlayerName(username);
    setupPlayfab();
    usernameInput.remove();
    submitButton.remove();
    usernameLabel?.remove();
  };
}
