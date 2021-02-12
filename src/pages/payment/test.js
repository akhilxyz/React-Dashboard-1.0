import React ,{ Component } from "react";


class Test extends Component {
    state = { 
        owners : [{"owner" :" owners1"}, { "owner": "owners2"}, { "owner" : "owners3"},{ "owner" : "owners4"}]
     }
    render() { 
        return ( 
               <div >
            { this.state.owners.map((it) => 
               ( <li><a href="#"> <h1>{it.owner}</h1></a></li>)
            )}
            </div>
         );
    }
}
 
export default Test;