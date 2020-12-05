import Member from "./member";
import React, { useState } from "react";

const Members = ({ members, onDelete, onJoin, onPick }) => {
  const [state, setState] = useState({
    secretCode: "",
    name: "",
    picked: "",
    isDone: false,
  });

  const handleDone = () => {
    const done = document.getElementById("done");
    const action = document.getElementById("action");
    action.innerHTML = !state.isDone ? "Pick" : "Join";
    done.innerHTML = !state.isDone ? "Add more" : "Done";
    document.getElementById("form").reset();
    setState({ secretCode: "", name: "", picked: "", isDone: !state.isDone });
  };

  const handleAction = () => {
    document.getElementById("form").reset();
    if (state.isDone) {
      const picked = onPick({ name: state.name, secretCode: state.secretCode });
      setState({ ...state, secretCode: "", name: "", picked: picked });
      return null;
    }
    setState({ ...state, secretCode: "", name: "", picked: "" });
    return onJoin({ name: state.name, secretCode: state.secretCode });
  };

  return (
    <div>
      <form id="form" action="#" className="form-inline">
        <div className="form-group m-2">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            onChange={(input) => (state.name = input.target.value)}
          />
        </div>

        <div className="form-group m-2">
          <input
            className="form-control"
            type="text"
            placeholder="Secret Code"
            onChange={(input) => (state.secretCode = input.target.value)}
          />
        </div>

        <button
          id="action"
          className="btn btn-primary m-2"
          onClick={handleAction}
        >
          Join
        </button>

        <button
          type="reset"
          onClick={() => {
            setState({ ...state, picked: "" });
          }}
          className="btn btn-primary m-2"
        >
          Clear
        </button>

        <button id="done" className="btn btn-info m-2" onClick={handleDone}>
          Done
        </button>
      </form>

      <div id="result" className="m-4">
        <h1>{state.picked}</h1>
      </div>
      <div className="container m-2">
        {members.map((member) => (
          <Member key={member.id} onDelete={onDelete} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
