export interface UserState {
  params: {
    status: 'loading' | 'idle'
    exists: boolean
    authorized: boolean
    feedback: string | null
  }
}

export interface UserCredentials {
  email: string
  password: string
}

export interface UserResponse {
  message: string
  status: number
}
