<center>
    <img src="/logo.jpg" alt="Tunnel Rat">
</center>

https://codesandbox.io/s/basic-demo-forked-kxq8g

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
