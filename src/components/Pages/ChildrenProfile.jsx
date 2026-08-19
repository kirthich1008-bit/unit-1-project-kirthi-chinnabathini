import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { profiles } from '../../MockData/profile';
import './ChildrenProfile.css';

function ProfilePage() { 
  
  const [profileList, setProfileList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = () => {
      setProfileList(profiles);
      setIsLoading(false);
    };

    fetchProfiles();
  }, []); 

  if (isLoading) {
    return <div className="loading">Loading profiles...</div>;
  }

  return ( 
    <div className="profiles-container"> 
      {profileList.map((user, index) => ( 
        <div key={user.id} className="profile-card">
          <div className="profile-image-wrapper">
            {index === 0 && ( 
              <img src="/duggu.jpeg" alt="family" height={300} /> 
            )} 
            {index === 1 && ( 
              <img src="/mikku.jpeg" alt="home" height={300} /> 
            )} 
          </div>
         


          <div className="profile-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Nickname:</strong> {user.nickName}</p>
            <p><strong>DOB:</strong> {user.dob}</p>
            <p><strong>STATE:</strong> {user.state}</p>
            <p><strong>TIME:</strong> {user.time}</p>
            <p><strong>PLACE:</strong> {user.place}</p>
            <p><strong>HOSPITAL:</strong> {user.Hospital}</p>
            <p><strong>DELIVERED DOCTOR:</strong> {user.deliveredDoctor}</p>
            <p><strong>BIRTHWEIGHT:</strong> {user.birthWeight}</p>
            <p><strong>FIRST PEDIATRICIAN:</strong> {user.firstPediatrician}</p>
            <p><strong>SECOND PEDIATRICIAN:</strong> {user.secondPrediatrician}</p>
            <p><strong>PRESENT AGE:</strong> {user.presentAge}</p>
          </div>
          
          <div className="profile-actions">
            <Link to={`/memories`}>
              <button>New Memories</button>
            </Link>
            <Link to={`/milestones`}>
              <button>Milestones</button>
            </Link>
            <Link to={`/gallery`}>
              <button>Gallery</button>
            </Link>

          </div>
        </div>
      ))} 
    </div>
  );
}

export default ProfilePage;