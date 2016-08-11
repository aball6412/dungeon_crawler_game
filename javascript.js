import React from "react";
import ReactDOM from "react-dom";


//Import created components
import Cell from "./components/cell";


class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        //Set up initial map space
        var map = [];
        
        for (var i = 1; i <= 8000; i++) {
            
            map.push(false);
        }
    
        
        //Set the initial state
        this.state = {
            map: map
        }
        
        
    } //End constructor
    
    
    
    
    
    check_cell(index) {
            
            
            console.log("Cell: " + index);
    }
    
    
    
    
    
    
    
    render() {
        
        //Get initial variables
        var map = this.state.map;
        var cells = [];
        for (var i = 0; i < 3400; i++) {
            
            cells.push(<Cell key={ i } count={ i } check_cell={ this.check_cell } />);
            
        }
        
        return (
        
            <div className="map">
                
                { cells }
                       
                       
            </div>
        
        );
    }
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


