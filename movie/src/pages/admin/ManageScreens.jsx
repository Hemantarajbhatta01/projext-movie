import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as cinemaApi from '../../api/cinemaApi';

const ManageScreens = () => {
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    cinemaId: '', screenName: '', screenType: 'Standard', rows: 7, columns: 16
  });

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const { data } = await cinemaApi.getCinemas();
        setCinemas(data);
        if (data.length > 0) {
          setSelectedCinemaId(data[0]._id);
        }
      } catch (err) {
        toast.error('Failed to load cinemas');
      } finally {
        setLoading(false);
      }
    };
    fetchCinemas();
  }, []);

  useEffect(() => {
    const fetchScreens = async () => {
      if (selectedCinemaId) {
        try {
          const { data } = await cinemaApi.getScreensByCinema(selectedCinemaId);
          setScreens(data);
        } catch (err) {
          toast.error('Failed to load screens');
        }
      } else {
        setScreens([]);
      }
    };
    fetchScreens();
  }, [selectedCinemaId]);

  const openModal = () => {
    setFormData({
      cinemaId: selectedCinemaId || (cinemas.length > 0 ? cinemas[0]._id : ''),
      screenName: '',
      screenType: 'Standard',
      rows: 7,
      columns: 16
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cinemaId) {
      toast.error('Please select a cinema');
      return;
    }
    
    try {
      await cinemaApi.createScreen(formData);
      toast.success('Screen added successfully');
      closeModal();
      
      // Refresh screens
      const { data } = await cinemaApi.getScreensByCinema(selectedCinemaId);
      setScreens(data);
    } catch (err) {
      toast.error('Failed to save screen');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this screen? This may break existing shows.')) {
      try {
        await cinemaApi.deleteScreen(id);
        toast.success('Screen deleted');
        
        // Refresh screens
        const { data } = await cinemaApi.getScreensByCinema(selectedCinemaId);
        setScreens(data);
      } catch (err) {
        toast.error('Failed to delete screen');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="manage-halls">
      <div className="admin-page-header">
        <h1>Manage Screens</h1>
        <button className="btn-primary" onClick={openModal} disabled={cinemas.length === 0}>
          <Plus size={18} /> Add Screen
        </button>
      </div>

      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Select Cinema:</label>
        <select 
          value={selectedCinemaId} 
          onChange={(e) => setSelectedCinemaId(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', background: 'var(--bg-panel-light)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', minWidth: '250px' }}
        >
          {cinemas.map(c => (
            <option key={c._id} value={c._id}>{c.name} - {c.city}</option>
          ))}
          {cinemas.length === 0 && <option value="">No cinemas available</option>}
        </select>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Screen Name</th>
              <th>Type</th>
              <th>Rows</th>
              <th>Columns</th>
              <th>Total Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {screens.map(screen => (
              <tr key={screen._id}>
                <td style={{fontWeight: 500}}>{screen.screenName}</td>
                <td>{screen.screenType}</td>
                <td>{screen.rows}</td>
                <td>{screen.columns}</td>
                <td>{screen.rows * screen.columns}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-danger" onClick={() => handleDelete(screen._id)}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {screens.length === 0 && (
              <tr><td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>No screens found for this cinema.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Screen</h3>
              <button className="close-btn" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Cinema</label>
                  <select name="cinemaId" value={formData.cinemaId} onChange={handleChange} required>
                    {cinemas.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Screen Name</label>
                  <input type="text" name="screenName" value={formData.screenName} onChange={handleChange} placeholder="e.g. Screen 1, Audi A" required />
                </div>
                <div className="form-group">
                  <label>Screen Type</label>
                  <select name="screenType" value={formData.screenType} onChange={handleChange}>
                    <option value="Standard">Standard</option>
                    <option value="3D">3D</option>
                    <option value="IMAX">IMAX</option>
                    <option value="Dolby">Dolby</option>
                  </select>
                </div>
                <div style={{display: 'flex', gap: '1rem'}}>
                  <div className="form-group" style={{flex: 1}}>
                    <label>Rows</label>
                    <input type="number" name="rows" value={formData.rows} onChange={handleChange} min="1" max="26" required />
                  </div>
                  <div className="form-group" style={{flex: 1}}>
                    <label>Columns (Seats per row)</label>
                    <input type="number" name="columns" value={formData.columns} onChange={handleChange} min="1" max="50" required />
                  </div>
                </div>
                <p style={{fontSize: '0.85rem', color: '#9ca3af', marginTop: '-0.5rem'}}>
                  Total seats will be: {formData.rows * formData.columns}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">Save Screen</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScreens;
