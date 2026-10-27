import { LoaderCircle } from "lucide-react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <LoaderCircle className="spinner-logo" size={64} color="var(--color-primary)" />
    </div>
  );
}

export default Spinner;
