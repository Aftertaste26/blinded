const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Blinded
      </a>
      <h2>
        <span className="badge">{totalCounters}</span>
      </h2>
    </nav>
  );
};

export default NavBar;
