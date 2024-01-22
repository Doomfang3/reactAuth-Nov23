import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          ) : (
            <>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {isAuthenticated && (
        <button type='button' onClick={logout}>
          Logout
        </button>
      )}
    </>
  )
}

export default Navbar
