export interface IUserTransaction {
  coinId: string
  subWalletLabel: string
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

export interface IUserQueryResponse {
  transactions: IUserTransaction[]
  coins: IUserCoin[]
}

export interface IUserLoginInput {
  email: string
  password: string
}

export interface IUserLoginOutput {
  userId: string
  message: string
  admin: boolean
}
