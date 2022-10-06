const env = process.env.WEB_ENV

export const NODE_URL =
  (env === 'pro') ? ''
    : (env === 'pre' ? ''
      : (env === 'sit' ? 'https://testnet.aptoslabs.com'
        : (env === 'dev' ? 'https://fullnode.devnet.aptoslabs.com'
          : 'https://fullnode.devnet.aptoslabs.com')))

export const PROPOSALS_ADDRESS = '0xbe2101583256a60f3b4c722d0a73a0fa4f8449a61bb9806b74aa23b3e65dee5b'