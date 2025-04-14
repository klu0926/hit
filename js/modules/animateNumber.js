export function animateNumber(el, number, callback = null, endString = '%', duration = 500, numberIncrement = 1, startNumber = 0) {
  return new Promise((resolve) => {
    console.log('calling promise')
    let currentNumber = startNumber;
    const steps = Math.ceil((number - startNumber) / numberIncrement);
    const stepTime = Math.floor(duration / steps);

    const timer = setInterval(() => {
      currentNumber += numberIncrement;
      if (currentNumber >= number) {
        clearInterval(timer);
        el.innerText = `${number}${endString}`;
        if (callback) callback();
        resolve();
      } else {
        el.innerText = `${currentNumber}${endString}`;
      }
    }, Math.max(stepTime, 1)); // avoid 0ms
  });
}
