import { __decorate } from "tslib";
import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";
export class Pipe extends BaseCustomWebComponentConstructorAppend {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this._width = '100';
        this._height = '20';
        this._color = '#3498db';
        this._flow = false;
        this._direction = 'horizontal';
    }

    static get observedAttributes() {
        return ['width', 'height', 'color', 'flow', 'direction'];
    }

    connectedCallback() {
        this.render();
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

    get direction() { return this._direction; }
    set direction(value) {
        this._direction = value;
        this.setAttribute('direction', value);
    }

    render() {
        const isHorizontal = this._direction === 'horizontal';
        const styles = `
            :host {
                display: inline-block;
            }
            .pipe-container {
                width: ${isHorizontal ? this._width : this._height}px;
                height: ${isHorizontal ? this._height : this._width}px;
                position: relative;
                background-color: ${this._color};
            }
            .flow-animation {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: repeating-linear-gradient(
                    ${isHorizontal ? '90deg' : '180deg'},
                    transparent,
                    transparent 10px,
                    rgba(255, 255, 255, 0.2) 10px,
                    rgba(255, 255, 255, 0.2) 20px
                );
                animation: flow 1s linear infinite;
            }
            @keyframes flow {
                0% {
                    transform: translate${isHorizontal ? 'X' : 'Y'}(0);
                }
                100% {
                    transform: translate${isHorizontal ? 'X' : 'Y'}(20px);
                }
            }
        `;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="pipe-container">
                ${this._flow ? '<div class="flow-animation"></div>' : ''}
            </div>
        `;
    }
}

customElements.define('pipe-component', Pipe);
