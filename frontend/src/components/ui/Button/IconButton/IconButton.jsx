function IconButton({ className = "", icon: Icon, size = 15, color = "#000000", ...props }) {
  return (
    <button className={`${className} icon-button`} {...props}>
      <Icon size={size} color={color} />
    </button>
  );
}

export default IconButton;
