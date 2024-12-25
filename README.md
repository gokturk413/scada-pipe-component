# SCADA Pipe Component

A collection of web components for creating SCADA/HMI pipe visualizations with flow animations.

## Installation

```bash
npm install scada-pipe-component
```

## Usage

Import the components in your JavaScript file:

```javascript
import 'scada-pipe-component';
```

Or include it directly in your HTML:

```html
<script src="node_modules/scada-pipe-component/index.js"></script>
```

### Horizontal/Vertical Pipe

```html
<!-- Horizontal pipe with flow animation -->
<pipe-component 
    direction="horizontal" 
    width="300" 
    height="20" 
    color="#3498db" 
    flow="true">
</pipe-component>

<!-- Vertical pipe -->
<pipe-component 
    direction="vertical" 
    width="200" 
    height="20" 
    color="#e74c3c" 
    flow="false">
</pipe-component>
```

### Curved Pipe

```html
<!-- 90-degree curved pipe with flow animation -->
<curved-pipe 
    size="100" 
    color="#3498db" 
    flow="true" 
    direction="top-right">
</curved-pipe>
```

## Properties

### Pipe Component

| Property   | Type    | Default      | Description                                |
|-----------|---------|-------------|--------------------------------------------|
| direction | string  | 'horizontal'| Pipe direction ('horizontal' or 'vertical') |
| width     | number  | 100         | Width of the pipe in pixels                |
| height    | number  | 20          | Height/thickness of the pipe in pixels     |
| color     | string  | '#3498db'   | Color of the pipe                         |
| flow      | boolean | false       | Enable/disable flow animation              |

### Curved Pipe Component

| Property  | Type    | Default    | Description                                           |
|-----------|---------|------------|-------------------------------------------------------|
| size      | number  | 100        | Size of the curved pipe container in pixels          |
| color     | string  | '#3498db'  | Color of the pipe                                    |
| flow      | boolean | false      | Enable/disable flow animation                        |
| direction | string  | 'top-right'| Curve direction ('top-right', 'top-left', 'bottom-right', 'bottom-left') |

## License

MIT
