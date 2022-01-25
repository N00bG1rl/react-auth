import { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import classes from './ProfileForm.module.css'

const ProfileForm = () => {
  const history = useHistory()
  const newPasswordInputRef = useRef()
  // Get idToken from ...
  const authCtx = useContext(AuthContext)

  const submitHandler = event => {
    event.preventDefault()

    const enteredNewPassword = newPasswordInputRef.current.value

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBbk_aRfl24NIF45_yAXTeoefW6K8MercA',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      // Assumption: Always succeeds!

      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='6'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
