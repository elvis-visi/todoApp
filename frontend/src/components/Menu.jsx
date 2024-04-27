export default function Menu({searchTerm, setSearchTerm, handleLogout}) {
    return (
      <div className="menu">
        <input 
        type="search" 
        placeholder="Search..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="menu-items">
          <li><a href="/stats">Stats</a></li>
          <li><button onClick={handleLogout}>Log Out</button></li>
        </ul>
      </div>
    );
  }