export default class EventEmitter { // implemented like 'Event' in WEB API
  // Alternatives:
  // 1. implement like EventEmitter, NodeJS - this code is for browsers, new npm module?
  // 2. 'function AddEventEmitter(obj)':  add new methods to each passed object - memory problems?
  // 3. 'function AddEventEmitter(TargetFunctionForNew)': add new methods to the 'TargetFunctionForNew' - 'class extends' is the same
  // 4. 'function AddEventEmitter(targetClass)': add new methods to the 'targetClass' - 'class extends' is the same
  // 5. mixin: there is no 'constructor' and methods can be directly copied to the 'target', the 'this._events' field will be created in each object on the first access. - 'class extends' is the same, multiple inheritance is not requared at this stage.

  // event.type is the string, name of the event that should be passed to the addEventListener
  //(implemented like 'Event.type' in WEB API)
  dispatchEvent(event) { //like 'emit' in NodeJS but there is a single object instead of a bunch of arguments
    if(this._events) {
      const eventListeners = this._events[event.type];
      if(eventListeners) {
        eventListeners.forEach(listener => listener(event));
      }
    }
  }

  // event - A case-sensitive string representing the event type to listen for.
  // listener - A callback function that accepts a single parameter: an object based on Event describing the event which has occurred
  // (implemented like 'Event.type' in WEB API)
  addEventListener(event, listener) { //'on' in NodeJS
    if(!this._events) this._events = {};

    let eventListeners = this._events[event];
    if(!eventListeners) {
      eventListeners = new Array();
      this._events[event] = eventListeners;
    }
    eventListeners.push(listener);
  }
}