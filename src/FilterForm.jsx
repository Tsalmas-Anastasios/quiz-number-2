import { useState } from "react";
import "./FilterForm.css";

export default function FilterForm(props) {
    const [filterValue, setFilterValue] = useState("");

    function hadleOnChange(e) {

        let filteredUsers = props.users.filter(user => {
            //make filtering case insensitive
            let userNameLowerCase = user.name.toLowerCase();
            let filterStringLowerCase = e.target.value.toLowerCase();
        
            return userNameLowerCase.includes(filterStringLowerCase);
        });
        
        setFilterValue(e.target.value);
        props.setUsers(filteredUsers);

    }
    
    return (
        <form className="filter-form" name="filterForm" action="" method="">
            <div className="filter-form-row">
                <label htmlFor="filter">Filter By Name:</label>
                <input id="filter" name="filterInput" type="text" onChange={hadleOnChange} value={filterValue}/>
                <button name="sortButton" type="button">Sort By Name</button>
            </div>
        </form>
    );
}