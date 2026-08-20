import { useState, useEffect } from 'react';
import { Link } from 'react-router';

function MemoryPage() {
  const [selectedChild, setSelectedChild] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState("");

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
    if (!title.trim() || !date || !description.trim()) {
      alert('Please fill all required fields!');
      return;
    }

    const newMemory = {
      id: Date.now(),
      title: title.trim(),
      date,
      description: description.trim(),
      photo: photo // Saved the image into the memory object
    };

    setMemories((prevMemories) => ({
      ...prevMemories,
      [selectedChild]: [newMemory, ...(prevMemories[selectedChild] || [])],
    }));

    
    setTitle('');
    setDate('');
    setDescription('');
    setPhoto('');
    e.target.reset(); 
  };

  const deleteMemory = (id) => {
    setMemories((prevMemories) => ({
      ...prevMemories,
      [selectedChild]: (prevMemories[selectedChild] || []).filter(
        (memory) => memory.id !== id
      ),
    }));
  };

  return (
    <div >
      <h1>Memories</h1>
  
      <form onSubmit={addMemory} >
        
        <div className='memory-form'>
         
          <label >Select Child:</label>
          <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)}>
            
            <option value="">----</option>
            <option value="Duggu">Duggu</option>
            <option value="Mikku">Mikku</option>
          
          </select>
        </div>

        <div>
         
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        </div>

        <div>
         
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        
        </div>

        <div>
         
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4"/>
        
        </div>

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

        <button type="submit">Save Memory</button>
      
      
      </form>

      

      <h2>Memories of {selectedChild}</h2>
      
      {(!memories[selectedChild] || memories[selectedChild].length === 0) ? (
        <p>No memories yet for {selectedChild}.</p>
      ) : (
       
       <div >
          
          {memories[selectedChild].map((memory) => (
            <div key={memory.id} >
              <h3>{memory.title}</h3>
              <small >{memory.date}</small>
              <p>{memory.description}</p>
              {memory.photo && (
                <img src={memory.photo} alt={memory.title} style={{ maxWidth: '200px', maxHeight: '200px' }}/>
              )}
              <Link to="/memories">
              <button onClick={() => deleteMemory(memory.id)}>Delete Memory</button>
              </Link>
              
            </div>
         ))}
        
        </div>
      
      )}
    
    </div>
  
  );
}

export default MemoryPage;