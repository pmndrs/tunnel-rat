<p align="center">
    <img src="https://user-images.githubusercontent.com/1061/185432665-ddfe409a-d399-4059-bd2f-bfefc2a97db1.png" alt="Tunnel Rat" height="600">
</p>

## Tunnel Rat 

- Beams React elements **from one place to another**!
- Works across **separate renderers**!
- Yes, it really does! Use it to easily **render HTML elements from within your @react-three/fiber application**!
- Squeak! 🐀

## Examples & Sandboxes

- https://codesandbox.io/s/basic-demo-forked-kxq8g

## Basic Usage

- Create a tunnel!
- Use the tunnel's `In` component to send elements into the tunnel!
- Use the tunnel's `Out` component to render them!

### Example

This example describes a simple React app that has both a HTML UI as well as a @react-three/fiber 3D scene. Each of these is rendered using separate React renderers, which traditionally makes emitting HTML from within the Canvas a bit of a pain; but thanks to tunnel-rat, this is now super easy!

```jsx
import { Canvas } from '@react-three/fiber'
import tunnel from 'tunnel-rat'

/* Create a tunnel. */
const ui = tunnel()

const App = () => (
  <div>
    <div id="ui">
      {/* Anything that goes into the tunnel, we want to render here. */}
      <ui.Out />
    </div>

    <Canvas>
      {/* Let's send something into the tunnel! */}
      <ui.In>
        <p>Hi, I'm a cube!</p>
      </ui.In>

      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>

      {/* You can send multiple things through the tunnel, and
      they will all show up in the order that you've defined them in! */}
      <ui.In>
        <p>And I'm a sphere!</p>
      </ui.In>

      <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>
    </Canvas>
  </div>
)
```

Of course, the whole thing also works the other way around:

```jsx
import { Canvas } from '@react-three/fiber'
import tunnel from 'tunnel-rat'

/* Create a tunnel. */
const three = tunnel()

const App = () => (
  <div>
    <div id="ui">
      {/* Let's beam something into the R3F Canvas! */}
      <three.In>
        <mesh>
          <sphereGeometry />
          <meshBasicMaterial />
        </mesh>
      </three.In>
    </div>

    <Canvas>
      {/* Render anything sent through the tunnel! */}
      <three.Out />
    </Canvas>
  </div>
)
```
