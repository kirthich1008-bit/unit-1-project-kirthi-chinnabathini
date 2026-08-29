import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Button from '../ReusableComponents/Buttons';
import InputField from '../ReusableComponents/Forms';
import './Pages.css';

function MilestonePage() {
  // When a Add Milestone button is pressed under each child's profile it makes sure the correct child name is selected.
  const location = useLocation();
  const initialChild = location.state?.childName || '';

  const [selectedChild, setSelectedChild] = useState(initialChild);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState("");

  // For alerting message to the user that all data should be filled to proceed further to save data.
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: "" });  
  

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
      // alerting message.
     setModalConfig({ isOpen: true, message: "Please select a child!" }); 
      return;
    }
    if (!title || !date || !description) {
      setModalConfig({ isOpen: true, message: "Please fill all required fields!" });  
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

      
      <h1>Milestones:</h1>
        
        <label>Select:</label>
      
      {/* re-usable component button is used here */}
        <Button className={selectedChild === 'Duggu' ? 'active' : ''} onClick={() => setSelectedChild('Duggu')}>
        Duggu
      </Button>
      <Button className={selectedChild === 'Mikku' ? 'active' : ''} onClick={() => setSelectedChild('Mikku')}>
        Mikku
      </Button>
        
        <br/><br/>
       
     
        <form onSubmit={addMilestone} >
        <div className="milestone-form">

          {/* re-usable forms component is used here. */}
          <InputField label="Title:" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <br/><br/>
          
          <InputField label="Date:" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <br/><br/>
          
          <InputField 
            label="Description:" 
            type="textarea" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="4" 
            maxLength="200" 
          />
          <br/><br/>
          
          <InputField label="Upload Photo:" type="file" accept="image/*" onChange={handlePhotoChange} />
          
          {photo && (
            <div>
              <p>Preview:</p>
              <img src={photo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '4px' }} />
            </div>
          )}
          <br/><br/>

        <button type="submit" >Save Milestone</button>
      
      </div>
      
      </form>
      
      <br/><br/>
       
       {/*Alert Message Boolean condition. */}
       {modalConfig.isOpen && (         
        <div className="modal">           
          <p>{modalConfig.message}</p>           
          <button onClick={() => setModalConfig({ isOpen: false, message: "" })}> OK </button>         
        </div> 
        )} 

         <br/><br/>

      
      {/* All saved Milestones data will be displayed in this sequence */}
      
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
              
              <button onClick={() => deleteMilestone(milestone.id)}>Delete Milestone</button>
              
              
            </div>
         ))}
        
        </div>
      
      )}
    
    </div>
  

  );

};

export default MilestonePage;