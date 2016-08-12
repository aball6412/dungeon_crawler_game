import React from "react";
import ReactDOM from "react-dom";


//Import created components
import Cell from "./components/cell";
import Map from "./components/maps";




class App extends React.Component {
    
    constructor(props) {
        super(props);
        
 
        //Set the initial state
        this.state = {
            map: [],
            user_position: null,
            view_start: 0,
            view_end: 850,
            make_map: []
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
        
        //Create all of the cells
        for (var i = 1; i <= 3000; i++) {
            map.push(false);
        }
        
        
        //Temporarily set all cells to be wall cells
        for (var i in map) {
            map[i] = "wall";
        }
        
        //Then layout the map path
        //Using variable "Map" (capital M) which we imported from maps.js
        for (var j in Map) {
            map[Map[j]] = "path";
        }
        
        //Layout enemies, health, weapons
        
        //Pick 10 random path cells for enemies
        //Random number between 0 and number of cells in the map
        var enemy_number = 10;
        
        var count = 0;
        while (count < 10) {
            //Get random number between 0 and Map length
            var random = Math.floor((Math.random() * Map.length) + 0);
            
            //Use random number to place an enemy at that index
            var enemy_location = Map[random];
            map[enemy_location] = "enemy";
            
            count = 0;
            for (var i = 0; i < map.length; i++) {
                if (map[i] === "enemy") {
                    count++;
                }
            }
            
        }
        
        
        //Pick random path cells for health
        
        //Pick 3 random path cells for weapons
        for (var k in Map) {
            
            
        }
        
        
        //Set the user position
        var user_position = 424;
        map[user_position] = true;
        
        //Set state
        this.setState({ map: map, user_position: user_position })
        
    } //End set up function
    
    
    
    
    //THIS FUNCTION IS FOR DEVELOPMENT HELP ONLY
    check_cell(index) {
        
        console.log("Cell: " + index);
        
        
        /****
        
        FOLLOWING CODE IS TO VISUALLY SET UP MAP
        DISPLAYS CELLS IN CONSOLE
        TO USE: IN CONSOLE LIST AS VARIABLE
        THEN CONVERT TO COMMA SEPARATED STRING
        THEN DISPLAY FULL STRING IN CONSOLE
        THEN CAN COPY AND ADD STRING TO "maps.js" COMPONENT IN SITE
        
        ****/
        
     
        /****
        
        //Set up variables
        var map = this.state.map;
        var make_map = this.state.make_map;

        //Make clicked cell part of the path
        map[index] = "path";
        

        make_map.push(index);
        console.log(make_map);
        
        this.setState({ map: map, make_map: make_map });
        
        ****/
        
    } //End check cell function
    
    
   

    move_user(event) {
        

        
        if (event.keyCode === 37) {
            //Left Arrow
            
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            
            if (map[user_position -1] != "wall") {
                
                //Move the user to the left
                map[user_position - 1] = true;
                map[user_position] = "path";
                
                //Set the new map and new user position
                this.setState({ map: map, user_position: user_position - 1 });
                
            }
            
            
        }
        
        
        else if (event.keyCode === 38) {
            //Up Arrow
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            
            
            //If moving up is not a wall
            if (map[user_position - 50] != "wall") {
                
                //Move the user up
                map[user_position - 50] = true;
                map[user_position] = "path";
                
                if ((user_position - 400) >= view_start && (user_position - 400) < view_start + 50 && (user_position - 400)  > 49) {
                    this.setState({ map: map, user_position: user_position - 50, view_start: view_start - 50, view_end: view_end - 50 });
                }
                
                else {
                    //Set the new map and new user position
                    this.setState({ map: map, user_position: user_position - 50 });
                }
                
                
            } //End big if statement
            
            
            
            
        }
        
        
        else if (event.keyCode === 39) {
            //Right Arrow
            
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
              
            if (map[user_position + 1] != "wall") {
                
                //Move the user up
                map[user_position + 1] = true;
                map[user_position] = "path";
                
                //Set the new map and new user position
                this.setState({ map: map, user_position: user_position + 1 });
                
            }

            
        }
        
        
        else if (event.keyCode === 40) {
            //Down Arrow
            
            
            //Get the map, current user position, and view port
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            

            if (map[user_position + 50] != "wall") {
                
                //Move the user up
                map[user_position + 50] = true;
                map[user_position] = "path";
                
                //Move the board along if we aren't at the bottom
                if ((user_position + 400) <= view_end && (user_position + 400) > view_end - 50 && (user_position + 400)  < 2950) {
                    this.setState({ map: map, user_position: user_position + 50, view_start: view_start + 50, view_end: view_end + 50 });
                }
                
                else{
                    //Set the new map and new user position
                    this.setState({ map: map, user_position: user_position + 50 });
                }
                
                
            } //End big if statement
    
        } //End else if statement
        
        
        
        
    } //End move user function
    
    
    
    
    
    
    
    render() {
        
        //Get initial variables
        var map = this.state.map;
        var view_start = this.state.view_start;
        var view_end = this.state.view_end;
        var cells = [];
        
        for (var i = view_start; i < view_end; i++) {
            
            cells.push(<Cell key={ i } count={ i } cell_state={ map[i] } check_cell={ this.check_cell.bind(this) } />);
            
        }
        
        return (
        

                <div className="map">
                    { cells }
                </div>

        
        );
    }
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


