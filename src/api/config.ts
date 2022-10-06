const env = process.env.WEB_ENV

export const NODE_URL =
  (env === 'pro') ? ''
    : (env === 'pre' ? ''
      : (env === 'sit' ? 'https://testnet.aptoslabs.com'
        : (env === 'dev' ? 'https://fullnode.devnet.aptoslabs.com'
          : 'https://fullnode.devnet.aptoslabs.com')))

export const PROPOSALS_ADDRESS = '0xcbd71dedc1dee262258e1ab47ee97b6bbcea778868502e71072e876db4b4ad5b'