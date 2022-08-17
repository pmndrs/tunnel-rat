import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React from 'react'
import tunnel from '../src'

describe('tunnelrat', () => {
  it('transports the children of In into Out', () => {
    const t = tunnel()

    const A = () => (
      <ul>
        <t.Out />
      </ul>
    )

    const B = () => (
      <div>
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
        <ul>
          <li>
            One
          </li>
        </ul>
        <div />
      </div>
    `)
  })

  it.todo('can handle multiple children')
})
