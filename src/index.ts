import React, { useEffect } from 'react'
import create, { SetState } from 'zustand'

type Props = { children: React.ReactNode }

export default function tunnel() {
  const useStore = create<{
    current: React.ReactNode | null
    set: SetState<{
      current: React.ReactNode | null
      set: any
    }>
  }>((set) => ({ current: null, set }))
  return {
    In: ({ children }: Props) => {
      const set = useStore((state) => state.set)
      useEffect(() => {
        set({ current: children })
        return () => void set({ current: null })
      }, [children])
      return null
    },
    Out: () => {
      const current = useStore((state) => state.current)
      return current as React.ReactElement | null
    },
  }
}
