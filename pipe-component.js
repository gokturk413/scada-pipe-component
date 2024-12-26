//import { __decorate } from "tslib";
//import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";

/*export*/ class Pipe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._size = 100; // Default size
        this._width = '100';
        this._height = '20';
        this._color = '#3498db';
        this._flow = false;
        this._orientation = 'horizontal';
    }

    static get observedAttributes() {
        return ['size', 'width', 'height', 'color', 'flow', 'orientation'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[`_${name}`] = newValue;
            this.render();
        }
    }

    get size() { return this._size; }
    set size(value) {
        this._size = value;
        this.setAttribute('size', value);
    }

    get width() { return this._width; }
    set width(value) {
        this._width = value;
        this.setAttribute('width', value);
    }

    get height() { return this._height; }
    set height(value) {
        this._height = value;
        this.setAttribute('height', value);
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
                width: ${this._orientation === 'horizontal' ? this._size + 'px' : this._height + 'px'};
                height: ${this._orientation === 'horizontal' ? this._height + 'px' : this._size + 'px'};
            }
            svg {
                width: 100%;
                height: 100%;
            }
            .pipe-path {
                fill: none;
                stroke: ${this._color};
                stroke-width: ${this._orientation === 'horizontal' ? this._height : this._size}px;
                vector-effect: non-scaling-stroke;
            }
            .flow-animation {
                fill: none;
                stroke: url(#flowGradient);
                stroke-width: ${this._orientation === 'horizontal' ? this._height : this._size}px;
                stroke-dasharray: 5;
                animation: flow 0.5s linear infinite;
                vector-effect: non-scaling-stroke;
            }
            @keyframes flow {
                0% {
                    stroke-dashoffset: 10;
                }
                100% {
                    stroke-dashoffset: 0;
                }
            }
        `;

        const path = this._orientation === 'horizontal' 
            ? `M0,${this._height/2} L${this._size},${this._height/2}`
            : `M${this._height/2},0 L${this._height/2},${this._size}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <svg viewBox="0 0 ${this._orientation === 'horizontal' ? this._size : this._height} ${this._orientation === 'horizontal' ? this._height : this._size}">
                <defs>
                    <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse" 
                        ${this._orientation === 'horizontal' 
                            ? 'x1="0%" y1="0%" x2="100%" y2="0%"' 
                            : 'x1="0%" y1="0%" x2="0%" y2="100%"'}>
                        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="20%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="80%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)"/>
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

customElements.define('pipe-component', Pipe);
