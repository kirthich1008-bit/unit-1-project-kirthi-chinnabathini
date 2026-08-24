import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

function MilestonePage() {
  
  const location = useLocation();
  const initialChild = location.state?.childName || 'Duggu';

  const [selectedChild, setSelectedChild] = useState(initialChild);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState("");

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

  const [milestone, setMilestone] = useState(() => {
    const saved = localStorage.getItem('childrenMilestones');
    return saved ? JSON.parse(saved) : { Duggu: [], Mikku: [] };
  });

  useEffect(() => {
    localStorage.setItem('childrenMilestones', JSON.stringify(milestone));
  }, [milestone]);

  const addMilestone = (e) => {
    e.preventDefault();
    if (!selectedChild) {
      alert('Please select a child first!');
      return;
    }
    if (!title || !date || !description) {
      alert('Please fill all required fields!');
      return;
    }

    const newMilestone = {
      id: Date.now(),
      title: title.trim(),
      date,
      description: description.trim(),
      photo: photo
    };

    setMilestone((prevMilestone) => ({
      ...prevMilestone,
      [selectedChild]: [newMilestone, ...(prevMilestone[selectedChild] || [])],
    }));

    setTitle('');
    setDate('');
    setDescription('');
    setPhoto('');
    e.target.reset();
  };

  const deleteMilestone = (id) => {
    setMilestone((prevMilestone) => ({
      ...prevMilestone,
      [selectedChild]: (prevMilestone[selectedChild] || []).filter(
        (milestone) => milestone.id !== id
      ),
    }));
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
        <p>No milestones of {selectedChild} to Display.</p>
      ) : (
       
       <div className='milestone-card'>
          
          {milestone[selectedChild].map((milestone) => (
            <div key={milestone.id} >

              {milestone.photo && (
                <img src={milestone.photo} alt={milestone.title} style={{ maxWidth: '300px', maxHeight: '300px' }}/>
              )}<br/><br/>
              <h3>{milestone.title}</h3><br/><br/>
              <h4 >{milestone.date}</h4><br/><br/>
              <p>{milestone.description}</p><br/><br/>
              
             
             
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
export default MilestonePage;