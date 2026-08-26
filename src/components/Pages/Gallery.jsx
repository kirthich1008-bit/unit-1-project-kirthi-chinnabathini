import { useState } from 'react';
import { useLocation } from 'react-router';
import './Pages.css';

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

  const Children =['All', 'Duggu', 'Mikku'];
  const DataType =['All', 'Milestone', 'Memories'];



  return (
    <div className="gallery-container">
      <h1>Children Gallery</h1>

       {/* Child selection  */}
      <div>
        <span>Child: </span>
        {Children.map((child) => (
         
         <button key={child} onClick={() => setSelectedChild(child)} style={{
                     marginRight: '8px',
                     padding: '6px 12px',
                     backgroundColor: selectedChild === child ? '#0f0e0e' : '#f0f0f0',
                     color: selectedChild === child ? '#fff' : '#000',
                     border: '1px solid #ccc',
                     borderRadius: '4px',
                     cursor: 'pointer',
                  }} >
            {child}
          </button>
        
        ))}
      </div>

      {/* Type Selection */}
      <div>
        <span>Type: </span>
        {DataType.map((type) => (
          
          <button key={`type-btn-${type}`} onClick={() => setFilterType(type)} style={{
                        marginRight: '8px',
                        padding: '6px 12px',
                        backgroundColor: filterType === type ? '#0f0e0e' : '#f0f0f0',
                        color: filterType === type ? '#fff' : '#000',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                     }} >
         {type === 'All' ? 'All Types' : type }
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
              <div>
                <strong>{data.childName}</strong> | <span>{data.type}</span>
              </div>
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