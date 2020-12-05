const NavBar = ({ totalCounters, onRoomChange }) => {
  return (
    <nav className=" navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Blinded
      </a>

      <div className="input-group mb-3 w-25 ">
        <form action="#">
          <input
            type="text"
            onChange={(data) => onRoomChange(data.target.value)}
            className="form-control bg-warning text-center font-weight-bold"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
          />
        </form>
      </div>

      <h2>
        <span className="badge badge-secondary">{totalCounters}</span>
      </h2>
    </nav>
  );
};

export default NavBar;
