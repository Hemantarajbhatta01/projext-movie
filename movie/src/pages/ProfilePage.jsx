import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Lock, Save, Camera } from 'lucide-react';
import './Auth.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: '',
    profilePicture: user?.profilePicture || '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mock API request / update
      const updatedUser = { ...user, ...formData };
      delete updatedUser.password; // Mock removing plain text
      setUser(updatedUser);
      localStorage.setItem('cinematix_user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2>My Profile</h2>
        <p className="auth-subtitle">Manage your personal information</p>

        <form onSubmit={handleSubmit} className="auth-form">
          
          <div className="profile-image-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div 
              className="profile-image-container" 
              style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--glass-bg)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', border: '2px solid var(--glass-border)', position: 'relative', cursor: 'pointer' }}
              onClick={() => fileInputRef.current.click()}
            >
              {formData.profilePicture ? (
                <img src={formData.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={40} color="var(--text-secondary)" />
              )}
              <div className="profile-image-overlay" style={{ position: 'absolute', bottom: 0, width: '100%', background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0', display: 'flex', justifyContent: 'center' }}>
                <Camera size={16} color="white" />
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageChange} 
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Click to change photo</p>
          </div>

          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              value={user?.email || ''}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div className="input-group">
            <Phone className="input-icon" size={20} />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Leave password blank if you don't want to change it.</p>
          
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            <Save size={20} /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
