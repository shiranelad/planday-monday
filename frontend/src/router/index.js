import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import boardDetails from '../views/board-details.vue'
// import boardList from '../components/board/board-list.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // {
    //   path: '/board/:boardId?',
    //   name: 'board-app',
    //   component: boardApp,
    // },
    {
      path: '/board/:boardId?',
      name: 'board-details',
      component: boardDetails,
    },
  ],
})

export default router
