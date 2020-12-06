import Member from "./member";
import React, { useState } from "react";

const Members = ({ members, onDelete, onJoin, onPick }) => {
  const [state, setState] = useState({
    picked: "",
    isDone: false,
  });

  const handleDone = () => {
    const done = document.getElementById("done");
    const action = document.getElementById("action");
    action.innerHTML = !state.isDone ? "Pick" : "Join";
    done.innerHTML = !state.isDone ? "Add more" : "Done";
    document.getElementById("form").reset();
    setState({ picked: "", isDone: !state.isDone });
  };

  const handleAction = () => {
    let picked = "";

    const form = document.forms.form;
    const name = form[0].value;
    const secretCode = form[1].value;

    if (state.isDone) {
      picked = onPick({ name, secretCode });
    } else {
      onJoin({ name, secretCode });
    }
    setState({ ...state, picked: picked });
    document.getElementById("form").reset();
  };

  const handleMembers = () => {
    const output = Array.isArray(members)
      ? members
      : [members[Object.keys(members)]];

    return output.map((member) => (
      <Member key={member.id} onDelete={onDelete} member={member} />
    ));
  };
  return (
    <div>
      <form id="form" action="#" className="form-inline">
        <div className="form-group m-2">
          <input className="form-control" type="text" placeholder="Name" />
        </div>

        <div className="form-group m-2">
          <input
            className="form-control"
            type="password"
            placeholder="Secret Code"
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
      <div className="container m-2">{handleMembers()}</div>
    </div>
  );
};

export default Members;
