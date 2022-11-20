import React from 'react';
import { Routes , Route, Link } from 'react-router-dom';

import CreateTask from './pages/CreateTask';
import ShowTask from './pages/ShowTask';
import ShowTaskDetail from './pages/ShowTaskDetail';

function App() {


    return (
        <div className="App">

            <div className='container'>

                


                <Routes>
                    <Route path="/*">
                        <Route index element={<ShowTask/>}/>
                        <Route path=':id' element={<ShowTaskDetail/>}/>
                    </Route>
                    <Route path='/create-task' element={<CreateTask/>}/>
                </Routes>
              
              
            </div>

           

        </div>
    );
}

export default App;