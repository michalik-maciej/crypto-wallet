import { IUserQueryResponse } from '../../../services/local.types'
import { IPriceQueryResponse } from '../../../services/coingecko.types'
import { ISubWalletProps } from '../../features/SubWallet/SubWallet'

export interface ISingleAsset {
  coin: {
    originalId: string
    logo: string
    name: string
    symbol: string
  }
  holdings: { original: number; usd: number }
  netCost: number
  currentPrice: number
  profit: number
}

export interface ISubWallet extends ISubWalletProps {
  id: string
}

export default function DataFormatter(
  userData: IUserQueryResponse,
  currentPrices: Record<string, IPriceQueryResponse>
) {
  function dataIsValid(data: IUserQueryResponse) {
    return (
      data?.coins &&
      data?.transactions &&
      currentPrices &&
      Object.entries(currentPrices).length > 0 &&
      currentPrices.constructor === Object
    )
  }

  function initSubWallets(data: IUserQueryResponse) {
    const walletLabels = [
      ...new Set(data.transactions.map(({ subWalletLabel }) => subWalletLabel))
    ]
    const output = walletLabels.map((label) => ({
      id: label,
      assets: [
        ...data.coins.map((coin) => ({
          coin,
          holdings: { original: 0, usd: 0 },
          netCost: 0,
          currentPrice: 0,
          profit: 0
        }))
      ],
      total: { holdings: 0, netCost: 0 }
    }))

    return output
  }

  function mapTransactionsToAssets({
    assets,
    transactions
  }: {
    assets: ISingleAsset[]
    transactions: IUserQueryResponse['transactions']
  }) {
    transactions.forEach(({ coinId, coinQuantity, type, pricePerCoin }) => {
      const asset = assets.find(({ coin }) => coin.originalId === coinId)

      if (asset) {
        if (type === 'deposit') {
          asset.holdings.original += coinQuantity
          asset.netCost += coinQuantity * pricePerCoin
        }
        if (type === 'withdraw') {
          asset.holdings.original -= coinQuantity
          asset.netCost -= coinQuantity * pricePerCoin
        }
      }
    })
    return transactions
  }

  function formatSubWallet({ assets, total }: ISubWallet) {
    assets.forEach((a) => {
      a.currentPrice = parseFloat(currentPrices[a.coin.originalId].usd)
      a.holdings.usd = a.holdings.original * a.currentPrice
      a.profit = a.holdings.usd - a.netCost
      total.holdings += a.holdings.usd
      total.netCost += a.netCost
    })
    assets.sort((a, b) => (a.holdings.usd > b.holdings.usd ? -1 : 1))

    return assets.filter((a) => a.holdings.original > 0)
  }

  let subWallets: ISubWallet[] = []
  // validate input data
  if (dataIsValid(userData)) {
    // init subWallets from user data
    subWallets = initSubWallets(userData)

    // map transactions to assets in each subwallet
    subWallets.forEach((wallet) => {
      mapTransactionsToAssets({
        assets: wallet.assets,
        transactions: userData.transactions.filter(
          (transaction) => transaction.subWalletLabel === wallet.id
        )
      })
      // recalculate sort and filter
      wallet.assets = formatSubWallet(wallet)
    })
  }

  return subWallets
}
