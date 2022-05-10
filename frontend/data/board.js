// Guidelines
// boardStore (no need for groupStore, taskStore), boardService
// *. Support saving the entire board and also on the task level, 
// PUT /api/board/b123/task/t678

//    (no need for seperate APIs for mini-updates of task parts like members or status)
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board 
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vue-smooth-dnd / vuedraggable / react-beutiful-dnd
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. We do not handle concurrent editing - needs versioning

// Rendering performance:
// Store Mutation - saveBoard
// state.board = board
// Later, support switching a specific task


// <BoardDetails> => <BoardGroup v-for>
// <BoardGroup> => <TaskPreview v-for>
// <TaskDetails> (+edit) - initially can be loaded in seperate route (later on we can place it in a modal and nested route)


const board = {
    "_id": "b101",
    "title": "Robot dev proj",
    "description": " this board....",
    "createdAt": 1589983468418,
    "createdBy": {
        "_id": "b101",
        "fullname": "Abi Abambi",
        "imgUrl": "http://some-img"
    },
    "members": [
        {
            "_id": "m101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://www.google.com",
        }
    ],
    "activities": [
        {
            "id": "a101",
            "txt": "Changed Color",
            "createdAt": 154514,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "http://some-img"
            },
            "task": {
                "id": "t101",
                "title": "Replace Logo"
            }
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Group 1",
            "tasks": [
                {
                    "id": "t101",
                    "title": "Replace logo",
                    "status": null,
                    "person": [
                        {
                            "_id": "m102",
                            "username": "Abi",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img.jpg",
                        },
                        {
                            "_id": "m103",
                            "username": "Meir",
                            "fullname": "Meir Abambi",
                            "imgUrl": "http://some-img.jpg",
                        }
                    ],
                    "Due Date": 132134654321,
                },
                {
                    "id": "t102",
                    "title": "Add Samples"
                }
            ],
            "groupColor": "blue",
        },
        {
            "id": "g102",
            "title": "Group 2",
            "tasks": [
                {
                    "id": "t103",
                    "title": "Replace logo",
                    "status": null,
                    "person": [
                        {
                            "_id": "m102",
                            "username": "Abi",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img.jpg",
                        },
                        {
                            "_id": "m103",
                            "username": "Meir",
                            "fullname": "Meir Abambi",
                            "imgUrl": "http://some-img.jpg",
                        }
                    ],
                    "Due Date": 132134654321,
                },
                {
                    "id": "t104",
                    "title": "Add Samples"
                }
            ],
            "groupColor": "blue",
        },
    ],
    // for monday
    "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
}
const user = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "boardId": "b101",
        "taskId": "t101"
    }]
}


// Store - saveTask
function storeSaveTask(task, activity) {
    const activity = {
        "id": makeId(),
        "txt": "Changed Color",
        "createdAt": Date.now(),
        "byMember": userService.getLoggedinUser(),
        "task": task
    }
    board = boardService.saveTask(boardId, groupId, task, activity)
    commit(board)
}

// boardService
function saveTask(boardId, groupId, task, activity) {
    const board = getById(boardId)
    // TODO: find the task, and update
    board.activities.unshift(activity)
    saveBoard(board)
    return board
}

// boardStore-action
async function loadAndWatchBoard(boardId) {
    // load from service and commit to store
    // subscribe to socket and commit to store
}

// For Monday Mostly:
// Dynamic Components: 
// <TaskPreview> => <tr> 
//    <td v-for="(cmpType) in cmpsOrder">
//         <component :is="cmpType" :info="getCmpInfo(cmpType)" @updated="updateTask(cmpType, $event)">
//    </td>

function updateTask(cmpType, data) {
    // Switch
    // task.members = data;
    // task.status = data;
}


const cmp1 = {
    type: 'status-picker',
    info: {
        selectedStatus: 'pending',
        statuses: [{}, {}]
    }
}

const cmp2 = {
    type: 'member-picker',
    info: {
        selectedMembers: ['m1', 'm2'],
        members: ['m1', 'm2', 'm3']
    }
}

const cmp3 = {
    type: 'date-picker',
    info: {
        selectedDate: '2022-09-07',
    }
}


// export function TaskPreview({ task }) {
//     //GET FROM STORE
//     const cmpsOrder = [
//       "status-picker",
//       "member-picker",
//       "date-picker",
//       "priority-picker",
//     ];
//     return (
//       <section>
//         <h5>{task.txt}</h5>
//         {cmpsOrder.map((cmp, idx) => {
//           return (
//             <DynamicCmp
//               cmp={cmp}
//               key={idx}
//               onUpdate={(data) => {
//                 console.log("Updating: ", cmp, "with data:", data);
//                 // make a copy, update the task
//                 // Call action: updateTask(task)
//               }}
//             />
//           );
//         })}
//       </section>
//     );
//   }

// export function DynamicCmp({ cmp, info, onUpdate }) {
//     switch (cmp) {
//         case "status-picker":
//             return <StatusCmp info={info} onUpdate={onUpdate} />;
//         case "member-picker":
//             return <MemberPicker info={info} onUpdate={onUpdate} />;
//         default:
//             return <p>UNKNOWN {cmp}</p>;
//     }
// }
