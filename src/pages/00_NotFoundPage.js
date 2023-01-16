import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate()
  const handleBackClick = () => navigate(-1)
  return(
    <div className="columns is-centered is-vcentered">
      <div className="column is-three-quarters has-text-centered">
        <h1 className="title">404 Page Not Found</h1>
        <p className="subtitle">An unexpected error has occurred.</p>
        <button className="button is-primary" onClickCapture={handleBackClick}>Back</button>
      </div>
    </div>
  );
}
 
export default NotFoundPage;