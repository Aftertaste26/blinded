const Member = ({ member, onDelete }) => {
  const getBgClasses = () => {
    let classes = "p-1 rounded text-white align-middle ";
    classes += member.hasPicked ? "bg-secondary" : "bg-primary";
    return classes;
  };

  return (
    <div>
      <span className={getBgClasses()}>{member.name}</span>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => onDelete(member.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Member;
