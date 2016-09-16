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
    return clone($.extend(true, prev, next));
};

let entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

const escapeHTML = function (string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
};


export let EventCenter = new MicroEvent();
export let Utils = {
    clone: clone,
    extend: extend,
    escapeHTML: escapeHTML,
}
