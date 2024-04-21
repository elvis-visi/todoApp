import Menu from "./Menu"
import SortingComponent from "./SortingComponent"

const Header = () => {
    //include a menu toggle, button for filtering/sorting
     return(
       <div className="header"> 
          <Menu />
          <SortingComponent />
       </div>
     )
    }


    export default Header