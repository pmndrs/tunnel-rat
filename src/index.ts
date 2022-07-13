import React, { useLayoutEffect } from 'react'
import create, { SetState } from 'zustand'

type Props = { children: React.ReactNode }

export default function tunnel() {
  const useStore = create<{
    current: Array<React.ReactNode>
    set: SetState<{
      current: Array<React.ReactNode>
      set: any
    }>
  }>((set) => ({ current: [], set }))
  return {
    In: ({ children }: Props) => {
      const set = useStore((state) => state.set)
      
      useLayoutEffect(() => {
        set(({ current }) => {
          const clone = [...current]
          clone.push(children)

          return { current: clone }
        })
        
        return () => {
          set(({ current }) => {
            const index = current.indexOf(children)

            const clone = [...current]
            clone.splice(index, 1)

            return { current: clone }
          })
        }
      }, [children])

      return null
    },
    Out: () => {
      const current = useStore((state) => state.current)
      return current as Array<React.ReactNode>
    },
  }
}

