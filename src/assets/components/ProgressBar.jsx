const ProgressBar = ({ current, total }) => {
    const progress = (current / total) * 100;
  
    return (
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', marginBottom: '20px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: '#A729F5', // Purple color for progress
            height: '10px',
            borderRadius: '5px',
          }}
        />
      </div>
    );
  };
  
  export default ProgressBar;
  