export interface IUserTransaction {
  coinId: string
  coinQuantity: number
  pricePerCoin: number
  type: string
  userId: string
  timestamp: number
}

export interface IUserCoin {
  logo: string
  name: string
  originalId: string
  symbol: string
}

export interface IUserQuery {
  transactions: IUserTransaction[]
  coins: IUserCoin[]
}
