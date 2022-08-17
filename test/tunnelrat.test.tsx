import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import tunnel from '../src'

describe('tunnelrat', () => {
  it('Transports the children of In into Out', () => {
    const t = tunnel()

    const A = () => (
      <ul>
        <t.Out />
      </ul>
    )

    const B = () => (
      <t.In>
        <li>One</li>
      </t.In>
    )

    const { container } = render(
      <>
        <A />
        <B />
      </>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            One
          </li>
        </ul>
      </div>
    `)
  })
})
