import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const AuthForm = ({ isLogin = false }) => {
  const navigate = useNavigate()

  const { saveToken } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const credentials = { email, password }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/${isLogin ? 'login' : 'signup'}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      )
      if (response.status === 201) {
        navigate('/login')
      }
      if (response.status === 200) {
        const parsed = await response.json()
        console.log(parsed.token)
        saveToken(parsed.token)
        navigate('/profile')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <label>
        Email:
        <input
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          type='email'
        />
      </label>
      <label>
        Password:
        <input
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          type='password'
        />
      </label>
      <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
    </form>
  )
}

export default AuthForm
