export let Config = {
    modules: {
        button: {
            circle: {
                size: {
                    value: 150,
                    type: 'range',
                    min: 50,
                    max: 300,
                },
                fontSize: {
                    value: 80,
                    type: 'range',
                    max: 72,
                    min: 16,
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
                    value: 18,
                    type: 'range',
                    max: 100,
                },
                padding: {
                    value: 10,
                    type: 'range',
                    max: 50
                },
                radius: {
                    value: 50,
                    type: 'range',
                    max: 100,
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
                size: {
                    value: 27,
                    type: 'range',
                    max: 40,
                    min: 20
                },
                padding: {
                    value: 4,
                    type: 'range',
                    min: 2,
                    max: 12
                },
                color: {
                    value: '#FFFFFF',
                    type: "input"
                },
                underline: {
                    value: '#aaaaaa',
                    type: "input"
                },
                background: {
                    value: 'transparent',
                    type: 'input'
                }
            },
            glow: {
                size: {
                    value: 27,
                    type: 'range',
                    max: 40,
                    min: 20
                },
                padding: {
                    value: 4,
                    type: 'range',
                    min: 2,
                    max: 12
                },
                width: {
                    value: 80,
                    type: 'range',
                    max: 100,
                    min: 20
                },
                border: {
                    value: '#d6d6d6',
                    type: "input"
                },
                color: {
                    value: '#333333',
                    type: "input"
                },
                background: {
                    value: 'white',
                    type: 'input'
                }
            }
        },
        slider: {
            'default': {
                padding: {
                    value: 0,
                    type: 'range',
                    max: 5
                },
                width: {
                    value: 80,
                    type: 'range',
                    max: 90,
                    min: 50
                },
                background: {
                    value: '#cacaca',
                    type: 'input'
                },
                info: {
                    value: '* For Chrome only *',
                    type: 'info'
                }
            }
        },
        popup: {
            popover: {
                info: {
                    value: "No styling support under current version :(",
                    type: 'info',
                },
            },
            popunder: {
                info: {
                    value: "No styling support under current version :(",
                    type: 'info',
                },
            }
        },
    },
};
