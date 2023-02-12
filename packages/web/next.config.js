const withTM = require('next-transpile-modules')([
  '@solana/wallet-adapter-base',
  '@solana/wallet-adapter-react',
  '@solana/wallet-adapter-react-ui',
])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  publicRuntimeConfig: {
    USDC_REF_ADDRESS: process.env.USDC_REF_ADDRESS,
  },
  webpack: (config) => {
    config.module.rules
      .filter(({ loader }) => loader === 'babel-loader')
      .map((l) => (l.options.cacheDirectory = false))
    config.resolve.fallback = {
      fs: false,
      stream: false,
      path: false,
      os: false,
      crypto: false,
    }

    return config
  },
})
