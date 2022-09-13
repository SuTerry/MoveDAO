import { useState, useEffect } from 'react'
import {
  connectToWallet,
  getAccountAddress,
  getAptosWallet,
  getWalletNetwork,
  isUpdatedVersion,
  isAccountCreated,
  isWalletConnected,
} from '@utils/wallet'
import { walletContext, WalletNetworks } from './context'

export function useWallet(): walletContext {
  const [isInstalled] = useState<boolean>(getAptosWallet())
  const [isAccountSet, setIsAccountSet] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [walletNetwork, setWalletNetwork] = useState<WalletNetworks>('Devnet')

  interface AccountChanged {
    address: string
  }

  useEffect(() => {
    isAccountCreated().then(setIsAccountSet)
    isWalletConnected().then(setIsConnected)
    getWalletNetwork().then(setWalletNetwork)
  }, [isInstalled, accountAddress, isAccountSet])

  useEffect(() => {
    if (isUpdatedVersion()) {
      window.aptos?.on?.('accountChanged', (account: AccountChanged) => {
        if (account.address) {
          setAccountAddress(account.address)
        } else {
          setAccountAddress(null)
          setIsAccountSet(true)
        }
      })
      window.aptos?.on?.("networkChanged", (newNetwork: WalletNetworks) => {
        setWalletNetwork(newNetwork)
      })
    }
  }, [])

  useEffect(() => {
    if (isConnected) {
      getAccountAddress().then(setAccountAddress)
    }
  }, [isConnected])

  const connect = async () => {
    connectToWallet().then(setIsConnected)
  }

  return {
    isInstalled,
    isAccountSet,
    isConnected,
    accountAddress,
    walletNetwork,
    connect,
  }
}
