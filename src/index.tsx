import React, { ReactNode, useLayoutEffect } from 'react'
import create, { SetState } from 'zustand'

type Props = { children: React.ReactNode }

type Rats = Array<React.ReactNode>

export default function tunnel() {
  const useStore = create<{
    current: Rats
    set: SetState<{
      current: Rats
      set: any
    }>
  }>((set) => ({ current: new Array<ReactNode>(), set }))

  return {
    In: ({ children }: Props) => {
      const set = useStore((state) => state.set)

      useLayoutEffect(() => {
        set(({ current }) => ({ current: [...current, children] }))
        return () => void set(({ current }) => ({ current: current.filter((c) => c !== children) }))
      }, [children])

      return null
    },

    Out: () => {
      const current = useStore((state) => state.current)
      return <>{current}</>
    },
  }
}
