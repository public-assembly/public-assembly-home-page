import NextNProgress from 'nextjs-progressbar'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { createClient, chain, configureChains, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { SWRConfig } from 'swr'
import '@rainbow-me/rainbowkit/styles.css';

const alchemyID = process.env.NEXT_PUBLIC_ALCHEMY_KEY

const { chains, provider } = configureChains(
  [chain.mainnet], 
  [
    alchemyProvider({ 
      apiKey: alchemyID,
      priority: 0 
    }),
    publicProvider()
  ]
)

const { connectors } = getDefaultWallets({
  appName: 'Public Assembly',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function AppWrapper({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        coolMode
        theme={lightTheme({
          accentColor: 'black',
          borderRadius: 'large',
        })}>
        <SWRConfig
          value={{
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}>
          <NextNProgress
            color="rgba(0,0,0,.5)"
            startPosition={0.125}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          {children}
        </SWRConfig>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
