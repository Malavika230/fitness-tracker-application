import React, { useEffect, useState } from 'react'
import background from '../../assets/home.jpg'
import './Home.css'
import axios from 'axios'

function Home() {

  const [user, setUser] = useState([])

  useEffect(() => {
    const getUserDets = async () => {
      await axios.get(`http://localhost:8000/api/user`,{
        withCredentials : true
      })
      .then((response) => {
        setUser(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    getUserDets()
  }, [])

  return (
    <div className='home'>
      <h2 style={{padding:"25px", margin:"100px 0 10px 0"}}>Welcome {user.fullname}</h2>
      <img src= {background} style={{width:"250px", position:"absolute", bottom:"25px", right:"25px"}}></img>
    </div>
  )
}

export default Home