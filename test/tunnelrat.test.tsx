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

  it('can handle multiple children', () => {
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
        <t.In>
          <li>Two</li>
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
          <li>
            Two
          </li>
        </ul>
        <div />
      </div>
    `)
  })
})
