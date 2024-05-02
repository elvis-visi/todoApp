import Menu from "./Menu"
import SortingComponent from "./SortingComponent"

const Header = ({searchTerm, setSearchTerm, sortType, setSortType,handleLogout}) => {
    //include a menu toggle, button for filtering/sorting
    return (
      <div className="header">
          <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
          />
          <select
              value={sortType}
              onChange={e => setSortType(e.target.value)}
              className="sort-select"
          >
              <option value="none">No Sorting</option>
              <option value="priority">Sort by Priority</option>
              <option value="dateAdded">Sort by Date Added</option>
          </select>
          <button onClick={handleLogout} className="logout-button">
              Log Out
          </button>
      </div>
  );
    }


    export default Header