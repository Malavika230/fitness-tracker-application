import './Signup.css'
import React, { useState } from 'react'
import './Signup.css'
import background from '../../assets/girl.jpg'
import logo from '../../assets/fitness.png'
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import axios from 'axios'

function Signup() {

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })



  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/')
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
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
        case 'fullname':
          if (!value) {
            stateObj[name] = 'Please enter Fullname.';
          }
          break;

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
          } else if (user.confirmPassword && value !== user.confirmPassword) {
            stateObj['confirmPassword'] =
              'Password and Confirm Password does not match.';
          } else {
            stateObj['confirmPassword'] = user.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Please enter Confirm Password.';
          } else if (user.password && value !== user.password) {
            stateObj[name] = 'Password and Confirm Password does not match.';
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
    await axios.post(`http://localhost:8000/api/signup`,user)
    .then((response) => {
      console.log(response)
      alert("Account created successfully")
      navigate('/')
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='signup'>
      {/* left side */}
      <div className='bg-holder-signup' style={{ backgroundImage: `url(${background})` }}>
      </div>

      {/* right side */}
      <div className='signup-content'>
        <div style={{ textAlign: 'center', margin: '20px' }}><h5>'Crush your goals! Track your progress and celebrate every milestone'</h5></div>
        <div className='d-flex justify-content-center mb-4'>
          <img src={logo} alt='' width={60} />
        </div>
        <div className='text-center mb-5'>
          <h3 className='fw-bold'>Sign up</h3>
          <p>Create a new account</p>
        </div>
        <div className='log-form'>
          <form onSubmit={handleSubmit}>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <FaUser style={{ marginRight: '2px' }} />
                <input
                  name='fullname'
                  type='text'
                  className='form-control form-control-lg fs-6 ms-2'
                  placeholder='Enter Fullname'
                  value={user.fullname}
                  onChange={onInputChange} 
                  onBlur={validateInput} />
              </span>
              {error.fullname && <span className="err">{error.fullname}</span>}
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <MdEmail style={{ marginRight: '2px', fontSize: '20px' }} />
                <input
                  name='email'
                  type='email'
                  className='form-control form-control-lg fs-6 ms-2'
                  placeholder='Enter Email'
                  value={user.email}
                  onChange={onInputChange} 
                  onBlur={validateInput} />
              </span>
              {error.email && <span className="err">{error.email}</span>}
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <RiLockPasswordFill style={{ marginRight: '2px', fontSize: '20px' }} />
                <input
                  name='password'
                  type='password'
                  className='form-control form-control-lg fs-6 ms-2'
                  placeholder='Enter Password'
                  value={user.password}
                  onChange={onInputChange} 
                  onBlur={validateInput} />
              </span>
              {error.password && <span className="err">{error.password}</span>}
            </div>
            <div className='input-group mb-3'>
              <span className='input-group-text'>
                <RiLockPasswordFill style={{ marginRight: '2px', fontSize: '20px' }} />
                <input
                  name='confirmPassword'
                  type='password'
                  className='form-control form-control-lg fs-6 ms-2'
                  placeholder='Confirm Password'
                  value={user.confirmPassword}
                  onChange={onInputChange} 
                  onBlur={validateInput} />
              </span>
              {error.confirmPassword && <span className="err">{error.confirmPassword}</span>}
            </div>
            <button type="submit" className='btn btn btn-success mb-3 signup-btn1'>Create</button>
            <button className='btn btn-danger mb-3 signup-btn2' onClick={() => handleCancel()}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup