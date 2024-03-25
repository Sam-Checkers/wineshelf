import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newWine, setNewWine] = useState({ name: '', type: '', region: '' });
  const [editWine, setEditWine] = useState(null);

  const fetchWines = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://winery-1.onrender.com/get_all_wines');
      if (response.ok) {
        const data = await response.json();
        setWines(data);
      } else {
        console.error('Failed to fetch wines');
      }
    } catch (error) {
      console.error('Error fetching wines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWine((prevWine) => ({
      ...prevWine,
      [name]: value
    }));
  };

  const handleAddWine = async () => {
    try {
      const response = await fetch('https://winery-1.onrender.com/add_wine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWine)
      });
      if (response.ok) {
        console.log('Wine added successfully');
        setNewWine({ name: '', type: '', region: '' });
        fetchWines();
      } else {
        console.error('Failed to add wine');
      }
    } catch (error) {
      console.error('Error adding wine:', error);
    }
  };

  const handleEditWine = (wine) => {
    setEditWine(wine);
  };

  const handleUpdateWine = async () => {
    try {
      const response = await fetch(`https://winery-1.onrender.com/update_wine/${editWine.wine_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editWine)
      });
      if (response.ok) {
        console.log('Wine updated successfully');
        setEditWine(null);
        fetchWines();
      } else {
        console.error('Failed to update wine');
      }
    } catch (error) {
      console.error('Error updating wine:', error);
    }
  };

  const handleDeleteWine = async (wineId) => {
    try {
      const response = await fetch(`https://winery-1.onrender.com/delete_wine/${wineId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Wine deleted successfully');
        fetchWines();
      } else {
        console.error('Failed to delete wine');
      }
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>User Profile</h2>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div>
          <h3>Add New Wine</h3>
          <form>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={newWine.name} onChange={handleInputChange} />
            </div>
            <div>
              <label>Type:</label>
              <input type="text" name="type" value={newWine.type} onChange={handleInputChange} />
            </div>
            <div>
              <label>Region:</label>
              <input type="text" name="region" value={newWine.region} onChange={handleInputChange} />
            </div>
            <button type="button" onClick={handleAddWine}>Add Wine</button>
          </form>
        </div>
        <div>
          <h3>All Wines</h3>
          {loading ? (
            <p>Loading wines...</p>
          ) : (
            <ul>
              {wines.map((wine) => (
                <li key={wine.wine_id}>
                  {editWine && editWine.wine_id === wine.wine_id ? (
                    <div>
                      <input type="text" value={editWine.name} onChange={(e) => setEditWine({ ...editWine, name: e.target.value })} />
                      <input type="text" value={editWine.type} onChange={(e) => setEditWine({ ...editWine, type: e.target.value })} />
                      <input type="text" value={editWine.region} onChange={(e) => setEditWine({ ...editWine, region: e.target.value })} />
                      <button type="button" onClick={handleUpdateWine}>Update</button>
                    </div>
                  ) : (
                    <div>
                      {wine.name} - {wine.type} - {wine.region}
                      <button type="button" onClick={() => handleEditWine(wine)}>Edit</button>
                      <button type="button" onClick={() => handleDeleteWine(wine.wine_id)}>Delete</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;