import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import boardDetails from '../views/board-details.vue'
// import boardList from '../components/board/board-list.vue'
// import taskDetails from '../views/task-details.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/board/',
    //   name: 'board-list',
    //   component: boardList,
    // },
    {
      path: '/board/:boardId?',
      name: 'board-details',
      component: boardDetails,
    },
    // {
    //   path: '/board/:boardId/task/:taskId?',
    //   // path: '/task/details',
    //   name: 'task-details',
    //   component: taskDetails,
    // },
  ],
})

export default router
