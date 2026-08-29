import { useState } from 'react';
import { useLocation } from 'react-router';


function GalleryPage({data}) {
  
  const location = useLocation();
  const initialChild = location.state?.childName || 'All';


  const [selectedChild, setSelectedChild] = useState(initialChild);
  const [filterType, setFilterType] = useState('All');


  // filtering data according to child and type.
  const filteredData = data.filter((data) => {
    const child = selectedChild === 'All' || data.childName === selectedChild;
    const type = filterType === 'All' || data.type === filterType;
    return child && type;
  });

  return (
    <div className="gallery-container">
      <h1>Children Gallery</h1>

       {/* Child selection  */}
      <div className='child-selection'>
        <span>Child: </span>
        {['All', 'Duggu', 'Mikku'].map((child) => (
         
         <button key={child} onClick={() => setSelectedChild(child)} >
            {child}
          </button>
        
        ))}
      </div>

      {/* Type Selection */}
      <div className="type-selection">
        <span>Type: </span>
        {['All', 'Milestone', 'Memory'].map((type) => (
          
          <button key={type} onClick={() => setFilterType(type)} >
            {type === 'All' ? 'All Types' : type}
          </button>
        
        ))}
      </div>

      {/* All Data */}
      {filteredData.length === 0 ? (
        <p>No memories or milestones to display.</p>
      ) : (
        
        <div className="gallery-grid">
          {filteredData.map((data) => (
            <div key={`${data.type}-${data.id}`} className="gallery-card">
              
              <strong>{data.childName}</strong> | <span>{data.type}</span>
              
              {data.photo && <img src={data.photo} alt={data.title} />}
              <h3>{data.title}</h3>
              <h4>{data.date}</h4>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryPage;