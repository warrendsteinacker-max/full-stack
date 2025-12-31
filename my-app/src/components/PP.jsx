
import { useReducer } from "react";



function PP() {

    const s = {
        count: 0,
        color: 'red',
    };
    
    const [state, dispatch] = useReducer(reducer, s)

        function reducer(state, action)  {
            switch(action.type){
                case 'col':
                    return {...state, color: action.payload}
                default: 
                    return state;
            }
        }
    



    return (
        <>
        <div style={{color: state.color, justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <h1>PP Page</h1>
        </div>
        <input type="text" onChange={(e) => {dispatch({type: 'col', payload: e.target.value})}} />
        </>
    );
}

export default PP;