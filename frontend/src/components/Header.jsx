import Menu from "./Menu"
import SortingComponent from "./SortingComponent"

const Header = ({searchTerm, setSearchTerm, sortType, setSortType}) => {
    //include a menu toggle, button for filtering/sorting
     return(
       <div className="header"> 
          <Menu 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          />
          <SortingComponent 
            sortType={sortType}
            setSortType={setSortType}
          />
       </div>
     )
    }


    export default Header