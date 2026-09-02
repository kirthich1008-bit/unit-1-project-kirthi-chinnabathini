import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { profiles } from '../MockData/profile'
import './Pages.css'


function ProfilePage() {

  // Mock data is being passed in useState.
  const [profileList, setProfileList] = useState(profiles);
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
     
      <h1>Profiles:</h1> <br/><br/>
     
      {profileList.map((user, index) => (
       
       <div key={user.id} className="profile-card">
          <div className="profile-image-wrapper">
            
            {/* makimg sure correct index of data to display correct image of a child. */}
            {index === 0 && <img src={`${import.meta.env.BASE_URL}duggulu.jpeg`} alt="family" height={300} />}
            {index === 1 && <img src={`${import.meta.env.BASE_URL}mikkulu.jpeg`} alt="home" height={300} />}
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
            <p><strong>PEDIATRICIAN:</strong> {user.pediatrician}</p>
            <p><strong>PRESENT AGE:</strong> {user.presentAge}</p>
            <p><strong>WELCOMED-HOME:</strong> {user.homeAddress}</p>
          </div>

          <div className="profile-buttons">
            
            {/* we used state here to make sure the useLocation hook holds 
             the right child name and display it when button is pressed.
             if we are using useLocation we need to make sure to use state 
             in before page near buttons */}
           
            <Link to="/memories" state={{ childName: user.nickName }}>
              <button>Add Memories</button>
            </Link>
            <Link to="/milestones" state={{ childName: user.nickName }}>
              <button>Add Milestones</button>
            </Link>
            <Link to="/gallery" state={{ childName: user.nickName }}>
              <button>View Gallery</button>
             </Link>
    
          </div>
          
        </div>
      ))}
     
      
    </div>
  );
}

export default ProfilePage;