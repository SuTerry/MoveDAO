import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  connectToWallet,
  getAccountAddress,
  getAptosWallet,
  getWalletNetwork,
  isAccountCreated,
  isWalletConnected,
} from '@utils/wallet'


export interface WalletState {
  isInstalled: boolean
  isConnected: boolean
  isAccountSet: boolean
  walletNetwork: WalletNetworks
  accountAddress: string | null
  isAsyncFinish: boolean
}

export type WalletNetworks = 'Devnet' | 'Testnet'


export const setWallet = createAsyncThunk(
  'wallet/setWallet',
  async () => {
    const isInstalled = getAptosWallet()
    const [
      isAccountSet,
      isConnected,
      walletNetwork,
      accountAddress,
    ] = await Promise.all([
      isAccountCreated(),
      isWalletConnected(),
      getWalletNetwork(),
      getAccountAddress(),
    ])

    return {
      isInstalled,
      isAccountSet,
      isConnected,
      walletNetwork,
      accountAddress,
    }
  }
)

export const connectWallet = createAsyncThunk(
  'wallet/connectWallet',
  async () => {
    const isConnected = await connectToWallet()
    if (isConnected) {
      const accountAddress = await getAccountAddress()
      return accountAddress
    }
  }
)

const wallet = createSlice({
  name: 'wallet',
  initialState: ({
    isInstalled: false,
    isAccountSet: false,
    isConnected: false,
    accountAddress: null,
    walletNetwork: 'Devnet',
    isAsyncFinish: false,
  } as WalletState),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(setWallet.fulfilled, (state, { payload }) => {
      state = Object.assign(state, payload, { isAsyncFinish: true })
    })
    builder.addCase(connectWallet.fulfilled, (state, { payload }) => {
      if (payload) {
        state.isConnected = true
        state.accountAddress = payload
      }
    })
  },
})

export default wallet.reducer