import React from "react";
import ReactDOM from "react-dom";



class App extends React.Component {
    
    
    render() {
        
        return (
        
            <h2>React up and running!</h2>
        
        );
    }
    
} //End app component




ReactDOM.render(<App />, document.querySelector(".app"));


