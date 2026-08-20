import { useState } from 'react';
import { Link } from 'react-router';

function MilestonesPage() {
  const [selectedChild, setSelectedChild] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState("");

const [milestone, setMilestone] = useState(() => {
    const saved = localStorage.getItem('childrenMilestones');
    return saved ? JSON.parse(saved) : { Duggu: [], Mikku: [] };
  });

const handleChildChange = (childName) => {
    setSelectedChild(childName);
  };


const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result); 
    };
    reader.readAsDataURL(file);
  };

const addMilestone = (e) => {
    e.preventDefault();
    if (!title || !date || !description) {
      alert('Please fill all required fields!');
      return;
    }

  
    const newMilestone = {
      id: Date.now(),
      photo: photo,
      title: title,
      date,
      description: description,
    };

    const updatedMilestones = {
      ...milestone,
      [selectedChild]: [newMilestone, ...(milestone[selectedChild] || [])],
    };

    setMilestone(updatedMilestones);
    localStorage.setItem('childrenMilestones', JSON.stringify(updatedMilestones));
    
    setPhoto('');
    setTitle('');
    setDate('');
    setDescription('');
  
};

const deleteMilestone = (id) => {
    const updatedMilestones = {
      ...milestone,
      [selectedChild]: milestone[selectedChild].filter(
        (milestone) => milestone.id !== id
      ),
    };
    setMilestone(updatedMilestones);
    localStorage.setItem('childrenMilestones', JSON.stringify(updatedMilestones));
  };

  return(

    <div className='milestone-data'>

      
      <h1>Milestones</h1>
        
        <label>Select:</label>

        <button
          className={selectedChild === 'Duggu' ? 'active' : ''}
          onClick={() => handleChildChange('Duggu')} >
          Duggu
        </button>
       
        <button
          className={selectedChild === 'Mikku' ? 'active' : ''}
          onClick={() => handleChildChange('Mikku')}>
          Mikku
        </button>
        <br/><br/>
     
     
      <form onSubmit={addMilestone} >
        <div className="milestione-form">

           <div>
         
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        </div>

        <br/><br/>

        <div>
         
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        
        </div>

        <br/><br/>

        <div>
         
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" maxLength="200"/>
        
        </div>

        <br/><br/>

        <div>
          
          <label>Upload Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          
          {photo && (
            <div>
              <p>Preview:</p>
              <img src={photo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '4px' }} />
            </div>
          )}
       
        </div>

        <br/><br/>

        <button type="submit" >Save Milestone</button>
      
      </div>
      
      </form>
      
      <br/><br/>

      

      <h2>Milestones of {selectedChild}.</h2>
      
      {(!milestone[selectedChild] || milestone[selectedChild].length === 0) ? (
        <p>No milestones of {selectedChild}.</p>
      ) : (
       
       <div >
          
          {milestone[selectedChild].map((milestone) => (
            <div key={milestone.id} >
              <h3>{milestone.title}</h3><br/><br/>
              <small >{milestone.date}</small><br/><br/>
              <p>{milestone.description}</p><br/><br/>
              {milestone.photo && (
                <img src={milestone.photo} alt={milestone.title} style={{ maxWidth: '300px', maxHeight: '300px' }}/>
              )}<br/><br/>
              <Link to="/milestones">
              <button onClick={() => deleteMilestone(milestone.id)}>Delete Milestone</button>
              </Link>
              
            </div>
         ))}
        
        </div>
      
      )}
    
    </div>
  

  );






};
export default MilestonesPage;