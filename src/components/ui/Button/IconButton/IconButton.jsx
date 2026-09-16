import "./IconButton.css";

function IconButton({ icon: Icon, size = 15, color = "#000000", ...props }) {
  return (
    <button className="icon-button" {...props}>
      <Icon size={size} color={color} />
    </button>
  );
}

export default IconButton;
