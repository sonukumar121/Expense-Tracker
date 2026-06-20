import React from 'react';
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from "react-router-dom";
export const Profile=({setIslogin})=>{

   const navigate = useNavigate();

  
  const logouthandler = async () => {
    
    const response = await fetch(`${API_URL}/api/users/islogout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(),
    });

    const data = await response.json();
    console.log("aacha= ", data.message);
    if (data.message === "logout successfully") {
      setIslogin(false);
      navigate("/");

      // window.location.reload();
    }
  };
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-menu">
          <h3 style={{ marginBottom: '30px' }}>ExpenseTracker</h3>
          <button onClick={() => navigate("/")}>Dashboard</button>
          <button className="active">Profile</button>
        </div>
        <button style={{ color: 'red', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }} onClick={logouthandler}>Logout</button>
      </aside>

      {/* Profile Form */}
      <main className="main-content">
        <div className="profile-card">
          <div className="avatar"></div>
          <h2>Sonu Kumar</h2>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>sonu@example.com</p>

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value="Sonu Kumar" disabled />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value="sonu@example.com" disabled />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button className="btn-primary" style={{ flex: 1 }}>Edit Profile</button>
            <button className="btn-secondary" style={{ flex: 1 }}>Change Password</button>
          </div>
        </div>
      </main>
    </div>
  );
}