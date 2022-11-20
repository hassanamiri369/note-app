import React, { createContext,  useReducer , useEffect} from "react"


// useState management

// interface ITaskProviderProps {
//   children : React.ReactNode
// }
// interface ITasks {
//   id : number;
//   username : string;
//   email : string;
//   task : string;
//   complete : string;
//   color : string
// }



// const initState = {
//   tasks : [],
//   currentTask : {}
// }

// interface ITaskContext{
//   tasks: ITasks[];
//   currentTask : ITasks | {};
// }

// interface ICreateContext {
//   state : ITaskContext;
//   setState : React.Dispatch<SetStateAction<ITaskContext>>
// }

// export const  TaskContext = createContext<ICreateContext>({} as ICreateContext)

// const TaskContextProvider = ({children} : ITaskProviderProps)=>{

//   const [state , setState] = React.useState<ITaskContext>(initState)

//   return(
//     <TaskContext.Provider value={{state , setState}}>
//               {children}
//     </TaskContext.Provider>
//   )
// }

// export default TaskContextProvider


// useReducer management 

interface IContextProvider {
  children : JSX.Element | JSX.Element[]    // React.ReactNode
}

export interface ITasks {
  id : number;
  username : string;
  email : string;
  task : string;
  complete : string;
  color : string;
  img_url : string;
}

interface IState {
  tasks : ITasks[];
  currentTask? : ITasks | {}
}



type IActionType = 
| {type : "addTask" , payload : ITasks} 
| {type : "toggleTodo" , payload : ITasks}
| {type : "removeTask" , payload : ITasks[]}
| {type : "completeTask" , payload : ITasks[]}
| {type : "updateMode" , payload : ITasks[]}


interface ITaskContext {
  state : IState;
  // dispatch :  React.Dispatch<IActionType>
  AddTask : (newTask : ITasks) => void
  removeTask : (id : number)=> void
  completeTask : (item : ITasks , value : string)  => void
  editTask : (item : ITasks) => void
}
export const TaskContext = createContext<ITaskContext>({} as ITaskContext)

const initState = {
  tasks : [{
    id : Number(new Date()) 
    , username : "ali" 
    , email : "ali@gmail.com" 
    , task :"create note app  " 
    , complete : "doing task" 
    , color : "" 
    , img_url : "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"}
],

  currentTask : {}
}




const reducer = (state : IState , action : IActionType ) =>{
  switch(action.type){
    case "addTask":
      return {...state , tasks : [...state.tasks , action.payload]}
    
    case "removeTask" :
      return {...state , tasks : action.payload}


    case "completeTask":
      return {...state , tasks : action.payload}

    
    case "updateMode":
      return {...state , tasks : action.payload}

    default :
      return state
  }
}

const TaskContextProvider = ({children} : IContextProvider) =>{

  const [state , dispatch ] = useReducer(reducer , initState)

  
  useEffect(()=>{
    localStorage.setItem("task" , JSON.stringify(state.tasks))
  } , [state])

  const AddTask = (newTask : ITasks) : void=>{
    dispatch({type : "addTask" , payload : newTask})
  }

  const removeTask = (id : number) : void=>{
      const updatedTasks : ITasks[]  = state.tasks.filter(item => item.id !== id)
      dispatch({type : "removeTask" , payload : updatedTasks})
  }

  const completeTask = (item : ITasks , value : string)=>{
    const updatedTasks = state.tasks.map(task => task.id === item.id ? {...task , complete : value} : task)
    dispatch({type : "completeTask" , payload : updatedTasks})
  }


  const editTask = (item : ITasks)=>{
    const editTaskModal = item;
    const AllTaskData = state.tasks;
    const index = AllTaskData.findIndex(x => x.id === editTaskModal.id)
    AllTaskData[index] = editTaskModal
    dispatch({type : "updateMode" , payload : AllTaskData})
  }

  return(
    <TaskContext.Provider value={{state  , AddTask , removeTask , completeTask , editTask}}>
      {children}
    </TaskContext.Provider>
  )
}



export default TaskContextProvider
















