export default function Menu() {
    return (
      <div className="menu">
        <input type="search" placeholder="Search..." />
        <ul className="menu-items">
          <li><a href="/stats">Stats</a></li>
          <li><a href="/today">Today</a></li>
          <li><a href="/logout">Log Out</a></li>
        </ul>
      </div>
    );
  }