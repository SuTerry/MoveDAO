import { WalletNetworks } from '@store/modules/wallet'
import { truncateMiddle } from '@utils/index'

export const getAptosWallet = (): boolean => {
  return 'aptos' in window
}

export const isWalletConnected = async (): Promise<boolean> => {
  try {
    if (await window.aptos?.isConnected?.()) {
      return true
    }
  } catch (error) {
  }
  return false
}

export const isAccountCreated = async (): Promise<boolean> => {
  try {
    const res = await window.aptos?.isConnected?.()
    return typeof res === 'boolean'
  } catch (error) {
  }
  return false
}

export const connectToWallet = async (): Promise<boolean> => {
  try {
    const result = await window.aptos?.connect?.()
    if ('address' in result) return true
  } catch (error) {
  }
  return false
}

export const getAccountAddress: () => Promise<string | null> = async () => {
  try {
    const data = await window.aptos?.account?.()
    if ('address' in data) return data.address
  } catch (error) {
  }
  return null
}

export const getWalletNetwork: () => Promise<WalletNetworks> = async () => {
  try {
    return await window.aptos?.network?.()
  } catch (error) {
  }
  return 'Devnet'
}

export const isUpdatedVersion = (): boolean =>
  window.aptos?.on instanceof Function

export function truncateAddress(accountAddress: string): string {
  return truncateMiddle(accountAddress, 3, 3)
}