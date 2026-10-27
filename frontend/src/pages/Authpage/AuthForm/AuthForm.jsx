import "./AuthForm.css";

function AuthForm({ title, children, footer, onSubmit }) {
  return (
    <div className="form">
      <h2>{title}</h2>
      <div className="form-input-container">{children}</div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-button-container">
          <button type="submit">Submit</button>
          {footer}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
