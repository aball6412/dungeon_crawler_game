import React from "react";


var Cell = function(props) {
    
    //Get needed variables
    var index = props.count;
    var cell_state = props.cell_state;
    
    //Test function
    var check_cell = props.check_cell;
    

    
    if(cell_state === true) {
        
        return (
            <div onClick={ () => { check_cell(index) }} className="user_cell"></div>
        );
        
    }

    else if (cell_state === "wall") {
        
        return (
            <div onClick={ () => { check_cell(index) }} className="wall"></div>
        );
        
    }
    else {
        
        return (
            <div onClick={ () => { check_cell(index) }} className="cell"></div>
        );
        
    }
    
    
    
    
    
} //End cell component



export default Cell;

