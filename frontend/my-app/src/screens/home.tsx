import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, List, CircularProgress ,ListItem, Paper, Checkbox, IconButton, AppBar, Toolbar } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { RouteComponentProps } from 'react-router-dom';


//i should have implemented redux state management but duo to short time i had to make all logic here

interface TaskScreenProps extends RouteComponentProps {}


interface User {
  email: string;
  name: string;
  _id: string;
  token: string;
}



interface Task {
    createdAt: string;
    description: string;
    dueDate: string;

    isCompleted: boolean;
    taskId: string;

    taskName: string;
    updatedAt: string;
  }
  

const HomePage: React.FC<TaskScreenProps> = ({location, history}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 2; 
  const [newTask, setNewTask] = useState<string>("");

  const storedUser: string | null = localStorage.getItem('user');

  const user: User | null = storedUser ? JSON.parse(storedUser) : null;


  

  const url = "http://127.0.0.1:4000";
  const addTask = async() => {
    if (newTask.trim() !== "" && taskDescription.trim() !== "") {
      

        try{
            const response = await axios.post(`${url}/api/tasks?userId=${user?._id}`, {
                name: newTask,
                descrption: taskDescription,
                duoTime:dueDate
            })
            if(response.status==201) {
                tasks.push(response.data)
            }
        }catch(e) {
            console.log(e)
        }
      setNewTask("");
      setDueDate("")
      setTaskDescription("")
    }else{
        console.log("do not leave it empty")
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const myTask = () => {
    history.push('/mytasks')
  }

  const gotologin = () => {
    history.push('/login')
  }
  const gotoSignup = () => {
    history.push('/signup')
  }



  const deleteTask = async(id:string) => {
    try{
        const response = await axios.delete(`${url}/api/tasks/${id}`)
        if(response.status==200) {
            console.log("hee")
          setTasks((prevTasks) => prevTasks.filter((task) => task.taskId !==id))
            
        }
    }catch(e) {
        console.log(e)
    }
  }

  const handleToggleCompleted = async (id: string) => {
    try {
      const response = await axios.put(`${url}/api/tasks/${id}`);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskId === id ? { ...task, isCompleted: !task.isCompleted } : task
          )
        );
      }
      
    } catch (e) {
      console.log(e);
    }
  };

 
   useEffect( () => {
  const fetchData = async()=> {
    const response = await axios.get(`${url}/api/tasks?page=${currentPage}&perPage=${itemsPerPage}`)
    if(response.status ==200) {
        console.log(response.data)
      await setTasks(response.data.tasks)
      await setTotalPages(response.data.totalPages)
      
      
        
    }else{
        console.log("something went wrong")
    }
  }
   fetchData()

  }, [currentPage]);



  return (
    <>
    
    <AppBar position="static">
      {user == null ? (
 <Toolbar>
 <Typography onClick={gotologin} variant="h6" sx={{ flexGrow: 1 }}>
  login
 </Typography>
 <Typography onClick={gotoSignup} variant="h6" sx={{ flexGrow: 1 }}>
  Sign up
 </Typography>
</Toolbar>
      ) :
      (
        <Toolbar>
        <Typography onClick={myTask} variant="h6" sx={{ flexGrow: 1 }}>
          My Tasks
        </Typography>
      </Toolbar>
      )
    
    
    } 
       
      </AppBar>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      </Container>
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Task List
      </Typography>
      <div>
        <TextField
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          label="Enter a new task"
          variant="outlined"
          fullWidth
          size="small"
          
          sx={{ m: 2 }}
        />
         <TextField
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        label="Task Description"
        variant="outlined"
        fullWidth
        size="small"
        sx={{ m: 2 }} 
      />

      <TextField
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        type="date"
        
        variant="outlined"
        fullWidth
        sx={{m: 2}}
        size="small"
      />
        <Button variant="contained" onClick={addTask} color="primary">
          Add Task
        </Button>
      </div>
      {tasks.length ==0 ? (<CircularProgress />) :
      
      (
        <List sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {tasks.map((task, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2, width:'850px' ,backgroundColor: "#F5F5F5", borderRadius: "10px" }}>
           <div style={{ flex: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {task.taskName}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {task.description}
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Due: {task.dueDate}
        </Typography>
        is Completed ?  <Checkbox checked={task.isCompleted} onChange={(id) => handleToggleCompleted(task.taskId)} />
      </div>
      <IconButton onClick={(id) => deleteTask(task.taskId)}  color="error">
        <DeleteIcon />
      </IconButton>
          </Paper>
          
        ))}
      </List>
      )
      }
    
      <div>
        <Button disabled={currentPage === 1} onClick={handlePrevPage} variant="contained">
          Prev Page
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage} variant="contained">
          Next Page
        </Button>
        <Typography variant="subtitle1">
          Current Page: {currentPage} / {totalPages}
        </Typography>
      </div>
    </Container>
    </>
  );
};
 
export default HomePage;