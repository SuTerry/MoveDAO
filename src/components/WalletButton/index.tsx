import React from 'react'

import {
  Button,
  ButtonBaseProps,
  ButtonProps,
  Link,
  Stack,
  Tooltip,
} from '@mui/material'

import ErrorIcon from '@mui/icons-material/Error'

import { cstInstallWalletUrl } from '@constants/wallet'

import { isUpdatedVersion, truncateAddress } from '@utils/wallet'

import { useAppDispatch, useAppSelector } from '@store/index'

// import { connectWalletAsync } from '@store/modules/wallet'
import { connectWallet } from '@store/modules/wallet'

type WalletButtonWrapperProps = {
  text: string | null
}

const WalletButtonWrapper = ({
  text,
  ...props
}: WalletButtonWrapperProps & ButtonBaseProps & ButtonProps): JSX.Element => {

  return (
    <Button
      variant="contained"
      {...props}
    >
      {text}
    </Button>
  )
}

const OldWalletVersionWarning = (): JSX.Element => {
  const warningText = (
    <Link
      href="https://github.com/aptos-labs/aptos-core/releases/"
      target="_blank"
    >
      请安装最新的 Aptos 钱包扩展
    </Link>
  )
  return (
    <Tooltip title={warningText}>
      <Stack ml={1}>
        <ErrorIcon />
      </Stack>
    </Tooltip>
  )
}

interface WalletButtonProps extends ButtonProps {
  text?: string
}

export const WalletButton = ({ text, ...props }: WalletButtonProps): JSX.Element => {
  const { isInstalled, isConnected, isAccountSet, accountAddress } = useAppSelector(state => state.wallet)
  const dispatch = useAppDispatch()

  if (!isInstalled) {
    return (
      <Tooltip
        title={
          <Link href={cstInstallWalletUrl} target="_blank" color="#fff">
            请安装 Aptos 钱包
          </Link>
        }
      >
        <span>
          <WalletButtonWrapper disabled text={text || '安装钱包'} {...props} />
        </span>
      </Tooltip>
    )
  }

  const isWalletLatestVersion = isUpdatedVersion()

  return (
    <>
      {isInstalled && !isAccountSet && (
        <Tooltip title="使用钱包创建帐户">
          <span>
            <WalletButtonWrapper disabled text={text || '创建用户'} {...props}>
              {!isWalletLatestVersion && <OldWalletVersionWarning />}
            </WalletButtonWrapper>
          </span>
        </Tooltip>
      )}

      {isInstalled && isAccountSet && !isConnected && (
        <WalletButtonWrapper
          {...props}
          onClick={() => dispatch(connectWallet())}
          text={text || '连接钱包'}
        >
          {!isWalletLatestVersion && <OldWalletVersionWarning />}
        </WalletButtonWrapper>
      )}

      {isInstalled && isConnected && (
        <WalletButtonWrapper
          text={text || accountAddress && truncateAddress(accountAddress)}
          {...props}
        >
          {!isWalletLatestVersion && <OldWalletVersionWarning />}
        </WalletButtonWrapper>
      )}
    </>
  )
}
