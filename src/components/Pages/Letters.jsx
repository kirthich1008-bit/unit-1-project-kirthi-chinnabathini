import { useState, useEffect } from 'react';  
import './Pages.css';  

function LetterPage() {      
  const [selectedChild, setSelectedChild] = useState('');    
  const [title, setTitle] = useState('');    
  const [date, setDate] = useState('');    
  const [details, setDetails] = useState('');    
  const [editLetter, setEditLetter] = useState(null);   
  
  // For alerting message to the user that all data should be filled to proceed further to save data.
  const [modalConfig, setModalConfig] = useState({ isOpen: false, message: "" });      

  const [letter, setLetter] = useState(() => {      
    const saved = localStorage.getItem('Letters');      
    return saved ? JSON.parse(saved) : { Duggu: [], Mikku: [] };    
  });     

  useEffect(() => {      
    localStorage.setItem('Letters', JSON.stringify(letter));    
  }, [letter]);     

  const handleChildChange = (childName) => {      
    setSelectedChild(childName);   
    
    };    
    
    const resetForm = () => {
    setTitle('');
    setDate('');
    setDetails('');
    setEditLetter(null);
  };

  
   const addLetter = (e) => {      
    e.preventDefault();           
    

    // alerting modal message.
    if (!selectedChild) {        
      setModalConfig({ isOpen: true, message: "Please select a child!" });        
      return;      
    }      
    if (!title.trim() || !date || !details.trim()) {        
      setModalConfig({ isOpen: true, message: "Please fill all required fields!" });        
      return;      
    }          

    if (editLetter) {        
      setLetter((prevLetter) => ({          
        ...prevLetter,          
        [selectedChild]: (prevLetter[selectedChild] || []).map((letter) =>            
          letter.id === editLetter              
            ? { ...letter, title: title.trim(), date: date, details: details.trim() }              
            : letter        
        ),        
      }));  
      resetForm();
      
    } else {        
      const newLetter = {          
        id: Date.now(),          
        title: title.trim(),          
        date: date,          
        details: details.trim(),        
      };        
      setLetter((prevLetter) => ({          
        ...prevLetter,          
        [selectedChild]: [newLetter, ...(prevLetter[selectedChild] || [])],        
      }));     
      resetForm();
    }       

  };     

  const deleteLetter = (id) => {      
    setLetter((prevLetter) => ({        
      ...prevLetter,        
      [selectedChild]: (prevLetter[selectedChild] || []).filter((letter) => letter.id !== id),      
    }));      
    if (editLetter === id) {        
      setEditLetter(null);  
    }    
  };     

  const edit = (id) => {      
    const letterToEdit = letter[selectedChild]?.find((letter) => letter.id === id);      
    if (!letterToEdit) return;      
    setEditLetter(id);      
    setTitle(letterToEdit.title);      
    setDate(letterToEdit.date);      
    setDetails(letterToEdit.details);    
  };     

  return (      
    <div className='letters-data'>        
      <h1>Letters:</h1>                        
      <label>Select: </label>               
      
      <button className={selectedChild === 'Duggu' ? 'active' : ''} onClick={() => handleChildChange('Duggu')}> Duggu </button>               
      <button className={selectedChild === 'Mikku' ? 'active' : ''} onClick={() => handleChildChange('Mikku')}> Mikku </button>               
      
      <form onSubmit={addLetter}>          
       
        <div className="letters-form">                      
         
          <h2>{editLetter ? 'Edit Letter' : 'New Letter'}</h2>                       
          
          <div>                          
           
            <label>Title: </label>              
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />                       
         
          </div>                       
          
          <div>                           
           
            <label>Date: </label>              
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />                       
         
          </div>                       
          
          <div>              
            
            <label>Letter: </label>              
            <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={10} columns={10} maxLength={800} />            
         
          </div>            
         
          <button type="submit">{editLetter ? 'Update Letter' : 'Save Letter'}</button>                   
        
        </div>               
     
      </form>              
       {/* Modal conditional rendering to make sure all feilds are filled */}
      {modalConfig.isOpen && (         
        <div className="modal">           
          <p>{modalConfig.message}</p>           
          <button onClick={() => setModalConfig({ isOpen: false, message: "" })}>OK</button>         
        </div>       
      )}        
       <br/><br/>    
            
            
      <h2>Letters for {selectedChild}</h2>               
     
      {(!selectedChild || !letter[selectedChild] || letter[selectedChild].length === 0) ? (                 
        <p>No letters for {selectedChild} to Display.</p>               
      ) : (                 
       
       <div className='letters-grid'>                      
          
          {letter[selectedChild].map((letter) => (                           
            
            <div key={letter.id} className="letter-card">   
                       
              <h3>{letter.title}</h3>
              <h4>{letter.date}</h4>
              <p>{letter.details}</p>
              
              
              <button onClick={() => deleteLetter(letter.id)}>Delete Letter</button>                
              <button onClick={() => edit(letter.id)}>Edit Letter</button>                           
            
            </div>            
         
         ))}          
       
        </div>        
     
     )}      
   
     </div>
 
   );  
};  

export default LetterPage;