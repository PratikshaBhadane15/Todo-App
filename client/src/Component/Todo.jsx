import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveDoneIcon from "@mui/icons-material/RemoveDone";
import { useEffect, useState } from "react";

function Todo() {
  const [todoTask, setTodotask] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [activeEdit, setActiveEdit] = useState();
  const [editTask, setEditTask] = useState();
  const [dataSubmit, setDataSubmit] = useState(false);

  function toggleEdit(activeId) {
    setActiveEdit(activeId);
  }

  function handleDiscard() {
    setActiveEdit();
  }

  function handleTaskInput(e) {
    const { value } = e.target;
    setTaskInput(value);
  }

  function handleEdit(e) {
    const { value } = e.target;
    setEditTask(value);
  }

  async function handleSubmit() {
    try {
      const newTaskObj = { task: taskInput, isCompleted: false };
      const response = await fetch("http://localhost:3000/newTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTaskObj),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("POST request successful");
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
    } finally {
      setTaskInput("");
      setDataSubmit((state) => !state);
    }
  }

  async function handleDelete(itemId) {
    try {
      // Send the DELETE request
      const response = await fetch(
        `http://localhost:3000/removetask/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", // Specify the content type if needed
          },
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const data = await response.json();
      console.log("Item deleted successfully:", data);
      // Handle success response here
    } catch (error) {
      console.error("There was a problem deleting the item:", error);
    } finally {
      setDataSubmit((state) => !state);
    }
  }

  async function handleUpdate(itemId) {
    try {
      const EditTaskObject = { task: editTask };
      const response = await fetch(
        `http://localhost:3000/updateTask/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(EditTaskObject),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Patch request successful");
    } catch (error) {
      console.error("There was a problem with the Patch request:", error);
    } finally {
      setActiveEdit();
      setDataSubmit((state) => !state);
    }
  }

  async function handleTaskCompletion(itemId, taskState) {
    try {
      const UpdatedTaskObject = { isCompleted: taskState };
      const response = await fetch(
        `http://localhost:3000/updateTask/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UpdatedTaskObject),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Patch request successful");
    } catch (error) {
      console.error("There was a problem with the Patch request:", error);
    } finally {
      setActiveEdit();
      setDataSubmit((state) => !state);
    }
  }

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:3000/task")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((result) => {
          setTodotask(result);
        })
        .catch((error) => {
          console.log("Error in get method", error);
        });
    };

    fetchData();
  }, [dataSubmit]);

  return (
    <Container maxWidth="md" sx={{ border: "1px solid black", minHeight: "98vh" }} >
      <Stack direction="column" alignItems="center" sx={{ my: 1 }} spacing={1}>
        <Typography
          variant="h3"
          sx={{
            border: "1px solid black",
            width: "100%",
            textAlign: "center",
            p: 2,
          }}
        >
          Todo List
        </Typography>

        <Stack
          direction="column"
          width="100%"
          sx={{ border: "1px solid black", p: 2 }}
        >
          {/* Input field */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <TextField
                autoFocus
                fullWidth
                variant="outlined"
                label="Todo Item"
                value={taskInput}
                onChange={(e) => handleTaskInput(e)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                size="large"
                variant="contained"
                color="success"
                startIcon={<DoneRoundedIcon />}
                sx={{ width: "7.3rem", height: "3.0rem" }}
                onClick={() => handleSubmit()}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                size="large"
                variant="outlined"
                color="error"
                startIcon={<CloseRoundedIcon />}
                sx={{ width: "7.2rem", height: "3.0rem" }}
                onClick={() => setTaskInput("")}
              >
                Discard
              </Button>
            </Grid>
          </Grid>

          {/* Task Item */}
          <Box sx={{ mt: 2, minHeight: "75vh" }}>
            <Typography variant="h6"> Task Items</Typography>
            <Divider sx={{ backgroundColor: "black" }}></Divider>
            <Stack direction="column">
              {todoTask.map((item) => {
                return (
                  <Box
                    key={item.id}
                    sx={{
                      border: "1px solid grey",
                      borderRadius: "6px",
                      mt: 1,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth={true}
                      defaultValue={item.task}
                      InputProps={{
                        readOnly: !(activeEdit === item.id),
                      }}
                      value={activeEdit === item.id ? editTask : item.task}
                      onChange={(e) => handleEdit(e)}
                      sx={{
                        textDecoration: item.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    />

                    {/* First button position*/}
                    {activeEdit === item.id ? (
                      <Button
                        size="large"
                        variant="outlined"
                        color="success"
                        onClick={() => handleUpdate(item.id)}
                      >
                        Save
                      </Button>
                    ) : (
                      <IconButton
                        size="large"
                        color="success"
                        onClick={() =>
                          handleTaskCompletion(item.id, !item.isCompleted)
                        }
                      >
                        {item.isCompleted ? <RemoveDoneIcon /> : <CheckIcon />}
                      </IconButton>
                    )}

                    {/* Second button position*/}
                    {activeEdit  === item.id ? (
                      <Button
                        size="medium"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDiscard()}
                      >
                        Discard
                      </Button>
                    ) : (
                      !item.isCompleted ?
                      (
                        <IconButton
                          size="large"
                          color="primary"
                          onClick={() => toggleEdit(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : ""
                    )}

                    {/* Third button position*/}
                    {activeEdit === item.id ? (
                      ""
                    ) : (
                      <IconButton
                        size="large"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Todo;
