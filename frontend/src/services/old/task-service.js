import { httpService } from '../http-service'
import { storageService } from '../async-storage.service'
import { userService } from '../user-service-local'
// import { socketService, SOCKET_EVENT_task_ADDED } from './socket-service'
// console.log('task service')

export const taskService = {
  add,
  query,
  remove,
  getById,
}

query()
// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`task${queryStr}`)
  return storageService.query('task')
}

async function getById(taskId) {
  const task = await storageService.get('task', taskId)
  // const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return task
}

function remove(taskId) {
  // return httpService.delete(`task/${taskId}`)
  return storageService.delete('task', taskId)
}
async function add(task) {
  // const addedtask = await httpService.post(`task`, task)

  // task.byUser = userService.getLoggedinUser()
  // task.aboutUser = await userService.getById(task.aboutUserId)
  const addedtask = storageService.post('task', task)

  return addedtask
}

// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var tasks = await storageService.query('task')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshtasks = await storageService.query('task')
//     if (freshtasks.length === tasks.length + 1 ){
//       console.log('task Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_task_ADDED, freshtasks[freshtasks.length-1])
//     }
//     tasks = freshtasks
//   });
// })()
