import { useState, useEffect } from 'react'
import './scss/style.css'

function App() {

  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  const [ todo, setTodo ] = useState(() => {
    const getItems = localStorage.getItem('todos')
     return getItems ? JSON.parse(getItems) : ['Watching Solo Levelling', 'Cooking Samp', 'Soccer']
  });
  const [ newTasks, setNewTasks ] = useState('');
  const [ isCompleted, setIsCompleted ] = useState(Array(todo.length).fill(false));
  const [filter, setFilter] = useState('all')
  const handleChange = (event) => {
    setNewTasks(event.target.value);
  } 
  
  const addTask = () => {
    if(newTasks.trim() !== ''){
      setTodo(t => [...t, newTasks]);
      setNewTasks('');
    }
  }

  const deleteTask = (index) => {
    const updateTasks = todo.filter((_element, i) => i !== index);
    setTodo(updateTasks);
  }

  const lineThrough = (index) => {
    setIsCompleted(prev => {
      const active = [...prev];
      active[index] = !active[index]
      return active 
    }
  )}
  const filteredItems = todo.filter((_, index) => {
    if (filter === 'completed') return isCompleted[index];
    if (filter === 'active') return !isCompleted[index];
    return true;
  })

// TODO clear the the key at localStorage 
  const clearCompleted = () => {
    const newItems = todo.filter((_, index) => !isCompleted[index]);
    setTodo(newItems);
    setIsCompleted(Array(newItems.length).fill(false)); 
     
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo])


  const [ draggedItem, setDraggedItem ] = useState(null)
  const handleDragStart = index => setDraggedItem(index)
  const handleDragOver = e => e.preventDefault();
  const handleDrop = index => {
    const newItems = [...todo]
    const item = newItems.splice(draggedItem, 1)[0];
    newItems.splice(index, 0, item);
    setTodo(newItems)
  }

  const lightTheme = () => {
    const wrapper = document.querySelector('.wrapper');
    sunIcon.classList.add('hide');
    moonIcon.classList.remove('hide')
  }
  const darkTheme = () => {
    sunIcon.classList.remove('hide')
    moonIcon.classList.add('hide')
  }
  

  return (
    <>
      <img src="./src/assets/images/bg-desktop-dark.jpg" alt="bg-desktop-dark" className="bg-top-img"/>
      <img src="./src/assets/images/bg-mobile-dark.jpg" alt="bg-mobile-dark" className="mobile-bg" />
      <div className="wrapper">
        <div className="header">
          <p className="title">Todo</p>
          <img src="./src/assets/images/icon-sun.svg" alt="icon-sun"
          onClick={lightTheme}
          className="sun-icon icon"/>
          <img src="./src/assets/images/icon-moon.svg" alt="icon-sun"
          onClick={darkTheme}
          className="moon-icon hide icon"/>

        </div>
        <div className="new-todo todo">
          <img src="./src/assets/images/icon-check.svg" alt="" className="tick" onClick={addTask}/>
          <input type="text" id="new-todo-btn" value={newTasks} placeholder="Create a new todo.." onChange={() => handleChange(event)}/>
        </div>
        <div className="todo-list">
          {filteredItems.map((td, index) => 
            <div key={index}> 
              <div className="list-one todo" 
                              draggable
                              onDragStart={() => handleDragStart(index)}
                              onDragOver={(e) => handleDragOver(e)}
                              onDrop={() => handleDrop(index)}
              >
                <div className="block">
                  <img src="./src/assets/images/icon-check.svg"
                    alt="tick" className="tick"
                    onClick={() => lineThrough(index)}/>
                  <span className="todos" 
                  style={{textDecoration: isCompleted[index] ? 'line-through' : ''}}
                  >{ td }</span>
                </div> 
                <img src="./src/assets/images/icon-cross.svg" alt="cross" className="cross" onClick={() => deleteTask(index)}/>
              </div>
              <hr></hr>
            </div>
          )}
          <div className="status">
            <div className="items">
              <p> 
                <span className="number-of-items act"></span>
                { todo.length } items left
              </p>
            </div>

            <div className="active">
              <p className="activated act" onClick={() => setFilter('all')} >All</p>
              <p className="act" 
              // style={{backgroundColor: setFilter('active') ? 'red' : 'white'}} 
              onClick={() => setFilter('active')}>Active</p>
              <p className="act" 
              // style={{backgroundColor: setFilter('completed') ? 'red' : 'white'}}
              onClick={() => setFilter('completed')}>Completed</p>
            </div>
            <div className="clear-completed act" onClick={clearCompleted}> <p>Clear Completed</p></div>

          </div>
          
        </div>
        
        <p className="drag-drop">Drag and drop to reorder list</p>

        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://www.github/Thato-t">Thato</a>.
        </div>
      </div>
    </>
  )
}

export default App