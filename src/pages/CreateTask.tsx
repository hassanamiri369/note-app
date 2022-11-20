import React , {useState , FormEvent , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
// import nextId from "react-id-generator";
import { TaskContext } from '../context/TaskContext';

const CreateTask = () => {

    const context = useContext(TaskContext)
    const { AddTask} = context;

    const navigate = useNavigate()

    
    const [username , setUsername] = useState<string>("")
    const [email, setEmail]=useState<string>("")
    const [task , setTask] = useState<string>("")
    const [img_url , setImg_url] = useState<string>("")
    const [color , setColor] = useState<string>("")


    const resetInput = () : void=>{
        setUsername("")
        setEmail("")
        setTask("")
        setImg_url("")
        setColor("")  
    }
    
    const handleSubmit = (e : FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            if(!username){
                return alert("نام را وارد کنید ")
            }
            if(!email){
                return alert("ایمیل را وارد کنید ")
            }
            if(!task){
                return alert("تسک مورد نظر را وارد کنید ")
            }

            const newTask = {id : Number(new Date()) , username , email , task , complete : "doing task" , color : color , img_url : img_url}
            AddTask(newTask)
            navigate("/")
            resetInput()
    }
    
    return (
        <div className='create-task-container'>

            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label>UserName : </label>
                    <input type={'text'}  value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
                </div>

                <div>
                    <label>Email : </label>
                    <input type={'text'} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="username" />
                </div>

                <div>
                    <label>Image : </label>
                    <input type={'text'} value={img_url} onChange={(e)=> setImg_url(e.target.value)} placeholder="image url" />
                </div>
                <div>
                    <label>Task : </label>
                    <textarea placeholder="username" value={task} onChange={(e)=> setTask(e.target.value)}></textarea>
                </div>


                <div>
                    <label>select color</label>
                    <input type={'color'} value={color} onChange={(e)=> setColor(e.target.value)} placeholder="select color" />
                </div>
                <div>
                    <button className='create-button' type='submit'>create new task</button>
                    <button className='cancel-button' onClick={()=> navigate("/")}>cancel</button>
                </div>
            </form>
        </div>
    )
}

export default CreateTask