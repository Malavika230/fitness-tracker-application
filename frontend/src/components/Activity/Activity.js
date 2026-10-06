import React, { useState, useEffect } from 'react';
import background from '../../assets/schedule.jpg';
import './Activity.css';
import axios from 'axios';
import { format } from "date-fns";

function Activity() {
  const [activity, setActivity] = useState([]);
  const [user, setUser] = useState({});
  const [newActivity, setNewActivity] = useState({
    activityType: '',
    userId: '',
    activityDate: '',
    calories: ''
  });

  useEffect(() => {
    const getUserDets = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user`, {
          withCredentials: true
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserDets();
  }, []);

  useEffect(() => {
    if (user.userId) {
      const getActivities = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/getActivity/${user.userId}`, {
            withCredentials: true
          });
          setActivity(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getActivities();
    }
  }, [user.userId]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity(prevState => ({
      ...prevState,
      [name]: value,
      userId: user.userId
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/addActivity`, newActivity, {
        withCredentials: true
      });
      alert("Creation successful");
      // Refresh activities after adding a new one
      const response = await axios.get(`http://localhost:8000/api/getActivity/${user.userId}`, {
        withCredentials: true
      });
      setActivity(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='activity'>
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ padding: "25px", margin: "100px 0 10px 0" }}>Log your workouts</h2>
        <button type="button" className="btn btn-primary activity-btn" style={{ margin: "100px 30px 0 0" }} data-bs-toggle="modal" data-bs-target="#activityModal">Add a new activity!!</button>

        {/* form model starts */}
        <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="activityModalLabel">Log your activity</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Activity Type</label>
                    <select
                      className="form-control"
                      name='activityType'
                      type='text'
                      value={newActivity.activityType}
                      onChange={onInputChange}>
                      <option>Select an option</option>
                      <option value="running">Running</option>
                      <option value="cycling">Cycling</option>
                      <option value="swimming">Swimming</option>
                      <option value="walking">Walking</option>
                      <option value="strengthTraining">Strength Training</option>
                      <option value="genFitness">General fitness</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date and Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name='activityDate'
                      value={newActivity.activityDate}
                      onChange={onInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Calories Burned</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Calories burned"
                      name='calories'
                      value={newActivity.calories}
                      onChange={onInputChange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary submit-btn" onClick={handleSubmit}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
        {/* form model ends */}

      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Activity Type</th>
              <th scope="col">Date and Time</th>
              <th scope="col">Calories Burned</th>
            </tr>
          </thead>
          <tbody>
            {activity.map((activitydata, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{activitydata.activityType}</td>
                <td>{format((activitydata.activityDate), "MMMM do yyyy, h:mm:ss a")}</td>
                <td>{activitydata.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <img src={background} style={{ width: "250px", position: "fixed", bottom: "25px", right: "25px" }} alt="Background" />
    </div>
  );
}

export default Activity;
