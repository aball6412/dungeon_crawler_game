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
            make_map: [],
            health: 200,
            weapon: ["Bare Hands", "Knife", "Sword", "Magic Wand"],
            weapon_number: 0,
            attack: 20,
            rank: 1,
            xp: 0,
            enemies_left: 5,
            enemies_health: {},
            enemies_rank: 1,
            boss: false,
            game_over: false
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
        
        //Set the default initial state of game
        this.setState({
            map: [],
            user_position: null,
            view_start: 0,
            view_end: 850,
            make_map: [],
            health: 200,
            weapon: ["Bare Hands", "Knife", "Sword", "Magic Wand"],
            weapon_number: 0,
            attack: 20,
            rank: 1,
            xp: 0,
            enemies_left: 5,
            enemies_health: {},
            enemies_rank: 1,
            boss: false,
            game_over: false
        });
        
        
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
        
        //Set the user position
        var user_position = 424;
        map[user_position] = true;
        

        //Then layout the map path
        //Using variable "Map" (capital M) which we imported from maps.js
        for (var j in Map) {
            map[Map[j]] = "path";
        }
        
        //Layout enemies, health, weapons
        
        //Pick 10 random path cells for enemies
        var enemy_number = 5;
        var enemies_health = {};
        
        var count = 0;
        while (count < enemy_number) {
            //Get random number between 0 and Map length
            var random = Math.floor((Math.random() * Map.length) + 0);
            
            //Use random number to place an enemy at that index
            var enemy_location = Map[random];
            
            //Make sure space isn't taken by something else before placing
            if (map[enemy_location] === "path") {
                map[enemy_location] = "enemy";
                
                //Set enemies initial health
                var initial_health = 100;
                var key = enemy_location;
                enemies_health[key] = initial_health;
            }
            
            count = 0;
            for (var i = 0; i < map.length; i++) {
                if (map[i] === "enemy") {
                    count++;
                }
            }
            
        } //End while loop
        
        
        //Pick 5 random path cells for health
        var health_number = 10;
        
        var count = 0;
        while (count < health_number) {
            //Get random number between 0 and Map length
            var random = Math.floor((Math.random() * Map.length) + 0);
            
            //Use random number to place an enemy at that index
            var health_location = Map[random];
            
            //Make sure space isn't taken by something else before placing
            if (map[health_location] === "path") {
                map[health_location] = "health";
            }
            
            count = 0;
            for (var i = 0; i < map.length; i++) {
                if (map[i] === "health") {
                    count++;
                }
            }
            
        } //End while loop
        
        
        
        //Pick 3 random path cells for weapons
        var weapon_number = 3;
        
        var count = 0;
        while (count < weapon_number) {
            //Get random number between 0 and Map length
            var random = Math.floor((Math.random() * Map.length) + 0);
            
            //Use random number to place an enemy at that index
            var weapon_location = Map[random];
            
            //Make sure space isn't taken by something else before placing
            if (map[weapon_location] === "path") {
                map[weapon_location] = "weapon";
            }
            
            count = 0;
            for (var i = 0; i < map.length; i++) {
                if (map[i] === "weapon") {
                    count++;
                }
            }
            
        } //End while loop
        
  
        //Set state
        this.setState({ map: map, user_position: user_position, enemies_health: enemies_health });
        
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
            
            //Get game variables that we might need
            var health = this.state.health;
            var weapon_number = this.state.weapon_number;
            var attack = this.state.attack;
            var enemies_left = this.state.enemies_left;
            var xp = this.state.xp;
            var rank = this.state.rank;
            var boss = this.state.boss;
            var enemies_rank = this.state.enemies_rank;
            
            if (map[user_position - 1] != "wall") {
                

                if (map[user_position - 1] === "health") {
                    health += 10;
                }
                
                if (map[user_position - 1] === "weapon") {
                    weapon_number++;
                    attack += 20;
                }
                
                if (map[user_position - 1] === "enemy") {
                    var enemy_index = user_position - 1;
                    var battle_result = this.battle(enemy_index, enemies_rank);
                    
                    //Need to get health variable from state again due to any changes from battle result function
                    health = this.state.health;
                    
                    //If user loses
                    if (health <= 0) {
                        health = 0;
                        
                        if(battle_result === false) {
                            this.setState({ health: health });
                        }
                        
                        this.game_over("Loser");
                    }
                }
                
                
                //If user has beaten the boss then run game over function and make final user move
                if (battle_result === "Winner") {
                    //Move the user to the left
                    map[user_position - 1] = true;
                    map[user_position] = "path";
                    
                    this.setState({ map: map, user_position: user_position - 1 });
                    this.game_over("Winner");
                }
                
                
                if (battle_result === undefined || battle_result === true) {
                    
                    //Move the user to the left
                    map[user_position - 1] = true;
                    map[user_position] = "path";
                    
                    //Reduce enemies left by one if enemy vanquished and give XP points
                    if (battle_result === true) {
                        enemies_left --;
                        xp += 20;
                        //If user levels up then reset xp and increase rank
                        if (xp === 100) {
                            rank++;
                            xp = 0;
                            health += 100;
                        }
                        //Once all enemies are defeated add a boss
                        if (enemies_left <= 0 && boss != true) {
                            enemies_left = 0;
                            enemies_rank = 2;
                            boss = true;
                            //Add the boss to the map
                            map[2154] = "enemy";
                            map[2204] = "enemy";
                            map[2205] = "enemy";
                            map[2155] = "enemy";
                            
                            //Set enemies initial health
                            var enemies_health = this.state.enemies_health;
                            var initial_health = 50;
                            enemies_health[2154] = initial_health;
                            enemies_health[2204] = initial_health;
                            enemies_health[2205] = initial_health;
                            enemies_health[2155] = initial_health;

                        }
                        
                    }
                    
                    
                    
                    //If on boss then keep enemies left at 0
                    if (boss == true) {
                        enemies_left = 0;
                    }

                    
                    
                    //Set the new map and new user position
                    this.setState({ map: map, user_position: user_position - 1, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    
                }
                
                
            }
            
            
        }
        
        
        else if (event.keyCode === 38) {
            //Up Arrow
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            
            //Get game variables that we might need
            var health = this.state.health;
            var weapon_number = this.state.weapon_number;
            var attack = this.state.attack;
            var enemies_left = this.state.enemies_left;
            var xp = this.state.xp;
            var rank = this.state.rank;
            var boss = this.state.boss;
            var enemies_rank = this.state.enemies_rank;
            
            
            //If moving up is not a wall
            if (map[user_position - 50] != "wall") {
                
                if (map[user_position - 50] === "health") {
                    health += 10;
                }
                
                if (map[user_position - 50] === "weapon") {
                    weapon_number++;
                    attack += 20;
                }
                
                if (map[user_position - 50] === "enemy") {
                    var enemy_index = user_position - 50;
                    var battle_result = this.battle(enemy_index, enemies_rank);
                    
                    //Need to get health variable from state again due to any changes from battle result function
                    health = this.state.health;
                    
                    //If user loses
                    if (health <= 0) {
                        health = 0;
                        
                        if(battle_result === false) {
                            this.setState({ health: health });
                        }
                        
                        this.game_over("Loser");
                    }
                    
                }
                
                
                //If user has beaten the boss then run game over function
                if (battle_result === "Winner") {
                    //Move the user up
                    map[user_position - 50] = true;
                    map[user_position] = "path";
                    
                    this.setState({ map: map, user_position: user_position - 50 });
                    
                    this.game_over("Winner");
                }
                
                
                if (battle_result === undefined || battle_result === true) {
                    
                    //Move the user up
                    map[user_position - 50] = true;
                    map[user_position] = "path";
                    
                    //Reduce enemies left by one if enemy vanquished
                    if (battle_result === true) {
                        enemies_left --;
                        xp += 20;
                        //If user levels up then reset xp and increase rank
                        if (xp === 100) {
                            rank++;
                            xp = 0;
                            health += 100;
                        }
                        //Once all enemies are defeated add a boss
                        if (enemies_left <= 0 && boss != true) {
                            enemies_left = 0;
                            enemies_rank = 2;
                            boss = true;
                            //Add the boss to the map
                            map[2154] = "enemy";
                            map[2204] = "enemy";
                            map[2205] = "enemy";
                            map[2155] = "enemy";
                            
                            //Set enemies initial health
                            var enemies_health = this.state.enemies_health;
                            var initial_health = 50;
                            enemies_health[2154] = initial_health;
                            enemies_health[2204] = initial_health;
                            enemies_health[2205] = initial_health;
                            enemies_health[2155] = initial_health;
                        }
                    }
                    
                    
                    
                    
                    //If on boss then keep enemies left at 0
                    if (boss == true) {
                        enemies_left = 0;
                    }
                    
                    

                    if ((user_position - 400) >= view_start && (user_position - 400) < view_start + 50 && (user_position - 400)  > 49) {
                        this.setState({ map: map, user_position: user_position - 50, view_start: view_start - 50, view_end: view_end - 50, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    }

                    else {
                        //Set the new map and new user position
                        this.setState({ map: map, user_position: user_position - 50, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    }
                    
                    
                } //End if battle result statement
                
                
                
            } //End big if statement
            
            
            
            
        }
        
        
        else if (event.keyCode === 39) {
            //Right Arrow
            
            
            //Get the map and current user position
            var map = this.state.map;
            var user_position = this.state.user_position;
            
            //Get game variables that we might need
            var health = this.state.health;
            var weapon_number = this.state.weapon_number;
            var attack = this.state.attack;
            var enemies_left = this.state.enemies_left;
            var xp = this.state.xp;
            var rank = this.state.rank;
            var boss = this.state.boss;
            var enemies_rank = this.state.enemies_rank;
            
              
            if (map[user_position + 1] != "wall") {
                
                if (map[user_position + 1] === "health") {
                    health += 10;
                }
                
                if (map[user_position + 1] === "weapon") {
                    weapon_number++;
                    attack += 20;
                }
                
                if (map[user_position + 1] === "enemy") {
                    var enemy_index = user_position + 1;
                    var battle_result = this.battle(enemy_index, enemies_rank);
                    
                    //Need to get health variable from state again due to any changes from battle result function
                    health = this.state.health;
                    
                    //If user loses
                    if (health <= 0) {
                        health = 0;
                        
                        if(battle_result === false) {
                            this.setState({ health: health });
                        }
                        
                        this.game_over("Loser");
                    }
                }
                
                
                //If user has beaten the boss then run game over function
                if (battle_result === "Winner") {
                    //Move the user to the right
                    map[user_position + 1] = true;
                    map[user_position] = "path";
                    
                    this.setState({ map: map, user_position: user_position + 1 });
                    
                    this.game_over("Winner");
                }
                
                if (battle_result === undefined || battle_result === true) {
                    
                    //Move the user up
                    map[user_position + 1] = true;
                    map[user_position] = "path";
                    
                    //Reduce enemies left by one if enemy vanquished
                    if (battle_result === true) {
                        enemies_left --;
                        xp += 20;
                        //If user levels up then reset xp and increase rank
                        if (xp === 100) {
                            rank++;
                            xp = 0;
                            health += 100;
                        }
                        //Once all enemies are defeated add a boss
                        if (enemies_left <= 0 && boss != true) {
                            enemies_left = 0;
                            enemies_rank = 2;
                            boss = true;
                            //Add the boss to the map
                            map[2154] = "enemy";
                            map[2204] = "enemy";
                            map[2205] = "enemy";
                            map[2155] = "enemy";
                            
                            //Set enemies initial health
                            var enemies_health = this.state.enemies_health;
                            var initial_health = 50;
                            enemies_health[2154] = initial_health;
                            enemies_health[2204] = initial_health;
                            enemies_health[2205] = initial_health;
                            enemies_health[2155] = initial_health;
                        }
                      
                    }
                    
                    
                    
                    //If on boss then keep enemies left at 0
                    if (boss == true) {
                        enemies_left = 0;
                    }

                    
                    
                    //Set the new map and new user position
                    this.setState({ map: map, user_position: user_position + 1, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    
                }
                

                
            }

            
        }
        
        
        else if (event.keyCode === 40) {
            //Down Arrow
            
            
            //Get the map, current user position, and view port
            var map = this.state.map;
            var user_position = this.state.user_position;
            var view_start = this.state.view_start;
            var view_end = this.state.view_end;
            
            //Get game variables that we might need
            var health = this.state.health;
            var weapon_number = this.state.weapon_number;
            var attack = this.state.attack;
            var enemies_left = this.state.enemies_left;
            var xp = this.state.xp;
            var rank = this.state.rank;
            var boss = this.state.boss;
            var enemies_rank = this.state.enemies_rank;
            

            if (map[user_position + 50] != "wall") {
                
                if (map[user_position + 50] === "health") {
                    health += 10;
                }
                
                if (map[user_position + 50] === "weapon") {
                    weapon_number++;
                    attack += 20;
                }
                
                if (map[user_position + 50] === "enemy") {
                    var enemy_index = user_position + 50;
                    var battle_result = this.battle(enemy_index, enemies_rank);
                    
                    //Need to get health variable from state again due to any changes from battle result function
                    health = this.state.health;
                    
                    //If user loses
                    if (health <= 0) {
                        health = 0;
                        
                        if(battle_result === false) {
                            this.setState({ health: health });
                        }
                        
                        this.game_over("Loser");
                    }
                }
                
                //If user has beaten the boss then run game over function
                if (battle_result === "Winner") {
                    //Move the user down
                    map[user_position + 50] = true;
                    map[user_position] = "path";
                    
                    this.setState({ map: map, user_position: user_position + 50 });
                    
                    this.game_over("Winner");
                }
                
                
                if (battle_result === undefined || battle_result === true) {
                    
                    //Move the user up
                    map[user_position + 50] = true;
                    map[user_position] = "path";
                    
                    //Reduce enemies left by one if enemy vanquished
                    if (battle_result === true) {
                        enemies_left --;
                        xp += 20;
                        //If user levels up then reset xp and increase rank
                        if (xp === 100) {
                            rank++;
                            xp = 0;
                            health += 100;
                        }
                        //Once all enemies are defeated add a boss
                        if (enemies_left <= 0 && boss != true) {
                            enemies_left = 0;
                            enemies_rank = 2;
                            boss = true;
                            //Add the boss to the map
                            map[2154] = "enemy";
                            map[2204] = "enemy";
                            map[2205] = "enemy";
                            map[2155] = "enemy";
                            
                            //Set enemies initial health
                            var enemies_health = this.state.enemies_health;
                            var initial_health = 50;
                            enemies_health[2154] = initial_health;
                            enemies_health[2204] = initial_health;
                            enemies_health[2205] = initial_health;
                            enemies_health[2155] = initial_health;
                        }
                        
                    }
                    
                    
                    
                    //If on boss then keep enemies left at 0
                    if (boss == true) {
                        enemies_left = 0;
                    }
                    

                    
                    //Move the board along if we aren't at the bottom
                    if ((user_position + 400) <= view_end && (user_position + 400) > view_end - 50 && (user_position + 400)  < 2950) {
                        this.setState({ map: map, user_position: user_position + 50, view_start: view_start + 50, view_end: view_end + 50, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    }

                    else{
                        //Set the new map and new user position
                        this.setState({ map: map, user_position: user_position + 50, health: health, weapon_number: weapon_number, attack: attack, enemies_left: enemies_left, xp: xp, rank: rank, boss: boss, enemies_rank: enemies_rank });
                    }
  
                } //End if battle result statement
                
                
            } //End big if statement
    
        } //End else if statement
        
        
        
        
    } //End move user function
    
    
  
    battle(enemy_index, enemies_rank) {
        
        //Set up random battle damange function
        var battle_damage = function(attack, enemies_rank) {


            //Get enemy attack impact
            var random = Math.floor((Math.random() * 3) + 1);
            var base_damage = 10 * enemies_rank;           
            var total_damage = base_damage * random;
            
            
            //Get user attack impact
            var user_random = Math.floor((Math.random() * 3) + 1);
            var user_base_damage = attack;
            var user_total_damage = user_base_damage * user_random;
            
            
            var obj = {
                user_attack: user_total_damage,
                enemy_attack: total_damage
            }
            
            return obj;

            
        } //End battle damage function
        
        
        
        //Get specific enemy and get user attack strength
        var enemies_health = this.state.enemies_health;
        var my_enemy = enemy_index;
        var user_health = this.state.health;
        //Attack is equal to attack * rank of the user
        var attack = this.state.attack * this.state.rank;
        
        
        //Run the battle simulation
        var battle_damage = battle_damage(attack, enemies_rank);
        
        //Set new enemy and user health after battle
        enemies_health[my_enemy] = (enemies_health[my_enemy] - battle_damage.user_attack);
        user_health = (user_health - battle_damage.enemy_attack);
        
        this.setState({ health: user_health, enemies_health: enemies_health });
      
        
        
        //Check to see if there are any enemies left
        //First see if we are on the boss or not
        var boss = this.state.boss;
        
        var count = 0;
        for (var key in enemies_health) {
            if (enemies_health[key] > 0) {
                count++;
            }
        }
        

        //Return true if enemy is beaten and return "Winner" if Boss is beaten
        if (count === 0 && boss === true) {
            return "Winner";
        }
        else if (enemies_health[my_enemy] <= 0) {
            return true;
        }    
        else {
            return false;
        }
        
        
    } //End battle function
    
    
    
    game_over(result) {
        
        this.setState({ game_over: result });
        
    } //End game over function
    
    
    render() {
        
        //Get initial variables
        var map = this.state.map;
        var view_start = this.state.view_start;
        var view_end = this.state.view_end;
        var cells = [];
        var game_over = this.state.game_over;
        
        
        
        for (var i = view_start; i < view_end; i++) {
            
            cells.push(<Cell key={ i } count={ i } cell_state={ map[i] } check_cell={ this.check_cell.bind(this) } />);
            
        }
        
    
        //If game is on-going then...
        if (game_over === false) {
            
            return (
        
                <div>
                 
                 
                    <div className="stats">
                 
                 
                        <div className="stat_item">
                            <h4>Health: { this.state.health }</h4>
                        </div>
                 
                 
                        <div className="stat_item">
                            <h4>Weapon: { this.state.weapon[this.state.weapon_number] }</h4>
                        </div>
                 
                        
                        <div className="stat_item">
                            <h4>Attack: { this.state.attack }</h4>
                        </div>
                 
                        
                        <div className="stat_item">
                            <h4>Rank: { this.state.rank }</h4>
                        </div>
                 
                 
                        <div className="stat_item">
                            <h4>XP: { this.state.xp }</h4>
                        </div>
                 
                    
                        <div className="stat_item">
                            <h4>Enemies Remaining: { this.state.enemies_left }</h4>
                        </div>
                 
                 
                     </div>

                 
                 
                    <div className="map">
                        { cells }
                    </div>
                 
                 
                 
                 
                </div>

            );
            
        }
            
        else if (game_over === "Winner") {
            
            return (
                
                <div className="map">
                    <h2>You Win!!</h2>
                    <h2>Play again?</h2>
                    <button onClick={ () => { this.setup(); } } 
                    type="button" className="btn btn-success">Yes</button>
                    
                </div>
            
            );
        }
            
        else if (game_over === "Loser") {
            
            return (
            
                <div className="map">
                    <h2>You Lose.</h2>
                    <h2>Play again?</h2>
                    <button onClick={ () => { this.setup(); } } 
    
                    type="button" className="btn btn-success">Yes</button>
                </div>
            
            );
        }
            
            
        
    
    } //End render
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


