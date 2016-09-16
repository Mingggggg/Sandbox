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
                    value: '#848484',
                    type: 'input'
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
};
