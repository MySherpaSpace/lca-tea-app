function AuthLoading({ onCancelClick = () => {} }) {
  return(
    <div className="card-content">
      <div className="loading-box">
          <div className="icon has-text-primary">
            <i className="fas fa-2x fa-spinner fa-pulse"/>
          </div>
          <p className="has-text-grey mt-4">Loading...</p>
          <button className="button is-primary mt-4" onClick={onCancelClick}>Cancel</button>          
      </div>
    </div>
  );
}
 
export default AuthLoading;