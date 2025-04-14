export function animateNumber(el, number, callback = null, endString = '%', duration = 100) {
  let currentNumber = 0;
  const minStep = 10 // minium time for each step (ms)
  // time per step
  const stepTime = Math.max(Math.floor(duration / number), minStep);
  const timer = setInterval(() => {
    currentNumber++;
    el.innerText = `${currentNumber}${endString}`;
    if (currentNumber >= number) {
      clearInterval(timer);
      if (callback) callback()
    }
  }, stepTime);
}