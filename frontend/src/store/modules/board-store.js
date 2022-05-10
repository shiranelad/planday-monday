import { boardService } from '../../services/board-service.js';
import { utilService } from '../../services/util-service.js';
export const boardStore = {
  strict: true,

  state: {
    boards: [],
    currBoard: {},
    currGroup: {},
    currTask: {},
    taskToShow: null,
    filterBy: null,
    filteredBoard: null,
  },

  getters: {
    boards(state) {
      return JSON.parse(JSON.stringify(state.boards));
    },
    currBoard(state) {
      return JSON.parse(JSON.stringify(state.currBoard));
    },
    boardToDisplay(state) {
      return JSON.parse(JSON.stringify(state.filteredBoard));
    },
    currTask(state) {
      return JSON.parse(JSON.stringify(state.currTask));
    },
    taskToShow(state) {
      return JSON.parse(JSON.stringify(state.taskToShow));
    },
  },
  mutations: {
    // GROUP
    updateBoard({ currBoard }, { group, task }) {
      // console.log('update Board:', task);
      var newGroup = JSON.parse(JSON.stringify(group));
      const groupIdx = currBoard.groups.findIndex((g) => g.id === group.id);

      if (group && !task) {
        // console.log('updating group');

        currBoard.groups.splice(groupIdx, 1, newGroup);
        //  setCurrBoardboard
      }
      if (task) {
        // console.log('updating task');
        const taskIdx = newGroup.tasks.findIndex((t) => t.id == task.id);
        newGroup.tasks.splice(taskIdx, 1, task);
        console.log(group.tasks);

        // setCurrBoard
      }

      currBoard.groups.splice(groupIdx, 1, newGroup);

      console.log(currBoard);
    },
    updateGroupAfterDnd(state, { updatedGroup }) {
      const idx = state.currBoard.groups.findIndex(
        (grp) => grp.id === updatedGroup.id
      );
      state.currBoard.groups.splice(idx, 1, updatedGroup);
    },
    // TASK
    taskFromBoard(state, { taskId }) {
      return state.currBoard.groups.tasks.filter((task) => task.id === taskId);
    },
    updateTaskAfterComment(state, { groupId, task }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId);
      const tIdx = board.groups[gIdx].tasks.findIndex(
        (dbTask) => dbTask.id === task.id
      );
      board.groups[gIdx].tasks.splice(tIdx, 1, task);
    },
    // BOARD
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
      console.log(state.filterBy);
      if (!filterBy) {
        state.filteredBoard = JSON.parse(JSON.stringify(state.currBoard));
      } else {
        state.filteredBoard = JSON.parse(JSON.stringify(state.currBoard));
        const regex = new RegExp(filterBy, 'i');
        state.filteredBoard.groups.map((group) => {
          group.tasks = group.tasks.filter((task) => regex.test(task.title));
        });
      }
      console.log('state.filteredBoard:', state.filteredBoard);
      console.log(state.filteredBoard.groups);
    },
    addBoard(state, { board }) {
      state.boards.push(board);
    },
    setBoards(state, { boards }) {
      state.boards = boards;
      // console.log('setboard:', state.boards)
    },
    removeBoard(state, { boardId }) {
      const idx = state.boards.findIndex((board) => board._id === boardId);
      state.boards.splice(idx, 1);
    },
    saveBoard(state, { savedBoard }) {
      const idx = state.boards.findIndex(
        (board) => board._id === savedBoard._id
      );
      if (idx !== -1) state.boards.splice(idx, 1, savedBoard);
      else state.boards.unshift(savedBoard);
    },
    setCurrBoard(state, { board }) {
      state.currBoard = board;
      // console.log('yay')
    },
    setCurrTask(state, { task }) {
      state.currTask = task;
      // console.log(state.currTask)
    },
    setTaskToShow(state, { task }) {
      state.taskToShow = task;
    },
  },
  actions: {
    // BOARDS
    async loadBoards({ commit, state }) {
      try {
        commit({
          type: 'setIsLoading',
          isLoading: true,
        });
        const boards = await boardService.query();
        commit({
          type: 'setBoards',
          boards,
        });
        commit({
          type: 'setIsLoading',
          isLoading: false,
        });
      } catch {
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    async addBoard({ commit }, { value }) {
      console.log(value);
      let boardToAdd = boardService.getEmptyBoard();
      console.log(boardToAdd);
      boardToAdd.title = value;
      console.log('boardToAdd', boardToAdd);
      try {
        const addedBoard = await boardService.save(boardToAdd);
        console.log(addedBoard);
        commit({ type: 'addBoard', board: addedBoard });
        commit({ type: 'setCurrBoard', board: addedBoard });
      } catch (err) {
        console.log('error during adding board', err);
      }
    },
    async removeBoard({ dispatch, commit, state }, { boardId }) {
      try {
        await boardService.remove(boardId);
        // console.log('first board' , state.boards[0])
        commit({ type: 'removeBoard', boardId });
        if (boardId === state.currBoard._id)
          commit({ type: 'setCurrBoard', board: state.boards[0] });
        // console.log(state.currBoard)
        // dispatch({ type: 'loadBoards' })
      } catch (err) {
        console.log('error during removing board', err);
      }
    },
    async saveBoard({ commit, state }, { title, description, boardId }) {
      // console.log('title, description from store', title, description);
      const boardFound = state.boards.find((board) => board._id === boardId);
      const board = JSON.parse(JSON.stringify(boardFound));
      board.title = !title ? board.title : title;
      board.description = !description ? board.description : description;
      try {
        const savedBoard = await boardService.save(board);
        console.log(savedBoard);
        socketService.emit('board saved', board._id);

        commit({ type: 'saveBoard', savedBoard });
        // dispatch({ type: 'loadBoards' });
        // commit({ type: 'setCurrBoard', board: boardToUpdate });
      } catch (err) {
        console.log("Couldn't save board", err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    async duplicateBoard({ dispatch, state, commit }, { boardId }) {
      try {
        const boarsToDup = await boardService.getById(boardId);
        let newBoard = boardService.getEmptyBoard();
        delete boarsToDup._id;
        newBoard = boarsToDup;
        newBoard.title = 'Duplicate of ' + boarsToDup.title;
        const duplicatedBoard = await boardService.save(newBoard);
        commit({ type: 'addBoard', board: duplicatedBoard });
        console.log(state.boards);
        commit({ type: 'setCurrBoard', board: duplicatedBoard });
      } catch (err) {
        console.log('error during duplicating board', err);
      }
    },
    async getBoardById({ commit }, { boardId }) {
      try {
        let dbBoard = await boardService.getById(boardId);
        var board = JSON.parse(JSON.stringify(dbBoard));
        commit({ type: 'setCurrBoard', board });
        return board;
      } catch (err) {
        console.log('', err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    // GROUP
    async addGroup({ commit, state }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      const newGroup = boardService.getEmptyGroup();
      board.groups.unshift(newGroup);
      try {
        const updatedBoard = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: updatedBoard });
      } catch (error) {
        console.log('error during adding group to board', error);
      }
    },
    async duplicateGroup({ dispatch, state, commit }, { groupId }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      var toDuplicate = board.groups.find((group) => group.id === groupId);
      const idx = board.groups.findIndex((group) => group.id === groupId);
      var emptyGroup = boardService.getEmptyGroup();
      emptyGroup = JSON.parse(JSON.stringify(toDuplicate));
      emptyGroup.id = utilService.makeId();
      emptyGroup.title = 'Duplicate of ' + emptyGroup.title;
      board.groups.splice(idx, 0, emptyGroup);
      try {
        const updatedBoard = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: updatedBoard });
      } catch (error) {
        console.log('problem with duplicating group', error);
      }
    },

    async removeGroup({ dispatch, state, commit }, { groupId }) {
      // console.log('group id :', groupId, 'currBoard:', state.currBoard)
      const board = JSON.parse(JSON.stringify(state.currBoard));
      const idx = board.groups.findIndex((group) => group.id === groupId);
      board.groups.splice(idx, 1);
      try {
        const updatedBoard = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: updatedBoard });
      } catch (error) {
        console.log('problem removing board', error);
      }
    },
    async updateGroup({ commit, state }, { groupToUpdate }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      const idx = board.groups.findIndex(
        (boardGroup) => boardGroup.id === groupToUpdate.id
      );
      if (idx === -1) {
        board.groups.push(groupToUpdate);
      } else {
        board.groups.splice(idx, 1, groupToUpdate);
      }
      // rotem's solution to sync problem:
      commit({ type: 'updateGroupAfterDnd', updatedGroup: groupToUpdate });
      try {
        const updatedBoard = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: updatedBoard });
      } catch (err) {
        console.log('Problem with saving group', err);
      }
    },
    async updateGroupsOrder({ dispatch, commit, state }, { newGroups }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      board.groups = newGroups;
      try {
        const boardToUpdate = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: boardToUpdate });
      } catch (err) {
        console.log("Couldn't save board", err);
        commit({
          type: 'setIsError',
          isError: true,
        });
      }
    },
    //TASK
    async addTask({ commit, state }, { groupIdx, value }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      board.groups[groupIdx].tasks.push(boardService.getEmptyTask(value));
      try {
        // update model
        const boardToUpdate = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: boardToUpdate });
      } catch (error) {
        console.log('error during adding task to board', error);
      }
    },
    async addTaskInline({ commit }, { value, group }) {
      console.log('addinlinestore:', value, group);
    },
    async findTask({ commit }, { boardId, taskId }) {
      try {
        let board = await boardService.getById(boardId);
        board = JSON.parse(JSON.stringify(board));
        const group = board.groups.find((group) =>
          group.tasks.find((task) => task.id === taskId)
        );
        const task = group.tasks.find((task) => task.id === taskId);
        commit({ type: 'setCurrTask', task });
        // console.log('{ boardId: board._id, groupId: group.id, taskId: task.id }',board._id, group.id, task.id);
        return { boardId: board._id, groupId: group.id, task };
      } catch (err) {
        console.log('error finding task', err);
      }
    },
    async updateTask({ commit, state }, { groupId, task }) {
      const board = JSON.parse(JSON.stringify(state.currBoard));
      let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId);

      // console.log(gIdx)
      const tIdx = board.groups[gIdx].tasks.findIndex(
        (dbTask) => dbTask.id === task.id
      );
      board.groups[gIdx].tasks.splice(tIdx, 1, task);
      try {
        const boardToUpdate = await boardService.save(board);
        commit({ type: 'setCurrBoard', board: boardToUpdate });
        // commit({ type: 'updateTask', task });
      } catch (err) {
        console.log('Problem with updating task', err);
      }
    },
    // async updateTaskAfterComment({ commit, state }, { groupId, task }) {
    //   const board = JSON.parse(JSON.stringify(state.currBoard))
    //   let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId)

    //   // console.log(gIdx)
    //   const tIdx = board.groups[gIdx].tasks.findIndex(
    //     (dbTask) => dbTask.id === task.id
    //   )
    //   board.groups[gIdx].tasks.splice(tIdx, 1, task)
    //   try {
    //     // const boardToUpdate = await boardService.save(board)
    //     // commit({ type: 'setCurrBoard', board: boardToUpdate })
    //     commit({ type: 'updateTask', task });
    //   } catch (err) {
    //     console.log('Problem with updating task', err)
    //   }
    // },
    async removeTask({ commit }, { boardId, groupId, task }) {
      try {
        let board = await boardService.getById(boardId);
        board = JSON.parse(JSON.stringify(board));
        let gIdx = board.groups.findIndex((dbGroup) => dbGroup.id === groupId);
        const tIdx = board.groups[gIdx].tasks.findIndex(
          (dbTask) => dbTask.id === task.id
        );
        board.groups[gIdx].tasks.splice(tIdx, 1);
        // console.log('gIdx, tIdx', gIdx, tIdx);
        await boardService.save(board);
        commit({ type: 'setCurrBoard', board });
      } catch (err) {
        console.log('Problem with removing task', err);
      }
    },
    async setStatus({ commit }, { status, task }) {
      task;
      // task.cols.map(col => )
      try {
        const newStatus = await boardService.save();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
