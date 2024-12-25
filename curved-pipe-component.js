class CurvedPipe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._size = '100';
        this._color = '#3498db';
        this._flow = false;
        this._direction = 'top-right';
    }

    static get observedAttributes() {
        return ['size', 'color', 'flow', 'direction'];
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

    get direction() { return this._direction; }
    set direction(value) {
        this._direction = value;
        this.setAttribute('direction', value);
    }

    render() {
        const thickness = this._size / 5;
        
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
            }
            .flow-dots {
                fill: rgba(255, 255, 255, 0.2);
                animation: flow 2s linear infinite;
            }
            @keyframes flow {
                0% {
                    offset-distance: 0%;
                }
                100% {
                    offset-distance: 100%;
                }
            }
        `;

        const padding = thickness;
        const path = `M${padding} ${this._size - padding} Q${padding} ${padding} ${this._size - padding} ${padding}`;

        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <div class="curved-pipe">
                <svg viewBox="0 0 ${this._size} ${this._size}">
                    <path class="pipe-path" d="${path}"/>
                    ${this._flow ? `
                        <circle class="flow-dots" r="${thickness/4}" style="offset-path: path('${path}')"/>
                        <circle class="flow-dots" r="${thickness/4}" style="offset-path: path('${path}'); animation-delay: -0.5s"/>
                        <circle class="flow-dots" r="${thickness/4}" style="offset-path: path('${path}'); animation-delay: -1s"/>
                        <circle class="flow-dots" r="${thickness/4}" style="offset-path: path('${path}'); animation-delay: -1.5s"/>
                    ` : ''}
                </svg>
            </div>
        `;
    }
}

customElements.define('curved-pipe', CurvedPipe);
