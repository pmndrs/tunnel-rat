import React, { ReactNode, useLayoutEffect } from 'react'
import create, { SetState } from 'zustand'

type Props = { children: React.ReactNode }

type Rats = Array<React.ReactNode>

export default function tunnel() {
  const useStore = create<{
    current: Rats
    version: number
    set: SetState<{
      current: Rats
      version: number
      set: any
    }>
  }>((set) => ({
    current: new Array<ReactNode>(),
    version: 0,
    set,
  }))

  return {
    In: ({ children }: Props) => {
      const set = useStore((state) => state.set)
      const version = useStore((state) => state.version)

      useLayoutEffect(() => {
        set((state) => ({
          version: state.version + 1,
        }))
      }, [])

      useLayoutEffect(() => {
        set(({ current }) => ({
          current: [...current, children],
        }))

        return () =>
          set(({ current }) => ({
            current: current.filter((c) => c !== children),
          }))
      }, [children, version])

      return null
    },

    Out: () => {
      const current = useStore((state) => state.current)
      return <>{current}</>
    },
  }
}
