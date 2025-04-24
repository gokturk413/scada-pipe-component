import { __decorate } from "tslib";
import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";

export class CurvedPipe extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        this._size = '100';
        this._diameter = '20';
        this._color = '#3498db';
        this._flow = false;
        this._direction = 'top-right';
    }

    static get observedAttributes() {
        return ['size', 'diameter', 'color', 'flow', 'direction'];
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

    get diameter() { return this._diameter; }
    set diameter(value) {
        this._diameter = value;
        this.setAttribute('diameter', value);
    }

    get direction() { return this._direction; }
    set direction(value) {
        this._direction = value;
        this.setAttribute('direction', value);
    }

    render() {
        const thickness = this._diameter;
        
        // Calculate transform based on direction
        let transform = '';
        
        switch(this._direction) {
            case 'top-left':
                transform = 'scale(-1, 1)';
                break;
            case 'bottom-right':
                transform = 'scale(1, -1)';
                break;
            case 'bottom-left':
                transform = 'scale(-1, -1)';
                break;
            default: // top-right
                transform = 'scale(1, 1)';
        }

        const styles = `
            :host {
                display: inline-block;
            }
            .curved-pipe {
                width: ${this._size}px;
                height: ${this._size}px;
                position: relative;
                transform: ${transform};
            }
            svg {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            .pipe-path {
                fill: none;
                stroke: ${this._color};
                stroke-width: ${thickness}px;
                vector-effect: non-scaling-stroke; 
            }
            .flow-animation {
                fill: none;
                stroke: url(#flowGradient);
                stroke-width: ${thickness}px;
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

        const padding = thickness;
        const path = `M${padding} ${this._size - padding} Q${padding} ${padding} ${this._size - padding} ${padding}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="curved-pipe">
                <svg viewBox="0 0 ${this._size} ${this._size}">
                    <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
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
            </div>
        `;
    }
}

__decorate([
    property({ type: String })
], CurvedPipe.prototype, "size", void 0);

__decorate([
    property({ type: String })
], CurvedPipe.prototype, "diameter", void 0);

__decorate([
    property({ type: String })
], CurvedPipe.prototype, "color", void 0);

__decorate([
    property({ type: Boolean, values: [false, true] })
], CurvedPipe.prototype, "flow", void 0);

__decorate([
    property({ type: String, values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'] })
], CurvedPipe.prototype, "direction", void 0);

customElements.define('curved-pipe', CurvedPipe);
