import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import './Pages.css';

function MemoryPage() {

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

  
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('childrenMemories');
    return saved ? JSON.parse(saved) : { Duggu: [], Mikku: [] };
  });

  
  useEffect(() => {
    localStorage.setItem('childrenMemories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (e) => {
    e.preventDefault();
    if (!selectedChild) {
      alert('Please select a child first!');
      return;
    }
    if (!title || !date || !description) {
      alert('Please fill all required fields!');
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

      
      <h1>Memories</h1>
        
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
     
      
     
      <form onSubmit={addMemory} >
        <div className="memories-form">

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
              <img src={photo} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px'}} />
            </div>
          )}
       
        </div>

        <br/><br/>

        <button type="submit" >Save Memory</button>
      
      </div>
      
      </form>
      
      <br/><br/>

      
     
      <h2>Memories of {selectedChild}.</h2>
      
      {(!memories[selectedChild] || memories[selectedChild].length === 0) ? (
        <p>No memories of {selectedChild} to Display.</p>
      ) : (
       
       <div className='memories-card'>
          
          {memories[selectedChild].map((memory) => (
            <div key={memory.id} >

              {memory.photo && (
                <img src={memory.photo} alt={memory.title} style={{ maxWidth: '300px', maxHeight: '300px' }}/>
              )}
              
              <br/><br/>
              <h3>{memory.title}</h3><br/><br/>
              <h4 >{memory.date}</h4><br/><br/>
              <p>{memory.description}</p><br/><br/>
              
             
              <Link to="/memories">
              <button onClick={() => deleteMemory(memory.id)}>Delete Memory</button>
              </Link>
              
            </div>
         ))}
        
        </div>
      
      )}
    
    
    </div>
  

  );

};

export default MemoryPage;