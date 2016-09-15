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


export let EventCenter = new MicroEvent();
export let Config = {
    modules: {
        button: {
            circle: {
                size: {
                    value: 100,
                    type: 'range'
                },
                fontSize: {
                    value: 18,
                    type: 'range'
                },
                color: {
                    value: '#FFFFFF',
                    type: "input"
                },

                background: {
                    value: '#40b572',
                    type: 'input'
                }
            },
            square: {
                size: {
                    value: 10,
                    type: 'range'
                },
                fontSize: {
                    value: 18,
                    type: 'range'
                },
                radius: {
                    value: 50,
                    type: 'range'
                },
                color: {
                    value: '#FFFFFF',
                    type: "input"
                },
                background: {
                    value: '#40b572',
                    type: 'input'
                }
            }
        },
        input: {
            underline: {
                padding: {
                    value: 10,
                    type: 'range'
                },
                color: {
                    value: '#999999',
                    type: "input"
                }
            },
            glow: {
                padding: {
                    value: 10,
                    type: 'range'
                },
                color: {
                    value: '#888888',
                    type: "input"
                }
            }
        },
        slider: {
            padding: {
                value: 10,
                type: 'range'
            },
            color: {
                value: '#999999',
                type: "input"
            }
        },
        popup: {
            padding: {
                value: 10,
                type: 'range'
            },
            color: {
                value: '#999999',
                type: "input"
            }
        },
    },
    presets: {
        button: {
            circle: {
                borderRadius: '50%',
                width: "50px",
                paddingBottom: "50px",
            },
            square: {

            },
        },
        input: {
            underline: {
                borderRadius: '50%',
                width: "50px",
                paddingBottom: "50px",
            },
            glow: {

            },
        }
    }
};
export let Utils = {
    clone: clone,
    extend: extend
}
