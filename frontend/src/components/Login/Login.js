import React, {useState} from 'react'
import './Login.css'
import background from '../../assets/girl.jpg'
import logo from '../../assets/fitness.png'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';

function Login() {

  const [credentials, setCredentials] = useState({
    email:'',
    password:''
  })

  const [error, setError] = useState({
    email:'',
    password:''
  })

  const [loginError, setLoginError] = useState([])

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  }

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'email':
          if (!value) {
            stateObj[name] = 'Please enter email.';
          }
          else if(!validator.isEmail(value)){
            stateObj[name] = 'Invalid email.';
          }
          break;

        case 'password':
          if (!value) {
            stateObj[name] = 'Please enter Password.';
          } 
          break;

        default:
          break;
      }

      return stateObj;
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8000/api/login`,credentials,{
        withCredentials: true 
    })
    .then((response) => {
      console.log(response)
      navigate('/home');
    })
    .catch((err) => {
      console.log(err);
      setLoginError('Incorrect credentials')
    });
  }


  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup')
  }

  return (
    <div className ='login'>
    {/* left side */}
    <div className='bg-holder' style={{ backgroundImage: `url(${background})` }}>
    </div>

    {/* right side */}
    <div className='login-content'>
      <div style={{ textAlign: 'center', margin: '20px' }}><h5>'Crush your goals! Track your progress and celebrate every milestone'</h5></div>
      <div className='d-flex justify-content-center mb-4'>
        <img src={logo} alt='' width={60} />
      </div>
      <div className='text-center mb-5'>
        <h3 className='fw-bold'>Log In</h3>
        <p>Access your account</p>
      </div>
      <div className='log-form'>
        <form onSubmit={handleSubmit}>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
            <MdEmail style={{ marginRight: '2px', fontSize: '20px' }} />
              <input 
              type='email' 
              className='form-control form-control-lg fs-6 ms-2' 
              placeholder='Email'
              name= 'email'
              onChange={onInputChange} />
            </span>
            {error.email && <span className="err">{error.email}</span>}
          </div>
          <div className='input-group mb-3'>
            <span className='input-group-text'>
              <RiLockPasswordFill style={{ marginRight: '2px', fontSize: '20px' }} />
              <input 
              type='password' 
              className='form-control form-control-lg fs-6 ms-2'
              placeholder='Password' 
              name= 'password'
              onChange={onInputChange} />
            </span>
            {error.password && <span className="err">{error.password}</span>}
          </div>
          <button className='btn btn-primary mar-left mb-3'>Login</button>
        </form>
        {loginError && <span className='loginerr'>{loginError}</span>}
        <div className='text-center'>
          <small style={{marginRight:'50px'}}>Don't have an account? <button className='signup-button' onClick={() => handleSignup()}>Sign up</button></small>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login