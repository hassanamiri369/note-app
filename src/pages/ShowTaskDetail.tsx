import React  from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { TaskContext } from '../context/TaskContext'

const ShowTaskDetail = () => {
   
    // const {state} = useContext(TaskContext)


    const {id} = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    
    // console.log(location.state)
  return (
    <div className='showDetail-container'>
    <div className='showDetail-content' style={{backgroundColor : `${location.state.color ? location.state.color: "white"}`}}>
        <h5>User Name :{location.state.username}</h5>
        <p> Email :{location.state.email}</p>
        <img width={'300px'} height={'300px'} src={location.state.img_url} alt="user " />
        <h2>Task : </h2>
        <pre>{location.state.task}</pre>
        
        <div>
        <button onClick={()=> navigate("/")}>go back tasks</button>
        </div>
        </div>
    </div>
  )
}

export default ShowTaskDetail