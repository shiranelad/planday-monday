import { httpService } from '../http-service'
import { storageService } from '../async-storage.service'
import { userService } from '../user-service-local'
// import { socketService, SOCKET_EVENT_group_ADDED } from './socket-service'
// console.log('group service')

/////////////////////////////
// !!!! NOT FOR USE !!!!! //
////////////////////////////

const KEY = 'board'
export const groupService = {
  add,
  query,
  remove,
  getById,
  save,
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

function query(filterBy) {
  // console.log('query')
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`group${queryStr}`)
  return storageService.query(KEY)
}

async function getById(groupId) {
  const group = await storageService.get(KEY, groupId)
  // const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return group
}

function remove(groupId) {
  // return httpService.delete(`group/${groupId}`)
  return storageService.delete(KEY, groupId)
}
async function add(group) {
  // const addedgroup = await httpService.post(`group`, group)

  // group.byUser = userService.getLoggedinUser()
  // group.aboutUser = await userService.getById(group.aboutUserId)
  const addedgroup = storageService.post(KEY, group)

  return addedgroup
}

async function save(group) {
  // if (toy._id) return storageService.put(KEY, toy)
  // return storageService.post(KEY, toy)
  try {
      if (group._id) {
          // const res = await axios.put(URL + group._id, group)
          const res = await axios.put(KEY, group)
          return res.data
      }
      else {
          // const res = await axios.post(URL, toy)
          const res = await axios.post(KEY, group)
          return res.data
      }
  }
  catch (err) {
      console.log('err', err);
  }
}


// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var groups = await storageService.query('group')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshgroups = await storageService.query('group')
//     if (freshgroups.length === groups.length + 1 ){
//       console.log('group Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_group_ADDED, freshgroups[freshgroups.length-1])
//     }
//     groups = freshgroups
//   });
// })()
