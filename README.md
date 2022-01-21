<p align="center">
    <img src="/logo.jpg" alt="Tunnel Rat" height="600">
</p>
<br />
<br />

A cross renderer portal that allows you to project from one place into another. Demo: https://codesandbox.io/s/basic-demo-forked-kxq8g

```jsx
import tunnel from 'tunnel-rat'

const three = tunnel()
const dom = tunnel()

function App() {
  return (
    <div>
      <Canvas>
        <three.Out />
        <dom.In>
          <h1>hello</h1>
        </dom.In>
      </Canvas>

      <three.In>
        <mesh>
          <sphereGeometry />
        </mesh>
      </three.In>

      <dom.Out />
    </div>
  )
}
```
