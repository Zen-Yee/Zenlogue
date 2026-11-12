import { LoaderCircle } from "lucide-react";
import "./Spinner.css";

function Spinner({ isLoading, children }) {
  return (
    <div className="spinner-container" >
      {isLoading && (
        <LoaderCircle className="spinner-logo" size={64} color="var(--color-primary)" />
      )}
      {children}
    </div>
  );
}

export default Spinner;
