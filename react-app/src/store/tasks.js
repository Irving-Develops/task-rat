// actions
const GET_TASKS = 'tasks/GET_TASKS'
const ADD_TASK = 'tasks/ADD_TASK'
const EDIT_TASK = 'tasks/EDIT_TASK'
const DELETE_TASK = 'tasks/DELETED_TASK'

// action creators
const getTasks = (tasks) => ({
  type: GET_TASKS,
  tasks
})

const addTask = (task) => ({
  type: ADD_TASK,
  task
})

const editTask = (task) => ({
  type: EDIT_TASK,
  task
})

const deleteTask = (task) => ({
  type: DELETE_TASK,
  task
})

// thunks
export const getTasksThunk = () => async (dispatch) => {
  const response = await fetch('/api/tasks');
  if (response.ok) {
    const data = await response.json()
    if (data.errors) {
      return data.errors;
    }
    dispatch(getTasks(data.tasks));
  }
}

export const addTaskThunk = (data) => async (dispatch) => {
  const response = await fetch('/api/tasks/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(addTask(data));
  }
}

export const editTaskThunk = (data) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${data.id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(editTask(data));
  }
}

export const deleteTaskThunk = (data) => async (dispatch) => {
  console.log(data.id)
  const response = await fetch(`/api/tasks/${data.id}`, {
    method: 'DELETE'
  })
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(deleteTask(data));
  }
}

// reducer

const initialState = {}

export default function task_reducer(state = initialState, action) {
  let newState = {}
  switch (action.type) {
    case GET_TASKS:
      newState = { ...state }
      action.tasks.forEach((task) => newState[task.id] = task)
      return newState;
    case ADD_TASK:
      newState = { ...state }
      newState[action.task.id] = action.task
      return newState;
    case EDIT_TASK:
      newState = { ...state, [action.task.id]: action.task }
      return newState;
    case DELETE_TASK:
      newState = { ...state }
      delete newState[action.task.id]
      return newState;
    default:
      return state
  }
}