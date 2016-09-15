import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { EventCenter, Config, Utils } from '../assets/helper';

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
    }
    _handleChange(state) {
        this.setState(
            Utils.extend(this.state, state)
        );
    }
}

class Draggable extends BaseComponent {
    constructor (props) {
        super(props);
        this.state = {};
        this._ondrag = false;
    }
    componentDidMount () {
        let rect = document.getElementById(`${this.props.id}`).getBoundingClientRect();
        this.setState({
            top: rect.top,
            left: rect.left
        });
        $(`#${this.props.id} .s-drag`).on("mousedown", (event) => {
            this._ondrag = true;
            this._offsetY = this.state.top - event.clientY;
            this._offsetX = this.state.left - event.clientX;
        });
        $(`#${this.props.id} .s-drag`).on("mouseup", () => {
            this._ondrag = false;
        });
        EventCenter.bind('trackMouse', (mouseX, mouseY) => {
            if (!this._ondrag) return;
            this.setState({
                top: this._offsetY + mouseY,
                left: this._offsetX + mouseX
            });
        });
    }
    render (body) {
        let style = {};
        if (this.state !== {}) {
            style = {
                top: this.state.top+'px',
                left: this.state.left+'px'
            };
        }
        return (
            <div style={style} id={this.props.id}>
                <div className="s-window" ref='window'>
					<div className="s-row s-head">
						<div className="s-box s-rt">
							<button className="s-btn s-drag s-ct">
								DRAG
							</button>
						</div>
					</div>
					{body}
                    <div className="s-bot">
                        <div className="s-overlay">
                        </div>
                    </div>
				</div>

            </div>
        );
    }
}


class Renderer extends BaseComponent {
    constructor () {
        super();
        let modules = Object.keys(Config.modules);
        this.state = {
            module: modules[0],
            preset: Object.keys(Config.modules[modules[0]])[0],
            wrapper: 'row',
            style: {},
        };
    }
    componentDidMount () {
        EventCenter.bind('restartRenderer', (module, preset) => {
            this._handleChange({
                module: module,
                preset: preset
            });
        });
        EventCenter.bind('updateRenderer', (attr, value) => {
            this._handleChange({
                style: {
                    [attr]: value
                }
            });
        });
    }
    render () {
        let component, style, className;
        switch (this.state.module) {
            case 'button':
                style = Utils.clone(this.state.style);
                className = `s-btn-${this.state.preset}`;
                component = (
                    <button style={style} className={className}>button</button>
                );
                if (this.state.preset === 'circle') component = (
                    <button style={style} className={className}>
                        <span className="s-txt">button</span>
                    </button>
                );
                break;
            default:
                component = (
                    <span>Hi</span>
                );
        }
        let wrapper = <div className='s-box'>{component}</div>;
        if (this.state.wrapper === 'row') wrapper = (
            <div className='s-row'>
                <div className='s-box'>
                    {component}
                </div>
            </div>
        );
        return (wrapper);
    }
}

class Previewer extends Draggable {
    constructor (props) {
        super(props);
    }
    render () {
        return super.render(
            <div id='compile-source' className='s-body'>
                <Renderer />
            </div>
        );
    }
}


class Input extends BaseComponent {
    constructor (props) {
        super(props);
        this._bind('_compile', '_handleChange');
        this.state = {
            value: this.props.value
        }
    }
    _compile () {
        let onChange;
        if (this.props.type === 'range') {
            onChange = (event) => {
                let value = event.target.value;
                EventCenter.trigger('updateRenderer', this.props.attr, `${value}px`);
                this._handleChange({
                    value: value
                });
            };
            return (
                <tr className="s-tr-range">
                    <td colSpan="2">
                        <div className="s-box">
                            <span className="s-txt">{this.props.attr}</span>
                        </div>
                        <div className="s-box" data-msg={this.state.value}>
                            <input type="range" className='s-range' value={this.state.value} onChange={onChange} />
                        </div>
                        <div className="s-box">
                            <span className="s-txt s-info">{this.props.attr}</span>
                        </div>
                    </td>
                </tr>
            );
        } else if (this.props.type === 'input') {
            onChange = (event) => {
                let value = event.target.value;
                if (!$.isNumeric(value)) EventCenter.trigger('updateRenderer', this.props.attr, value);
                this._handleChange({
                    value: value
                });
            };
            return (
                <tr className='s-tr-input'>
                    <td colSpan="2">
                        <div className="s-box">
                            <span className="s-txt s-info" data-msg='Wrapper for the element'>{this.props.attr}</span>
                        </div>
                        <input type="text" className='s-input' value={this.state.value} onChange={onChange} />
                    </td>
                </tr>
            );
        }
    }
    componentWillReceiveProps (nextProps) {
        this._handleChange({
            value: nextProps.value
        });
    }
    render () {
        return (
            this._compile()
        );
    }
}

class Editor extends Draggable {
    constructor (props) {
        super(props);
        this._bind('_compile', '_handleChange');
        let modules = Object.keys(Config.modules);
        this.state = {
            module: modules[0],
            preset: Object.keys(Config.modules[modules[0]])[0],
        };
    }
    _compile () {
        // Build components
        let components = Object.keys(Config.modules).map((module, index) => {
            let className = "s-btn s-ct";
            let switchModule = () => {
                let preset = Object.keys(Config.modules[module])[0];
                EventCenter.trigger('restartRenderer', module, preset);
                this._handleChange({
                    module: module,
                    preset: preset
                });
            };
            // Highlight current module
            if (module === this.state.module) {
                className+=' active';
                switchModule = () => {
                    return 0
                };
            }
            return (
                <th key={index}>
                    <button className={className} onClick={switchModule} >
                        <span className="s-txt">{module}</span>
                    </button>
                </th>
            );
        });
        // Build Preset
        let presets = Object.keys(Config.modules[this.state.module]).map((preset, index) => {
            let className = "s-btn s-ct s-info";
            let loadPreset = () => {
                EventCenter.trigger('restartRenderer', this.state.module, preset);
                this._handleChange({
                    preset: preset
                });
            };
            if (preset === this.state.preset) {
                className+=' active';
                loadPreset = () => {
                    return 0
                };
            }
            return (
                <button className={className} data-msg="Consumes the entire line" onClick={loadPreset} key={index}>
                    {preset}
                </button>
            );
        });
        // Build attribute inputs
        let settings = Config.modules[this.state.module][this.state.preset];
        let inputs = Object.keys(settings).map((attr, index) => {
            let value = settings[attr].value;
            let type = settings[attr].type;
            return (
                <Input type={type} attr={attr} value={value} key={index} />
            );
        });
        return (
            <div className="s-body">
                <table className="s-table" id="editor-module">
                    <tbody>
                        <tr>
                            {components}
                        </tr>
                    </tbody>
                </table>
                <div className="s-form">
                    <div className='s-head'>
                        <button className="s-btn s-ct">
                            {this.state.module}
                        </button>
                    </div>
                    <div className='s-body'>
                        <table className='s-table'>
                            <tbody>
                                <tr className='s-tr-btn' key={-1}>
                                    <td>
                                        <div className="s-box">
                                            <span className="s-txt s-ct s-info" data-msg='Wrapper for the element'>Presets</span>
                                        </div>
                                    </td>
                                    <td>
                                        {presets}
                                    </td>
                                </tr>
                                {inputs}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    render () {
        this._body = this._compile();
        return super.render(
            this._body
        );
    }
}



// Page Logic
document.onmousemove = (event) => {
    EventCenter.trigger('trackMouse', event.clientX, event.clientY);
};



// Render
ReactDOM.render(<Previewer id="previewer" />, document.getElementById('previewer-wrap'));
ReactDOM.render(<Editor id="editor" />, document.getElementById('editor-wrap'));
