const uuid = require("uuid");

const TodoListTasks = [];

const getTasks = (req, res, next) => {
  res.json(TodoListTasks);
};

const postTask = (req, res, next) => {
  const reqBody = req.body;
  const newtaskObject = { ...reqBody, id: uuid.v4() };
  TodoListTasks.push(newtaskObject);
  console.log("New-", newtaskObject);
  res.json(newtaskObject);
};

const updateTask = (req, res, next) => {
  const objectId = req.params.id;
  const updatedTask = req.body;

  const objectIndex = TodoListTasks.findIndex((obj) => obj.id === objectId);

  if (objectIndex === -1) {
    return res.status(404).json({ error: "Object not found" });
  }

  TodoListTasks[objectIndex] = {
    ...TodoListTasks[objectIndex],
    ...updatedTask,
  };

  res.json(TodoListTasks[objectIndex]);
};

const DeleteTask = (req, res, next) => {
  const objectId = req.params.id;

  const objectIndex = TodoListTasks.findIndex((obj) => obj.id === objectId);
  if (objectIndex === -1) {
    return res.status(404).json({ error: "Object not found" });
  }

  TodoListTasks.splice(objectIndex, 1);

  res.json({ message: "Object deleted successfully" });
};



module.exports = { getTasks, updateTask, postTask, DeleteTask };
