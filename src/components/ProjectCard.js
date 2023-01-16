import { useState } from "react";

function ProjectCard({title, description, created, onDelete, onEdit, onStart, Id, id}) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [newProjectTitle, setNewProjectTitle] = useState(title)
  const [newProjectDesc, setNewProjectDesc] = useState(description)
  const [newprojectId, setNewprojectId] = useState(Id)

  const handleDeleteClick = () => onDelete(id,Id)

  const handleStartClick = () => onStart(id, title)
  
  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleEditCancel = () => {
    setNewProjectTitle(title)
    setNewProjectDesc(description)
    setNewprojectId(Id)
    setIsEditMode(false)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    onEdit({title: newProjectTitle, description: newProjectDesc, Id:newprojectId, id})
  }

  const onNewTitleInput = (e) => setNewProjectTitle(e.target.value)

  const onNewDescInput = (e) => setNewProjectDesc(e.target.value)

  return(
    <div className="list-item box">
      {!isEditMode? (
        <>
          <div className="list-item-content">
            <div className="list-item-title">{title}</div>
            <div className="list-item-description">{description}</div>
            <div className="is-size-7 mt-1"><span className="has-text-weight-bold">Created on:</span> {created}</div>
          </div>
          <div className="list-item-controls">
            <div className="buttons is-right">
              <button className="button is-primary" onClick={handleStartClick}>
                <span className="icon is-small">
                  <i className="fas fa-play"></i>
                </span>
                <span>Start</span>
              </button>
              <div className={`dropdown is-right is-hoverable`}>
                <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span className="icon is-small">
                    <i className="fas fa-ellipsis-h"></i>
                  </span>
                </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div className="dropdown-content">
                    <button className="dropdown-item button is-ghost has-text-black" onClick={handleEditClick}>
                      <span className="icon is-small">
                        <i className="fas fa-edit"></i>
                      </span>
                      <span>Edit</span>
                    </button>
                    <button className="dropdown-item button is-ghost has-text-danger" onClick={handleDeleteClick}>
                      <span className="icon is-small">
                        <i className="fas fa-trash"></i>
                      </span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </>
      ):(
        <>
          <form className="container" onSubmit={handleEditSubmit}>
            <div className="field">
              <label className="label">Title <span className="has-text-danger">*</span></label>
              <div className="control">
                <input className="input" type="text" value={newProjectTitle} onChange={onNewTitleInput} placeholder={title}/>
              </div>
            </div>

            <div className="field">
              <label className="label">Description</label>
              <div className="control">
              <input className="input" type="text" value={newProjectDesc} onChange={onNewDescInput} placeholder={description}/>
              </div>
            </div>
            <div className="control is-flex is-justify-content-space-between">
              <button className="button is-primary is-light" onClick={handleEditCancel}>Cancel</button>
              <button className="button is-primary">Submit</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

ProjectCard.defaultProps = {
  title: "", 
  description: "", 
  Id: "",
  onDelete: () => {}, 
  onEdit: () => {}, 
  onStart: () => {},
  created: Date.now(),
  id:0
}
 
export default ProjectCard;