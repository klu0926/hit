export function animateNumber(el, number, {
  startNumber = 0,
  numberIncrement = 1,
  duration = 500,
  startString = '',
  endString = '',
  callback = null
} = {}) {
  return new Promise((resolve) => {
    let currentNumber = startNumber;
    const steps = Math.ceil((number - startNumber) / numberIncrement);
    const stepTime = Math.floor(duration / steps);

    const timer = setInterval(() => {
      currentNumber += numberIncrement;
      if (currentNumber >= number) {
        clearInterval(timer);
        el.innerText = `${startString}${number}${endString}`;
        if (callback) callback();
        resolve();
      } else {
        el.innerText = `${startString}${currentNumber}${endString}`;
      }
    }, Math.max(stepTime, 1));
  });
}
