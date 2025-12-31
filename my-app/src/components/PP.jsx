
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
                case 'inc':
                    return {...state, count: state.count + 1}
                case 'dec':
                    return {...state, count: state.count - 1}
                default: 
                    return state;
            }
        }
    



    return (
        <>
        <div style={{color: state.color, justifyContent: 'center', alignItems: 'left', height: '100vh'}}>
            <h1>PP Page</h1>
        </div>
        <input type="text" style={{justifyContent: 'center', alignItems: 'center', height: '100px', position: 'absolute', top: '40%'}} onChange={(e) => {dispatch({type: 'col', payload: e.target.value})}} />
        <button style={{position: 'absolute', top: '60%', right: '5%'}} onClick={(e) => dispatch({type: 'inc'})}>
            dec
        </button>
        <button style={{position: 'absolute', top: '60%', left: '5%'}} onClick={(e) => dispatch({type: 'dec'})}>
            inc
        </button>
        </>
    );
}

export default PP;