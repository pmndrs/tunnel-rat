import '@testing-library/jest-dom'
import { act, render, fireEvent, screen } from '@testing-library/react'
import React, { ReactNode } from 'react'
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

  it('retains the expected order of multiple children after un- and remounts', () => {
    const t = tunnel()

    const Rat = ({ name }: { name: string }) => {
      const [visible, setVisible] = React.useState(true)

      return (
        <div>
          <button onClick={() => setVisible(!visible)}>Toggle {name}</button>
          {visible ? (
            <t.In>
              <li>{name}</li>
            </t.In>
          ) : null}
        </div>
      )
    }

    const A = () => (
      <ul>
        <t.Out />
      </ul>
    )

    const B = () => (
      <div>
        <Rat name="One" />
        <Rat name="Two" />
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
        <div>
          <div>
            <button>
              Toggle 
              One
            </button>
          </div>
          <div>
            <button>
              Toggle 
              Two
            </button>
          </div>
        </div>
      </div>
    `)

    /* Remove the first child */
    fireEvent.click(screen.getByText('Toggle One'))

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            Two
          </li>
        </ul>
        <div>
          <div>
            <button>
              Toggle 
              One
            </button>
          </div>
          <div>
            <button>
              Toggle 
              Two
            </button>
          </div>
        </div>
      </div>
    `)

    /* Re-add it */
    fireEvent.click(screen.getByText('Toggle One'))

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
        <div>
          <div>
            <button>
              Toggle 
              One
            </button>
          </div>
          <div>
            <button>
              Toggle 
              Two
            </button>
          </div>
        </div>
      </div>
    `)
  })
})
