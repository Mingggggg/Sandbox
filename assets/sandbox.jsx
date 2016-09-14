import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { EventCenter, Config, Utils } from '../assets/helper';

class BaseComponent extends React.Component {
    _bind(...methods) {
        methods.forEach( (method) => this[method] = this[method].bind(this) );
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
        return (<div style={style} id={this.props.id}>
                    <div className="s-window" ref='window'>
    					<div className="s-row s-head">
    						<div className="s-box s-rt">
    							<button className="s-btn s-drag s-ct">
    								DRAG
    							</button>
    						</div>
    					</div>
    					{body}
    				</div>
                </div>);
    }
}

class Previewer extends Draggable {
    constructor (props) {
        super(props);
    }
    render () {
        return super.render(<div className="s-body"></div>);
    }
}

class Editor extends Draggable {
    constructor (props) {
        super(props);
        this._bind('_compile', '_handleChange');
        this.state = {
            module: Config.modules[0],
            wrapper: 'row'
        };
    }
    _handleChange(state) {
        this.setState(
            Utils.extend(this.state, state
        ));
    }
    _compile () {
        // Build components
        let components = Config.modules.map((module, index) => {
            let className = "s-btn s-ct";
            let switchModule = () => {
                this._handleChange({
                    module: module,
                    wrapper: this.state.wrapper
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
                <th id={index} key={index}>
                    <button className={className} onClick={switchModule} >
                        <span className="s-txt">{module}</span>
                    </button>
                </th>
            );
            <td>
                <button className="s-btn s-ct s-info" data-msg="Consumes the entire line">
                    <span className="s-txt">Row</span>
                </button>
                <button className="s-btn s-ct s-info" data-msg="Consumes the dimension of the object only">
                    <span className="s-txt">Box</span>
                </button>
            </td>
        });
        // Build Wrapper Select
        let wrappers = ['row', 'box'].map((wrapper, index) => {
            let className = "s-btn s-ct s-info";
            let switchWrapper = () => {
                this._handleChange({
                    module: this.state.module,
                    wrapper: wrapper
                });
            };
            if (wrapper === this.state.wrapper) {
                className+=' active';
                switchWrapper = () => {
                    return 0
                };
            }
            return (
                <button className={className} data-msg="Consumes the entire line" onClick={switchWrapper} key={index}>
                    <span className="s-txt">{wrapper}</span>
                </button>
            );

        });
        // Build attribute inputs
        let settings = Config[this.state.module];
        let inputs = Object.keys(settings).map((attr, index) => {
            let value = settings[attr][0];
            let type = settings[attr][1];
            return (
                <Input type={type} attr={attr} value={value} key={index} subkey={index} />
            );
        });

        // .map((module, index) => {
        //     let className = "s-btn s-ct";
        //     let switchModule = () => {
        //         this._handleChange({
        //             module: module
        //         });
        //     };
        //     // Highlight current module
        //     if (module === this.state.module) {
        //         className+=' active';
        //         switchModule = () => {
        //             return 0
        //         };
        //     }
        //     return (
        //         <th id={index} key={index}>
        //             <button className={className} onClick={switchModule} >
        //                 <span className="s-txt">{module}</span>
        //             </button>
        //         </th>
        //     );
        // });
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
                                <tr className='s-tr-wrap' key={-1}>
                                    <td>
                                        <div className="s-box">
                                            <span className="s-txt s-info" data-msg='Wrapper for the element'>Wrapper</span>
                                        </div>
                                    </td>
                                    <td>
                                        {wrappers[0]}
                                        {wrappers[1]}
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

class Input extends BaseComponent {
    constructor (props) {
        super(props);
        this._bind('_compile', '_handleChange');
        this.state = {
            value: this.props.value
        }
    }
    _handleChange(state) {
        this.setState(
            Utils.extend(this.state, state)
        );
    }
    _compile () {
        if (this.props.type === 'range') {
            var onChange = (event) => {
                this._handleChange({
                    value: event.target.value
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
            return (
                <tr className='s-tr-input'>
                    <td>
                        <div className="s-box">
                            <span className="s-txt s-info" data-msg='Wrapper for the element'>{this.props.attr}</span>
                        </div>
                    </td>
                    <td>
                        <button className="s-btn s-ct s-info" data-msg="Consumes the entire line">
                            <span className="s-txt">{this.props.value}</span>
                        </button>
                    </td>
                </tr>
            );
        }
    }
    render () {
        // this._body
        return (
            this._compile()
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
