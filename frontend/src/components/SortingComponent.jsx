export default function SortingComponent({sortType, setSortType}) {
    // Placeholder content
    return (
    
        <div className="sort-by">
          <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
        <option value="none">No Sorting</option>
        <option value="priority">Sort by Priority</option>
        <option value="dateAdded">Sort by Date Added</option>
      </select>
    </div>
     
    );
  }