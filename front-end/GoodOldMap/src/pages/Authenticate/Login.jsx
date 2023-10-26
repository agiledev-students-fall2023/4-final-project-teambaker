import { useState } from 'react'
import { redirect } from 'react-router-dom'
import AuthHeader from '../../components/form/authHeader'
import PageLink from '../../components/common/pageLink'
import { FormInputs } from '../../components/form/formInput'
import FormBtn from '../../components/form/formBtn'

const Login = () => {
  const [message, setMessage] = useState("")
  const fields = ["username", "password"]
  // click to login
  const handleClick = (evt) => {
    evt.preventDefault();
    setMessage("error message if login failed");
  }


  // if user click guest visit redirect to main map
  const handleGuest = (evt) => {
    evt.preventDefault()
    // pop up alert: confirm guest visit
    const continueGuest  = window.confirm('Guest visit will not save your data, continue?');
    if (continueGuest) {
      window.location.href = "/";
    }
  }


  return(
    <>
      <AuthHeader header="Login" message={message}/>
      <form>
        <FormInputs fields={fields}/>
        <div className='mt-2'>
          <FormBtn handleClick={handleClick}/>
          <FormBtn value="Guest Visit" handleClick={handleGuest}/>
        </div>
      </form>
      <div className='mt-2'>
        <PageLink to="/register" value="Register"/>
        <PageLink to="/login" value="Forget Password"/>
      </div>
    </>
  )
}

export default Login