// All custom even name store in one place.
export const EVENTS = {
  SET_PLAYER: 'TokenPlayerSet',
  SET_TARGETS: 'TokenTargetSet'
}

const eventHandlers = {
  [EVENTS.SET_PLAYER]: [],
  [EVENTS.SET_TARGETS]: []
};

export function attachEvent(eventName, callback) {
  if (!eventHandlers[eventName]) {
    eventHandlers[eventName] = [];
  }

  if (typeof callback === 'function') {
    eventHandlers[eventName].push(callback);
  }
}

export function dispatchEvent(eventName, detail = {}) {
  document.dispatchEvent(new CustomEvent(eventName, { detail }));
  // currently not using detail

  // run handlers funcitons
  const handlers = eventHandlers[eventName];
  handlers.forEach(fn => {
    fn()
  });
}