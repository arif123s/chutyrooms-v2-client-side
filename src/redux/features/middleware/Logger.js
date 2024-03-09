const Logger =(state)=>(next)=>(action)=>{
    console.log('Current State=>',state.getState());
    console.log(action)
    next(action)
}

export default Logger;