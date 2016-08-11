import React from "react";


var Cell = function(props) {
    
    //Get needed variables
    var index = props.count;
    
    //Test function
    var check_cell = props.check_cell;
    
    return (
    
        <div onClick={ () => { check_cell(index) }} className="cell">
        
        </div>
    
    );
    
    
    
    
} //End cell component



export default Cell;

