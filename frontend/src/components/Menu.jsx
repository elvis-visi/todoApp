export default function Menu({searchTerm, setSearchTerm, handleLogout}) {
    return (
      <div className="menu">
        <input 
        type="search" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
        
          <button onClick={handleLogout}>Log Out</button>
        
      </div>
    );
  }