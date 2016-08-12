import React from "react";
import ReactDOM from "react-dom";


//Import created components
import Cell from "./components/cell";


class App extends React.Component {
    
    constructor(props) {
        super(props);
        
 
        //Set the initial state
        this.state = {
            map: [],
            user_position: null,
            view_start: 0,
            view_end: 850
        }
        
        
        
        
    } //End constructor
    
    //Once the component mounts for the first time
    componentDidMount() {
        
        //Add the event listener
        document.addEventListener("keydown", this.move_user.bind(this));
        
        //Run the initial setup function
        this.setup();
    }
    
    setup() {
        
        //Set up initial map space
        var map = [];
        
        //Create the cells
        for (var i = 1; i <= 3000; i++) {
            map.push(false);
        }
        
        //Make map border: top, left, right, bottom
        for (var i = 0; i < 50; i++) {
            map[i] = "wall";
        }
        
        var j = 0;   
        while(j <= 2950) {
            map[j] = "wall";
            j += 50;
        }
        
        j = 49;
        while(j <= 2999) {
            map[j] = "wall"
            j += 50;
        }
        
        for (var i = 2950; i < 3000; i++) {
            map[i] = "wall";
        }
        
//        for (var i = 0; i <= 2950; (i + 50)) {
//            map[i] = "dead";
//        }
//        
//        for (var i = 49; i <= 2999; (i + 50)) {
//            map[i] = "dead";
//        }
    
        //TEMPORARILY PUT USER IN MIDDLE OF SCREEN FOR TESTING
        map[424] = true;
        
        //Set state
        this.setState({ map: map, user_position: 424 })
        
    } //End set up function
    
    
    
    
    //THIS FUNCTION IS FOR DEVELOPMENT HELP ONLY
    check_cell(index) {
            console.log("Cell: " + index);
    }
    
    
   

    move_user(event) {
        
        
        if (event.keyCode === 37) {
            //Left
            
            
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
            //Up
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            
            //Move the user up
            map[user_position - 50] = true;
            map[user_position] = false;
            
            if ((user_position - 400) >= view_start && (user_position - 400) < view_start + 50 && (user_position - 400)  > 49) {
                this.setState({ map: map, user_position: user_position - 50, view_start: view_start - 50, view_end: view_end - 50 });
            }
            else {
                //Set the new map and new user position
                this.setState({ map: map, user_position: user_position - 50 });
            }
            
            
            
        }
        
        
        else if (event.keyCode === 39) {
            //Right
            
            
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
            //Down
            
            console.log("down");
            
            //Get the map, current user position, and view port
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            
            //Move the user up
            map[user_position + 50] = true;
            map[user_position] = false;
            
            //Move the board along if we aren't at the bottom
            if ((user_position + 400) <= view_end && (user_position + 400) > view_end - 50 && (user_position + 400)  < 2950) {
                this.setState({ map: map, user_position: user_position + 50, view_start: view_start + 50, view_end: view_end + 50 });
            }
            else{
                //Set the new map and new user position
                this.setState({ map: map, user_position: user_position + 50 });
            }
            
            
            
        }
        
    }
    
    
    
    
    
    
    
    render() {
        
        //Get initial variables
        var map = this.state.map;
        var view_start = this.state.view_start;
        var view_end = this.state.view_end;
        var cells = [];
        
        for (var i = view_start; i < view_end; i++) {
            
            cells.push(<Cell key={ i } count={ i } cell_state={ map[i] } check_cell={ this.check_cell } />);
            
        }
        
        return (
        

                <div className="map">
                    { cells }
                </div>

        
        );
    }
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


