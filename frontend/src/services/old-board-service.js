// import { httpService } from './http.service'
import { utilService } from './util-service'
import { storageService } from './async-storage.service'
// import { userService } from './user-service-local'
// import { socketService, SOCKET_EVENT_board_ADDED } from './socket-service'

// !load from storage
// _loadItemsToStorage()
// console.log('board service')
const KEY = 'board'

export const boardService = {
  query,
  remove,
  getById,
  save,
  getEmptyBoard,
  getEmptyGroup,
  getEmptyTask,
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy) {
  const board = _getBoardStorage()
  if (board) return board

  // console.log('query board')
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`board${queryStr}`)
  return await storageService.query(KEY)
}

async function getById(boardId) {
  const group = await storageService.get(KEY, boardId)
  // const user = await httpService.get(`user/${userId}`)
  // gWatchedUser = user;
  return group
}

async function save(board) {
  if (board._id) return storageService.put(KEY, board)
  return await storageService.post(KEY, board)
}

async function remove(boardId) {
  // return httpService.delete(`board/${boardId}`)
  return await storageService.remove(KEY, boardId)
}


function getEmptyBoard() {
  const loggedUser = {
    _id: 'u105',

    fullname: 'Guest User',
    imgUrl: 'http://some-img',
  } // getLoggedInUser()
  const newBoard = {
    // _id: 'b' + utilService.makeId(),
    _id: '',
    title: 'New Board',
    description: '',
    createdAt: Date.now(),
    createdBy: {
      _id: loggedUser._id,

      fullname: loggedUser.fullname,
      imgUrl: loggedUser.imgUrl,
    },
    members: [
      {
        _id: loggedUser._id,
        fullname: loggedUser.fullname,
        imgUrl: loggedUser.imgUrl,
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Group Title created',
        createdAt: Date.now(),
        byMember: {
          _id: loggedUser._id,
          fullname: loggedUser.fullname,
          imgUrl: loggedUser.imgUrl,
        },
      },
      {
        id: 'a102',
        txt: 'Group Title created',
        createdAt: Date.now(),
        byMember: {
          _id: loggedUser._id,
          fullname: loggedUser.fullname,
          imgUrl: loggedUser.imgUrl,
        },
      },
      {
        task: {
          id: 't101',
          title: 'Task 1 assigned to ' + loggedUser.fullname,
        },
      },
    ],
    groups: [getEmptyGroup(), getEmptyGroup()],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  }

  // console.log(newBoard)

  newBoard.groups[0].title = 'Group Title'
  newBoard.groups[0].groupColor = '#579bfc'
  newBoard.groups[1].title = 'Group Title'
  newBoard.groups[1].groupColor = '#a25ddc'

  for (var i = 0; i < 5; i++) {
    const newTask = getEmptyTask(`Item ${i + 1}`)
    if (i < 3) newBoard.groups[0].tasks.push(newTask)
    else {
      newBoard.groups[1].tasks.push(newTask)
    }
  }
  return newBoard
}

function getEmptyGroup() {
  return {
    id: 'g' + utilService.makeId(),
    title: 'New Group',
    tasks: [
      // {
      //   id: 't' + utilService.makeId(),
      //   title: 'New Task',
      //   cols: [
      //     {
      //       type: 'status-picker',
      //       value: null,
      //     },
      //     {
      //       type: 'member-picker',
      //       value: [],
      //     },
      //     {
      //       type: 'date-picker',
      //       value: null,
      //     },
      //   ],
      // },
    ],
    groupColor: utilService.getRandomColor(),
  }
}

function getEmptyTask(title = 'New Task') {
  return {
    id: 't' + utilService.makeId(),
    title,
    cols: [
      {
        type: 'status-picker',
        value: null,
      },
      {
        type: 'member-picker',
        value: [],
      },
      {
        type: 'date-picker',
        value: null,
      },
      {
        type: 'test-status',
        value: null,
      },
    ],
  }
}

const board = [
  {
    _id: 'b101',
    title: 'Robot dev proj',
    description: ' this board....',
    createdAt: 1589983468418,
    createdBy: {
      _id: 'u101',
      fullname: 'Abi Abambi',
      imgUrl: 'http://some-img',
    },
    members: [
      {
        id: 'u101',
        fullname: 'Tal amit',
        imgUrl: 'https://www.google.com',
      },
      {
        id: 'u102',
        fullname: 'guy shimon',
        imgUrl: 'https://www.google.com',
      },
      {
        id: 'u103',
        fullname: 'shiran elad',
        imgUrl: 'https://www.google.com',
      },
    ],
    activities: [
      {
        id: 'a101',
        txt: 'Changed Color',
        createdAt: 154514,
        byMember: {
          _id: 'u101',
          fullname: 'Abi Abambi',
          imgUrl: 'http://some-img',
        },
        task: {
          id: 'c101',
          title: 'Replace Logo',
        },
      },
    ],
    groups: [
      {
        id: 'dfg56',
        title: 'Group 1',
        tasks: [
          {
            id: 't101',
            title: 'replace items',
            cols: [
              {
                type: 'status-picker',
                value: 'Status',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'fhrf*^%hfdg',
                    username: 'Lili',
                    fullname: 'Lili Abambi',
                    imgUrl: 'http://some-img.jpg',
                    color: 'FFF833',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
            comments: [
              { creator: 'Lili Abambi', content: 'can some one help me' },
              { creator: 'tal amit', content: 'fix problem with bug' },
              { creator: 'shiarn elad', content: 'i can help' },
              { creator: 'Guy shimon ', content: 'made that dnd work' },
            ],
          },
          {
            id: 't102',
            title: 'implement D&D',
            cols: [
              {
                type: 'status-picker',
                value: 'working on it',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'm303',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/27.jpg',
                  },
                  {
                    id: 'mfdg',
                    username: 'Momi',
                    fullname: 'Momi Alfasi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
                  },
                  {
                    id: 'm404g',
                    username: 'Meni',
                    fullname: 'some men',
                    imgUrl: 'https://randomuser.me/api/portraits/men/24.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '#579bfc',
      },
      {
        id: 'g093',
        title: 'Group 2',
        tasks: [
          {
            id: 't101',
            title: 'learn scss',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'm3748',
                    username: 'meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
                  },
                  {
                    id: 'm1hfdg',
                    username: 'meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
                  },
                  {
                    id: 'm304^%hfdg',
                    username: 'meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'replace logo',
            cols: [
              {
                type: 'status-picker',
                value: 'Status',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'fhrhfdg',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'learn js logo',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'f^%hfdg',
                    username: 'meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/38.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '#a25ddc',
      },
      {
        id: 'jkjsdf78',
        title: 'Group 3',
        tasks: [
          {
            id: 't101',
            title: 'make it happen',
            cols: [
              {
                type: 'status-picker',
                value: 'done',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'fhrf5093g',
                    username: 'Meir',
                    fullname: 'Meir Abambi',
                    imgUrl: 'https://randomuser.me/api/portraits/men/28.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't101',
            title: 'Make it happen',
            cols: [
              {
                type: 'status-picker',
                value: 'working on it',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: 'hfdg',
                    username: 'shiran',
                    fullname: 'shiran elad',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
          {
            id: 't103',
            title: 'make it happen again',
            cols: [
              {
                type: 'status-picker',
                value: 'stuck',
              },
              {
                type: 'member-picker',
                value: [
                  {
                    id: '708fdg',
                    username: 'guy',
                    fullname: 'guy shimon',
                    imgUrl: 'http://some-img.jpg',
                  },
                ],
              },
              {
                type: 'date-picker',
                value: null,
              },
            ],
          },
        ],
        groupColor: '##9cd326',
      },
    ],
    cmpsOrder: ['status-picker', 'member-picker', 'date-picker'],
  },
]

function _getBoardStorage() {
  const board = localStorage.getItem(KEY)
}
// _loadItemsToStorage()
function _loadItemsToStorage() {
  // console.log('loading')
  localStorage.setItem('board', JSON.stringify(board))
}
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//   var boards = await storageService.query('board')

//   // Dev Helper: Listens to when localStorage changes in OTHER browser
//   window.addEventListener('storage', async () => {
//     console.log('Storage updated');
//     const freshboards = await storageService.query('board')
//     if (freshboards.length === boards.length + 1 ){
//       console.log('board Added - localStorage updated from another browser')
//       socketService.emit(SOCKET_EVENT_board_ADDED, freshboards[freshboards.length-1])
//     }
//     boards = freshboards
//   });
// })()
