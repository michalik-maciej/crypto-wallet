import SignInForm from '../../features/SignInForm/SignInForm'
import { useAppSelector } from '../../../redux/hooks'
import { getUserLogged } from '../../../redux/userSlice'
import SignOutForm from '../../features/SignOutForm/SignOutForm'

export default function LoginPage() {
  const logged = useAppSelector((state) => getUserLogged(state))
  return logged ? <SignOutForm /> : <SignInForm />
}
