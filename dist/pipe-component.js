import { __decorate } from "tslib";
import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";

/*export*/ class Pipe extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this._width = '100';
        this._diameter = '20';
        this._color = '#3498db';
        this._flow = false;
        this._orientation = 'horizontal';
    }

    static get observedAttributes() {
        return ['width', 'diameter', 'color', 'flow', 'orientation'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[`_${name}`] = newValue;
            this.render();
        }
    }

    get width() { return this._width; }
    set width(value) {
        this._width = value;
        this.setAttribute('width', value);
    }

    get diameter() { return this._diameter; }
    set diameter(value) {
        this._diameter = value;
        this.setAttribute('diameter', value);
    }


    get color() { return this._color; }
    set color(value) {
        this._color = value;
        this.setAttribute('color', value);
    }

    get flow() { return this._flow; }
    set flow(value) {
        this._flow = value === 'true' || value === true;
        this.setAttribute('flow', value);
    }

    get orientation() { return this._orientation; }
    set orientation(value) {
        this._orientation = value;
        this.setAttribute('orientation', value);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `
            :host {
                display: inline-block;
                width: ${this._orientation === 'horizontal' ? this._width + 'px' : this._diameter + 'px'};
                height: ${this._orientation === 'horizontal' ? this._diameter + 'px' : this._width + 'px'};
            }
            svg {
                width: 100%;
                height: 100%;
            }
            .pipe-path {
                fill: none;
                stroke: ${this._color};
                stroke-width: ${this._orientation === 'horizontal' ? this._diameter : this._width}px;
                vector-effect: non-scaling-stroke;
            }
            .flow-animation {
                fill: none;
                stroke: url(#flowGradient);
                stroke-width: ${this._orientation === 'horizontal' ? this._diameter : this._width}px;
                stroke-dasharray: 10;
                animation: flow 0.5s linear infinite;
                vector-effect: non-scaling-stroke;
            }
            @keyframes flow {
                0% {
                    stroke-dashoffset: 10;
                }
                100% {
                    stroke-dashoffset: -10;
                }
            }
        `;

        const path = this._orientation === 'horizontal' 
            ? `M0,${this._diameter/2} L${this._width},${this._diameter/2}`
            : `M${this._diameter/2},0 L${this._diameter/2},${this._width}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <svg viewBox="0 0 ${this._orientation === 'horizontal' ? this._width : this._height} ${this._orientation === 'horizontal' ? this._height : this._width}">
                <defs>
                    <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse" 
                        ${this._orientation === 'horizontal' 
                            ? 'x1="0%" y1="0%" x2="100%" y2="0%"' 
                            : 'x1="0%" y1="0%" x2="0%" y2="100%"'}>
                        <stop offset="0%" stop-color="transparent"/>
                        <stop offset="20%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="80%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="100%" stop-color="transparent"/>
                    </linearGradient>
                </defs>
                <path class="pipe-path" d="${path}"/>
                ${this._flow ? `
                    <path class="flow-animation" d="${path}"/>
                ` : ''}
            </svg>
        `;
    }
}

__decorate([
    property({ type: String })
], Pipe.prototype, "width", void 0);

__decorate([
    property({ type: String })
], Pipe.prototype, "diameter", void 0);

__decorate([
    property({ type: String })
], Pipe.prototype, "color", void 0);

__decorate([
    property({ type: Boolean, values: [false, true] })
], Pipe.prototype, "flow", void 0);

__decorate([
    property({ type: String, values: ['horizontal', 'vertical'] })
], Pipe.prototype, "orientation", void 0);

customElements.define('pipe-component', Pipe);
