import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Camera, 
  Award, 
  TrendingUp, 
  Recycle, 
  Leaf, 
  Target,
  Calendar,
  Settings,
  LogOut,
  Edit3,
  Save,
  X
} from 'lucide-react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        ...parsedUser,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        joinDate: '2024-01-15',
        totalScans: 127,
        itemsRecycled: 89,
        co2Saved: 45.2,
        level: 'Eco Warrior',
        points: 2340,
        streak: 15
      });
      setEditData(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const stats = [
    {
      icon: <Camera className="stat-icon" />,
      label: 'Items Scanned',
      value: user?.totalScans || 0,
      color: '#3B82F6'
    },
    {
      icon: <Recycle className="stat-icon" />,
      label: 'Items Recycled',
      value: user?.itemsRecycled || 0,
      color: '#10B981'
    },
    {
      icon: <Leaf className="stat-icon" />,
      label: 'CO₂ Saved (kg)',
      value: user?.co2Saved || 0,
      color: '#059669'
    },
    {
      icon: <Target className="stat-icon" />,
      label: 'Day Streak',
      value: user?.streak || 0,
      color: '#F59E0B'
    }
  ];

  const achievements = [
    { id: 1, name: 'First Scan', description: 'Completed your first waste scan', earned: true, icon: '🎯' },
    { id: 2, name: 'Eco Beginner', description: 'Scanned 10 items', earned: true, icon: '🌱' },
    { id: 3, name: 'Recycling Hero', description: 'Recycled 50 items properly', earned: true, icon: '♻️' },
    { id: 4, name: 'Streak Master', description: 'Maintained 7-day streak', earned: true, icon: '🔥' },
    { id: 5, name: 'DIY Creator', description: 'Shared your first DIY project', earned: false, icon: '🎨' },
    { id: 6, name: 'Community Leader', description: 'Helped 100 users', earned: false, icon: '👥' }
  ];

  const recentActivity = [
    { id: 1, action: 'Scanned plastic bottle', category: 'plastic', time: '2 hours ago' },
    { id: 2, action: 'Completed DIY project', category: 'diy', time: '1 day ago' },
    { id: 3, action: 'Recycled glass jar', category: 'glass', time: '2 days ago' },
    { id: 4, action: 'Shared eco tip', category: 'community', time: '3 days ago' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ name: user.name, email: user.email });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-info">
            <div className="avatar-section">
              <img src={user.avatar} alt="Profile" className="profile-avatar" />
              <button className="avatar-edit-btn">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="user-details">
              {isEditing ? (
                <div className="edit-form">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="edit-input"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button onClick={handleSave} className="save-btn">
                      <Save size={16} />
                      Save
                    </button>
                    <button onClick={handleCancel} className="cancel-btn">
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="user-name">{user.name}</h1>
                  <p className="user-email">{user.email}</p>
                  <div className="user-meta">
                    <span className="user-level">{user.level}</span>
                    <span className="user-points">{user.points} points</span>
                    <span className="join-date">
                      <Calendar size={14} />
                      Joined {new Date(user.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="profile-actions">
            {!isEditing && (
              <button onClick={handleEdit} className="edit-profile-btn">
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
            <button className="settings-btn">
              <Settings size={16} />
              Settings
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon-wrapper" style={{ backgroundColor: stat.color + '20' }}>
                {React.cloneElement(stat.icon, { style: { color: stat.color } })}
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="profile-content">
          {/* Achievements */}
          <div className="profile-section">
            <div className="section-header">
              <Award className="section-icon" />
              <h2>Achievements</h2>
            </div>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  {achievement.earned && <div className="earned-badge">✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="profile-section">
            <div className="section-header">
              <TrendingUp className="section-icon" />
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.category}`}>
                    {activity.category === 'plastic' && '♻️'}
                    {activity.category === 'diy' && '🎨'}
                    {activity.category === 'glass' && '🍶'}
                    {activity.category === 'community' && '👥'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="profile-section">
            <div className="section-header">
              <TrendingUp className="section-icon" />
              <h2>Monthly Progress</h2>
            </div>
            <div className="progress-chart">
              <div className="chart-placeholder">
                <div className="chart-bars">
                  {[65, 45, 80, 55, 70, 85, 60].map((height, index) => (
                    <div 
                      key={index} 
                      className="chart-bar" 
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="chart-labels">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="chart-label">{day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
