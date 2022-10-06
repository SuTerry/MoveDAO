import { AptosClient, Types } from 'aptos'

import { NODE_URL } from './config'

const client = new AptosClient(NODE_URL)

interface RequestParameters {
  address?: string
  ledgerVersion?: number
}

interface TableItemProps {
  handle: string
  data: Types.TableItemRequest
}

export default class Abstract {
  protected address = ''

  protected waitForTransaction(hash: string): Promise<void> {
    return client.waitForTransaction(hash)
  } 

  protected getAccountResources({ address, ledgerVersion }: RequestParameters = {}): Promise<Types.MoveResource[]> {
    let ledgerVersionBig: bigint | undefined
    if (ledgerVersion) ledgerVersionBig = BigInt(ledgerVersion)
    const addressValue = address || this.address
    return client.getAccountResources(addressValue, { ledgerVersion: ledgerVersionBig })
  }

  protected getTableItem<T>({handle, data}: TableItemProps): Promise<T> {
    return client.getTableItem(handle, data)
  }
}