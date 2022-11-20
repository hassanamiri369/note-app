import React, { useContext, useState, FormEvent } from 'react'
import Modal from "react-modal"
import { TaskContext } from '../context/TaskContext';
import { Link, Outlet } from 'react-router-dom';

// interface
import { ITasks } from '../context/TaskContext';

Modal.setAppElement('#root');


const ShowTask = () => {
  const context = useContext(TaskContext)
  const { state, removeTask, completeTask } = context;

  console.log(state)


  // modal 
  const [modalUserName, setModalUserName] = useState("")
  const [modalEmail, setModalEmail] = useState("")
  const [modalTask, setModalTask] = useState("")
  const [modalColor, setModalColor] = useState("")
  const [modalImg_url, setModalImg_url] = useState<string>("")



  const [modalData, setModalData] = useState<ITasks>({} as ITasks)
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleModal = (item: ITasks) => {
    setModalData(item)
    openModal()
  }

  React.useEffect(() => {

    setModalUserName(modalData.username)
    setModalEmail(modalData.email)
    setModalTask(modalData.task)
    setModalImg_url(modalData.img_url)
    setModalColor(modalData.color)
  }, [modalData])


  const handleModalSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let updateModalState: ITasks = { id: modalData.id, complete: modalData.complete, username: modalUserName, task: modalTask, email: modalEmail, color: modalColor, img_url: modalImg_url }
    context.editTask(updateModalState)
    setModalUserName("")
    setModalEmail("")
    setModalTask("")
    setModalColor("")
    setModalImg_url("")
    closeModal()
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "400px",
      minHeight: "400px",
      // display : "flex",
      // flexDirection : "column",
      lineHeight: "40px",
      padding: "20px",
      backgroundColor: "lightBlue"

    },

  };


  return (
    <div className='show-task-container'>

      <div className='create-task-button'>
        <Link to={'/create-task'}>+</Link>
      </div>

     <div className='show-task-content'>
     {state.tasks.map(item => <div key={item.id} className={`${item.complete === "doing task" ? 'content-doing' : "content-done"}`}>
        <div className='content-text'>
        <Link to={`${item.id}`} state={item}>
          <div>{item.username}</div>
          <div>{item.email}</div>
          
        </Link>
        </div>

        <div className='content-select'>
          
        <select value={item.complete} onChange={(e) => completeTask(item, e.target.value)}>
          <option value={'doing task'}>doing task</option>
          <option value={'done task'}>done task</option>
        </select>
        
        </div>
        <div className='content-button'>
          <button className='delete' onClick={() => removeTask(item.id)}>remove task</button>
          <button className='edit' onClick={() => handleModal(item)}>edit task</button>
        </div>
      </div>)}
     </div>
      <Outlet />


      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}

      >

        <div className='modal-edit-mode'>
          <form onSubmit={(e) => handleModalSubmit(e)}>
            <div className='modal-div'>
              <label>userName </label>
              <input type={'text'} name="name" placeholder="name" value={modalUserName} onChange={(e) => setModalUserName(e.target.value)} />
            </div>

            <div className='modal-div'>
              <label>email </label>
              <input type={'text'} name="email" placeholder="email" value={modalEmail} onChange={(e) => setModalEmail(e.target.value)} />
            </div>

            <div className='modal-div'>
              <label>image </label>
              <input type={'text'} name="name" placeholder="image url" value={modalImg_url} onChange={(e) => setModalImg_url(e.target.value)} />
            </div>


            <div className='modal-div'>
              <label>Task </label>
              <textarea value={modalTask} name="task" onChange={(e) => setModalTask(e.target.value)}></textarea>
            </div>

            <div className='modal-div'>
              <label>color</label>
              <input type={'text'} name="name" placeholder="color" value={modalColor} onChange={(e) => setModalColor(e.target.value)} />
            </div>

            <div className='modal-div'>
              <button type='submit' >update task</button>
              <button onClick={closeModal}>close</button>
            </div>
          </form>
        </div>
      </Modal>

    </div>
  )
}

export default ShowTask