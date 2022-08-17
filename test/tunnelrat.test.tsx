import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import tunnel from '../src'

describe('tunnelrat', () => {
  it('Transports the children of In into Out', () => {
    const t = tunnel()

    const A = () => (
      <ul id="a">
        <t.Out />
      </ul>
    )

    const B = () => (
      <div id="b">
        <t.In>
          <li>One</li>
        </t.In>
      </div>
    )

    const { container } = render(
      <>
        <A />
        <B />
      </>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul
          id="a"
        >
          <li>
            One
          </li>
        </ul>
        <div
          id="b"
        />
      </div>
    `)
  })
})
