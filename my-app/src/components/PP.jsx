import { color } from "html2canvas/dist/types/css/types/color";
import { useReducer } from "react";



function PP() {

    const s = {
        count: 0,
        color: 'red',
    };
    
    const [state, dispatch] = useReducer(reducer, s)

        function reducer(state, action)  {
            switch(action.type){
                case: IN;
            }
        }
    



    return (
        <div>
            <h1>PP Page</h1>
        </div>
    );
}