export interface UserState {
  status: 'loading' | 'idle'
  logged: boolean
  email: string | null
  error: null
}
