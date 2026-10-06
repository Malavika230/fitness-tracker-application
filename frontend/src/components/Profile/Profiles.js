import React, { useState, useEffect } from 'react';
import background from '../../assets/profile.jpg';
import { MdEditSquare } from "react-icons/md";
import './Profiles.css';
import axios from 'axios';

function Profiles() {

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    userId: ''
  });

  const [updateUser, setUpdateUser] = useState({
    fullname: ''
  });

  useEffect(() => {
    const getUserDets = async () => {
      await axios.get(`http://localhost:8000/api/user`, {
        withCredentials: true
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUserDets();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/updateUser/${user.userId}`, updateUser, {
      withCredentials: true
    })
      .then((response) => {
        console.log(response);
        alert("Updation successful");
        setUser((prev) => ({
          ...prev,
          fullname: updateUser.fullname
        }));
        // Optionally, you can close the modal here
        document.querySelector('[data-bs-dismiss="modal"]').click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='profile'>
      <h2 style={{ padding: "25px", margin: "100px 0 10px 0" }}>Your profile</h2>
      <img src={background} style={{ width: "250px", position: "fixed", bottom: "25px", right: "25px" }} alt="background" />
      <div className="container profile-container mt-5">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body card-bd">
              <form>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control pf" id="fullName" value={user.fullname} readOnly />
                  <button type="button" className='edit-button' data-bs-toggle="modal" data-bs-target="#profileModal">
                    <MdEditSquare style={{ fontSize: "20px", color: "white" }} />
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control pf" value={user.email} readOnly />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control pf" value={user.password} readOnly />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered  modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="profileModalLabel">Edit your fullname</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full name:</label>
                  <input
                    name='fullname'
                    type="text"
                    className="form-control"
                    value={updateUser.fullname}
                    onChange={onInputChange}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary submit-btn">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
