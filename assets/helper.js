import $ from "jquery";

class MicroEvent {
    constructor () {
        this._events = {};
    }
    bind (event, fct) {
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    }
    unbind (event) {
        if (!this._events[event]) return;
        this._events[event] = [];
    }
    trigger (event, ...arg) {
        if (!this._events[event] || this._events[event] === []) return;
        for (let i = 0; i < this._events[event].length; i++) {
            this._events[event][i](...arg);
        }
    }
    once (event, ...arg) {
        this.trigger(event, ...arg);
        this.unbind(event);
    }
}

const clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

const extend = function (prev, next) {
    return clone($.extend(prev, next));
};


export let EventCenter = new MicroEvent();
export let Config = {
    modules: ['button', 'input', 'slider', 'popup'],
    button: {
        padding: ['10px', 'range'],
        radius: ['10px', 'range']
    },
    input: {
        color: ['#999999', 'input'],
        fontSize: ['32px', 'range']
    }
};
export let Utils = {
    clone: clone,
    extend: extend
}
