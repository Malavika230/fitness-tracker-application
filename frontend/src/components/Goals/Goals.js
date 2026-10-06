import React, { useState } from 'react'
import background from '../../assets/goals.jpg'
import './Goals.css'

function Goals() {


  return (
    <div className='goals'>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ padding: "25px", margin: "100px 0 0 0" }}>Set Your Goals, Achieve More!</h2>
        <button type="button" className="btn btn-primary goal-btn" style={{ margin: "100px 30px 0 0" }} data-bs-toggle="modal" data-bs-target="#goalModal">Set a new goal!!</button>

        {/* formmodel starts*/}
        <div className="modal fade" id="goalModal" tabindex="-1" aria-labelledby="goalModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="goalModalLabel">Set your goal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Goal name:</label>
                      <input type="text" className="form-control" placeholder="Your goal" />
                      <label style={{ marginTop: "10px" }}>Goal type:</label>
                      <select className="form-control">
                        <option>Select an option</option>
                        <option value="running">Running</option>
                        <option value="cycling">Cycling</option>
                        <option value="swimming">Cycling</option>
                        <option value="strengthTraining">Strength Training</option>
                        <option value="genFitness">General Fitness</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Goal description:</label>
                      <textarea className="form-control" rows="4" placeholder="Description in a single line"></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Target value:</label>
                    <input type="number" className="form-control" placeholder="Your target" />
                  </div>
                  <div className="form-group">
                    <label>Target type:</label>
                    <select className="form-control">
                      <option>Select an option</option>
                      <option value="kms">Kilometers</option>
                      <option value="mins">Minutes</option>
                      <option value="kg">Kilograms</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start date:</label>
                    <input type="datetime-local" className="form-control" placeholder="Enter Start date" />
                  </div>
                  <div className="form-group">
                    <label>End date:</label>
                    <input type="datetime-local" className="form-control" placeholder="Enter End date" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary submit-btn">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* formmodel starts*/}

      </div>
      <div style={{ padding: "25px" }}>
      <div className="card border mb-3" style={{maxWidth:"18rem"}}>
        <div className="card-header bg-transparent border"><h4>Goal 1</h4></div>
        <div className="card-body text">
            <p className="card-text"><b>Title: </b>Goal title</p>
            <p className="card-text"><b>Description: </b>Description</p>
            <p className="card-text"><b>Target: </b>target</p>
            <p className="card-text"><b>Due date: </b>date</p>
            <p className="card-text"><b>Description: </b>Description</p>
        </div>
      </div>
      </div>
      
      <img src={background} style={{ width: "250px", position: "fixed", bottom: "25px", right: "25px" }}></img>
    </div>

  )
}

export default Goals