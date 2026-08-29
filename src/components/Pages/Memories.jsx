import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Button from '../ReusableComponents/Buttons'
import InputField from '../ReusableComponents/Forms';
import './Pages.css';

function MemoryPage() {
// When a Add Memories button is pressed under each child's profile it makes sure the correct child name is selected.
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

  
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('childrenMemories');
    return saved ? JSON.parse(saved) : { Duggu: [], Mikku: [] };
  });

  
  useEffect(() => {
    localStorage.setItem('childrenMemories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (e) => {
    e.preventDefault();
   
    // Alerting modal message.
    if (!selectedChild) {
     setModalConfig({ isOpen: true, message: "Please select a child!" }); 
      return;
    }
    if (!title || !date || !description) {
      setModalConfig({ isOpen: true, message: "Please fill all required fields!" }); 
      return;
    }

    const newMemory = {
      id: Date.now(),
      title: title.trim(),
      date,
      description: description.trim(),
      photo: photo
    };

    setMemories((prevMemory) => ({
      ...prevMemory,
      [selectedChild]: [newMemory, ...(prevMemory[selectedChild] || [])],
    }));

    setTitle('');
    setDate('');
    setDescription('');
    setPhoto('');
    e.target.reset();
  };

  const deleteMemory = (id) => {
    setMemories((prevMemory) => ({
      ...prevMemory,
      [selectedChild]: (prevMemory[selectedChild] || []).filter(
        (memory) => memory.id !== id
      ),
    }));
  };

  return (

     <div className='memories-data'>

      
      <h1>Memories:</h1>
        
      <label>Select:</label>
     
      {/* re-usable component button is used here */}
      <Button className={selectedChild === 'Duggu' ? 'active' : ''} onClick={() => setSelectedChild('Duggu')}>
        Duggu
      </Button>
      <Button className={selectedChild === 'Mikku' ? 'active' : ''} onClick={() => setSelectedChild('Mikku')}>
        Mikku
      </Button>
        
        <br/><br/>
     
      
      <form onSubmit={addMemory} >
       
        <div className="memories-form">

          {/* re-usable forms component is used here. */}
           <InputField label="Title:" value={title} onChange={(e) => setTitle(e.target.value)} />
           
            <br/><br/>
          
          <InputField label="Date:" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          
           <br/><br/>
         
          <InputField
            label="Description:"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="10"
            columns="10"
            maxLength="500"
          />
          
          <br/><br/>

          <div>
            <InputField label="Upload Photo:" type="file" onChange={handlePhotoChange} />
            {photo && (
              <div>
                <p>Preview:</p>
                <img src={photo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </div>
            )}
          </div>
           <br/><br/>

        <button type="submit" >Save Memory</button>
      
      </div>
      
      </form>
      
      <br/><br/>
      
      {/*Alert Message Boolean condition. */}
      {modalConfig.isOpen && (         
        <div className="modal">           
          <p>{modalConfig.message}</p>           
          <button onClick={() => setModalConfig({ isOpen: false, message: "" })}>OK</button>         
        </div> 
        )} 

       <br/><br/>


      {/* All saved Memories data will be displayed in this sequence */}
      <h2>Memories of {selectedChild}.</h2>
      
      {(!memories[selectedChild] || memories[selectedChild].length === 0) ? (
        <p>No memories of {selectedChild} to Display.</p>
      ) : (
       
       <div className='memories-card'>
          
          {memories[selectedChild].map((memory) => (
            <div key={memory.id} >

              {memory.photo && (
                <img src={memory.photo} alt={memory.title} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
              )}
              
              <br/><br/>
              <h3>{memory.title}</h3><br/><br/>
              <h4 >{memory.date}</h4><br/><br/>
              <p>{memory.description}</p><br/><br/>
              
             
              
            <button onClick={() => deleteMemory(memory.id)}>Delete Memory</button>
              
              
            </div>
         ))}
        
        </div>
      
      )}
    
    
    </div>
  

  );

};

export default MemoryPage;