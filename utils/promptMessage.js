let _promptMessage

function promptMessage(messageText = "Prompt Message", hideYes = false) {
  if (_promptMessage) {
    _promptMessage.remove()
    _promptMessage = null
  }

  // main container
  _promptMessage = document.createElement('div');
  _promptMessage.className = 'prompt-message';

  // message string
  const messageStringDiv = document.createElement('div');
  messageStringDiv.textContent = messageText;
  messageStringDiv.classList.add('prompt-message-string')
  _promptMessage.appendChild(messageStringDiv);

  // buttons 
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('prompt-buttons')
  _promptMessage.appendChild(buttonDiv);

  // Close 
  const closeButton = document.createElement('button');
  closeButton.classList.add('prompt-close')
  closeButton.textContent = 'Close';
  buttonDiv.appendChild(closeButton);

  let yesButton = null
  if (!hideYes) {
    // Yes 
    yesButton = document.createElement('button');
    yesButton.classList.add('prompt-yes')
    yesButton.textContent = 'Agreed';
    buttonDiv.appendChild(yesButton);
  }
  // Append to app
  const app = document.querySelector('#app');
  if (app) {
    app.appendChild(_promptMessage);
  }

  return [yesButton, closeButton]
}


function removePromptMessage() {
  if (_promptMessage) {
    _promptMessage.remove()
    _promptMessage = null
  }
}


export function callPromptMessage(message = '', hideYes = false) {
  return new Promise((resolve) => {
    const [yesButton, closeButton] = promptMessage(message, hideYes);

    if (yesButton) {
      yesButton.addEventListener('click', () => {
        resolve({ result: 'yes' });
        removePromptMessage()
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        resolve({ result: 'close' });
        removePromptMessage()
      });
    }
  });
}