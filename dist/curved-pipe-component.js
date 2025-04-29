import { __decorate } from "tslib";
import { BaseCustomWebComponentConstructorAppend, css, cssFromString, customElement, DomHelper, html, property } from "@node-projects/base-custom-webcomponent";

export class CurvedPipe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
        const styles = `
            :host {
                display: inline-block;
                width: ${this._size}px;
                height: ${this._size}px;
                position: relative;
            }
            .curved-pipe {
                width: 100%;
                height: 100%;
                position: absolute;
            }
            svg {
                width: 100%;
                height: 100%;
                overflow: visible;
                position: absolute;
                left: ${this._direction.includes('left') ? this._diameter/2 : -this._diameter/2}px;
                top: ${this._direction.includes('top') ? this._diameter/2 : -this._diameter/2}px;
            }
            .pipe-path {
                fill: none;
                stroke: ${this._color};
                stroke-width: ${this._diameter};
                vector-effect: non-scaling-stroke;
            }
            .flow-animation {
                fill: none;
                stroke: url(#flowGradient);
                stroke-width: ${this._diameter};
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

        // Convert string values to numbers and remove 'px'
        const size = parseFloat(this._size);
        const diameter = parseFloat(this._diameter);
        const padding = 0; // Removed padding
        const viewBoxSize = size;

        const path = this._direction === 'top-right' ? `M0,${size} Q0,0 ${size},0` :
                    this._direction === 'top-left' ? `M${size},${size} Q${size},0 0,0` :
                    this._direction === 'bottom-right' ? `M0,0 Q0,${size} ${size},${size}` :
                    `M${size},0 Q${size},${size} 0,${size}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="curved-pipe">
                <svg viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">
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

var Direction;
(function (Direction){
  Direction["TOP_RIGHT"]="top-right";
  Direction["TOP_LEFT"]="top-left";
  Direction["BOTTOM_RIGHT"]="bottom-right";
  Direction["BOTTOM_LEFT"]="bottom-left";
})(Direction||(Direction={}));


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
    property({ type: Direction, values: [Direction.TOP_RIGHT, Direction.TOP_LEFT, Direction.BOTTOM_RIGHT, Direction.BOTTOM_LEFT] })
], CurvedPipe.prototype, "direction", void 0);

customElements.define('curved-pipe', CurvedPipe);
