import { createSlice } from '@reduxjs/toolkit';
 
export const initProjectsList = []

//i'll keep it here for reference
// eslint-disable-next-line
const initProjectObj = {
  "project_id": "",
  "projectId": "",
  "project_name": "",
  "project_description": "",
  "path": "",
  "file_name": "",
  "createtime": ""
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: initProjectsList,
  reducers: {
    restore_projects: (state, action) => {
      return action.payload;
    },
    create_project: (state, action) => {
      return [...state, action.payload]
    },
    update_project_by_id: (state, action) => {
      const updatedList = state.map((project) => {
        if(project.project_id === action.payload.project_id){
          return { ...project, ...action.payload }
        }

        return project
      })

      return updatedList
    },
    delete_project_by_id: (state, action) => {
      const updatedList = state.filter((project) => {
        return project.project_id !== action.payload.project_id
      })

      return updatedList
    },
    
  }
})
 
export const { 
  restore_projects, create_project, update_project_by_id, delete_project_by_id
} = projectsSlice.actions
 
export default projectsSlice.reducer