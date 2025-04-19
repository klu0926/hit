let _overlay
let _promptMessage

function promptMessage(messageText = "Prompt Message", hideYes = false) {
  if (_promptMessage) {
    _promptMessage.remove();
    _promptMessage = null;
  }
  if (_overlay) {
    _overlay.remove();
    _overlay = null
  }

  // overlay
  _overlay = document.createElement('div');
  _overlay.className = 'prompt-overlay';
  document.body.appendChild(_overlay);

  // container
  _promptMessage = document.createElement('div');
  _promptMessage.className = 'prompt-message';

  // string
  const messageStringDiv = document.createElement('div');
  messageStringDiv.innerHTML = messageText.replace(/\n/g, '<br>');
  messageStringDiv.classList.add('prompt-message-string');
  _promptMessage.appendChild(messageStringDiv);

  // Buttons
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('prompt-buttons');
  _promptMessage.appendChild(buttonDiv);

  // Close
  const closeButton = document.createElement('button');
  closeButton.classList.add('prompt-close');
  closeButton.textContent = 'Close';
  buttonDiv.appendChild(closeButton);

  // Yes
  let yesButton = null;
  if (!hideYes) {
    yesButton = document.createElement('button');
    yesButton.classList.add('prompt-yes');
    yesButton.textContent = 'Agreed';
    buttonDiv.appendChild(yesButton);
  }

  // Append to app
  const app = document.querySelector('#app');
  if (app) {
    app.appendChild(_promptMessage);
  }

  return [yesButton, closeButton];
}

function removePromptMessage() {
  if (_promptMessage) {
    _promptMessage.remove();
    _promptMessage = null;
  }

  const overlay = document.querySelector('.prompt-overlay');
  if (overlay) {
    overlay.remove();
  }
}

export function callPromptMessage(message = '', hideYes = false) {
  return new Promise((resolve) => {
    const [yesButton, closeButton] = promptMessage(message, hideYes);

    if (yesButton) {
      yesButton.addEventListener('click', () => {
        resolve(true); // return true for "yes"
        removePromptMessage();
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        resolve(false); // return false for "close"
        removePromptMessage();
      });
    }
  });
}
