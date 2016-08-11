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
    
        map[1649] = true;
        
        //Bind needed functions
        this.move_user = this.move_user.bind(this);
        
        //Set the initial state
        this.state = {
            map: map,
            user_position: 1649
        }
        
        
    } //End constructor
    
    
    
    
    //THIS FUNCTION IS FOR DEVELOPMENT HELP ONLY
    check_cell(index) {
            console.log("Cell: " + index);
    }
    
    
    move_user(event) {
        
        //MAY NEED TO PREVENT DEFAULT
        
        
        if (event.keyCode === 37) {
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            //Move the user to the left
            map[user_position - 1] = true;
            map[user_position] = false;
            
            //Set the new map and new user position
            this.setState({ map: map, user_position: user_position - 1 });
            
        }
        
        
        else if (event.keyCode === 38) {
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            //Move the user up
            map[user_position - 100] = true;
            map[user_position] = false;
            
            //Set the new map and new user position
            this.setState({ map: map, user_position: user_position - 100 });
            
        }
        
        
        else if (event.keyCode === 39) {
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            //Move the user up
            map[user_position + 1] = true;
            map[user_position] = false;
            
            //Set the new map and new user position
            this.setState({ map: map, user_position: user_position + 1 });
            
            
        }
        else if (event.keyCode === 40) {
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            //Move the user up
            map[user_position + 100] = true;
            map[user_position] = false;
            
            //Set the new map and new user position
            this.setState({ map: map, user_position: user_position + 100 });
            
        }
        
    }
    
    
    
    
    
    
    
    render() {
        
        //Get initial variables
        var map = this.state.map;
        var cells = [];
        
        for (var i = 0; i < 3400; i++) {
            
            cells.push(<Cell key={ i } count={ i } cell_state={ map[i] } check_cell={ this.check_cell } />);
            
        }
        
        return (
        
            <div>
                 
                       
                <div className="text_box">
                           <input onKeyDown={ (event) => { this.move_user(event) } } type="text" />
                </div>
                       
                       
                <div className="map">
                    { cells }
                </div>
                     
                       
            </div>
        
        );
    }
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


