import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, List, ListItem, Paper, Checkbox, IconButton, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress } from "@mui/material";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { RouteComponentProps } from 'react-router-dom';

//i should have implemented redux state management but duo to short time i had to make all logic here


interface myTasksProps extends RouteComponentProps {}


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
  

const UserTaskPage: React.FC<myTasksProps> = ({location, history}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [openDialog, setOpenDialog] = useState(false);

    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')


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
  const handleOpenDialog = (title:string, description:string) => {
    setEditTitle(title)
    setEditDescription(description)
    setOpenDialog(true);
  };

  


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

  const handleCloseDialog = () => {
    setOpenDialog(false);

  }

  const editTask = async(id:string) => {
    try{
        const response = await axios.patch(`${url}/api/user/${id}/edit`, {
            taskTitle: editTitle,
            taskDescription: editDescription
        })
        if(response.status==200) {
            history.push('/')
            setOpenDialog(false);


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

  const myTask = () => {
    history.push('/')
  }

 
   useEffect( () => {
  const fetchData = async()=> {
  
    try {
        const response = await axios.get(`${url}/api/user/tasks?userId=${user?._id}`)
        if(response.status ==200) {
            console.log(response.data)
          await setTasks(response.data.tasks)
          
          
            
        }else{
            console.log("something went wrong")
        }
    }catch(e) {
        console.log(e)
    }
    
  }
   fetchData()

  }, [currentPage]);



  return (
    <>
    
    <AppBar position="static">
    {user == null ? (
 <Toolbar>
 <Typography onClick={myTask} variant="h6" sx={{ flexGrow: 1 }}>
  login
 </Typography>
</Toolbar>
      ) :
      (
        <Toolbar>
        <Typography onClick={myTask} variant="h6" sx={{ flexGrow: 1 }}>
          My Tasks
        </Typography>

        <Typography onClick={myTask} variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
      </Toolbar>
      )
    
    
    } 
       
       
      </AppBar>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      </Container>
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Tasks
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

      {tasks.length ==0 ? (<CircularProgress />):
      (
<List sx={{ mt: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {tasks.map((task, index) => (
            <>
             <Dialog open={openDialog} onClose={handleOpenDialog}>
          <DialogTitle>{task.taskName}</DialogTitle>
          <DialogContent>


           <TextField
           value={editTitle}
           onChange={(e) => setEditTitle(e.target.value) }
           variant="outlined"
           fullWidth
           size="medium" />

            <TextField
           value={editDescription}
           onChange={(e) => setEditDescription(e.target.value) }
           variant="outlined"
           fullWidth
           size="medium" />


          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={() => editTask(task.taskId)} color="primary" autoFocus>
              edit
            </Button>
          </DialogActions>
        </Dialog>
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

      <IconButton onClick={() => handleOpenDialog(task.taskName, task.description)}  color="primary">
        <EditIcon />
      </IconButton>


          </Paper>
          </>
        ))}
      </List>
      )
      
      }
      
     
    </Container>
    </>
  );
};
 
export default UserTaskPage;