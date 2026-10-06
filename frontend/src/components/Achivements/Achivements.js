import React from 'react'
import background from '../../assets/achivements.jpg'
import clipart from '../../assets/trophy.jpg'
import './Achivements.css'

function Achivements() {
  return (
    <div className='achievements'>
      <h2 style={{ padding: "25px", marginTop: "100px"}}>See How Far You've Come: Your Achievements</h2>
      <div style={{ padding: "25px"}}>
      <div class="card" style={{width: "15rem"}}>
        <img src={clipart} class="card-img-top" style={{maxHeight:"100px", maxWidth:"100px", margin:"25px 25px 0 60px"}}/>
        <div class="card-body" style={{textAlign:"center"}}>
          <p class="card-text">You completed your 3kms run under an hour!!</p>
        </div>
      </div>
      </div>
      <img src={background} style={{ width: "250px", position: "fixed", bottom: "25px", right: "25px" }}></img>
    </div>
  )
}

export default Achivements