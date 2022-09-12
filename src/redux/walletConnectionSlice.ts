import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
export interface WalletConnection {
  wallets: any
}

const initialState: WalletConnection = {
  wallets: []
}

const injected = injectedModule()

const rpcApiKey = process.env.NEXT_PUBLIC_QN_API_KEY;

const rpcUrl = `https://solemn-attentive-sound.quiknode.pro/${rpcApiKey}`

// initialize blocknative 
const onboard = Onboard({
  wallets: [injected],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ],
  apiKey: rpcApiKey,
  appMetadata: {
    name: 'Token Swap',
    icon: 'https://avatars.githubusercontent.com/u/3100998?v=4', // svg string icon
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: true
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true
    }
  },
  i18n: {
    en: {
      connect: {
        selectingWallet: {
          header: 'Connect your wallet'
        }
      }
    }
  }
})

export const getWalletConnection = createAsyncThunk(
  'getWalletConnection',
  async () => {
    const wallets = await onboard.connectWallet()
    return wallets[0].accounts;
  }
)

export const disconnectWallet = createAsyncThunk(
  'disconnectWallet',
  async () => {
    const [primaryWallet] = onboard.state.get().wallets
    await onboard.disconnectWallet({ label: primaryWallet.label })
  }
)


export const WalletConnectionSlice = createSlice({
  name: 'WalletConnection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWalletConnection.fulfilled, (state, action) => {
        console.log(action.payload)
        const stateWalletData = action.payload
        state.wallets = [...stateWalletData];
      })
      .addCase(disconnectWallet.fulfilled, (state) => {
        state.wallets = onboard?.state?.get()?.wallets || [];
      })
  },
})

export default WalletConnectionSlice.reducer
