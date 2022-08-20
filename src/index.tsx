import React, { useLayoutEffect } from 'react'
import create from 'zustand'

type Props = { children: React.ReactNode }

interface TunnelStore {
  tunnels: Record<string, Partial<TunnelState> | undefined>
  setTunnel: (key: string, updaterFn: (state: TunnelState) => Partial<TunnelState>) => void
}

type TunnelState = {
  current: Array<React.ReactNode>
  version: number
}

const useStore = create<TunnelStore>((set) => ({
  tunnels: {},
  setTunnel: (key, updaterFn) => {
    set((state) => {
      /** Ensure the tunnel has defaults set */
      const tunnel = {
        current: [],
        version: 0,
        ...state.tunnels[key],
      }
      return {
        tunnels: {
          ...state.tunnels,
          [key]: {
            ...tunnel,
            ...updaterFn(tunnel),
          },
        },
      }
    })
  },
}))

export default function tunnel(key: string) {
  return {
    In: ({ children }: Props) => {
      const setTunnel = useStore((state) => state.setTunnel)
      const version = useStore((state) => state.tunnels[key]?.version ?? 0)

      /* When this component mounts, we increase the store's version number.
      This will cause all existing rats to re-render (just like if the Out component
      were mapping items to a list.) The re-rendering will cause the final 
      order of rendered components to match what the user is expecting. */
      useLayoutEffect(() => {
        setTunnel(key, (state) => ({
          version: state.version + 1,
        }))
      }, [])

      /* Any time the children _or_ the store's version number change, insert
      the specified React children into the list of rats. */
      useLayoutEffect(() => {
        setTunnel(key, ({ current }) => ({
          current: [...current, children],
        }))

        return () =>
          setTunnel(key, ({ current }) => ({
            current: current.filter((c) => c !== children),
          }))
      }, [children, version])

      return null
    },

    Out: () => {
      const current = useStore((state) => state.tunnels[key]?.current ?? [])
      return <>{current}</>
    },
  }
}
