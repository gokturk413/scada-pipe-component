import { __decorate } from "tslib";
import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";

export class CurvedPipe extends BaseCustomWebComponentConstructorAppend {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' }); // Shadow DOM attached
        this._size = 100; // Default size
        this._color = '#3498db';
        this._flow = false;
        this._direction = 'top-right';
    }

    static get observedAttributes() {
        return ['size', 'color', 'flow', 'direction'];
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

    get direction() { return this._direction; }
    set direction(value) {
        this._direction = value;
        this.setAttribute('direction', value);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `
            :host {
                display: inline-block;
                width: ${this._size}px;
                height: ${this._size}px;
            }
            svg {
                width: 100%;
                height: 100%;
            }
            .curved-pipe {
                fill: none;
                stroke: ${this._color};
                stroke-width: ${this._size / 5}px;
                vector-effect: non-scaling-stroke;
            }
            .flow-animation {
                fill: none;
                stroke: url(#flowGradient);
                stroke-width: ${this._size / 5}px;
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

        const path = `M${this._size / 2} ${this._size} Q${this._size / 2} ${this._size / 2} ${this._size} ${this._size / 2}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <svg viewBox="0 0 ${this._size} ${this._size}">
                <defs>
                    <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="20%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="80%" stop-color="rgba(255, 255, 255, 0.2)"/>
                        <stop offset="100%" stop-color="rgba(255, 255, 255, 0.2)"/>
                    </linearGradient>
                </defs>
                <path class="curved-pipe" d="${path}"/>
                ${this._flow ? `
                    <path class="flow-animation" d="${path}"/>
                ` : ''}
            </svg>
        `;
    }
}

customElements.define('curved-pipe', CurvedPipe);
