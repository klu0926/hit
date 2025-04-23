let _intervalDisplayCode
function generateCode() {
  const part1 = Math.floor(10000 + Math.random() * 90000)
  const part2 = Math.floor(10000 + Math.random() * 900000)
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = Math.floor(Math.random() * alphabet.length);

  return `${part1} - ${part2} - ${alphabet[index]}${alphabet[index]}`;
}


export function displayCode(time = 500) {
  const codeDisplay = document.createElement('div')
  codeDisplay.classList.add('display-code')
  app.appendChild(codeDisplay)

  _intervalDisplayCode = setInterval(() => {
    const codeString = document.createElement('p')
    codeString.innerHTML = generateCode()
    codeDisplay.appendChild(codeString)
  }, 500)
}


export function clearDisplayCodeInterval() {
  if (_intervalDisplayCode) {
    clearInterval(_intervalDisplayCode)
  }
}
