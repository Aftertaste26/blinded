import React, { useState } from "react";
import Counters from "./components/members";
import NavBar from "./components/navbar";
import Footer from "./components/footer";

function App() {
  const [state, setState] = useState({
    members: [],
  });

  const handleDelete = (counterId) => {
    const members = state.members.filter((c) => c.id !== counterId);
    setState({ members });
    console.log("delete");
  };

  const handleReset = () => {
    const members = state.members.map((c) => ({
      ...c,
      value: 0,
    }));
    setState({ members });
  };

  const handleJoin = ({ name, secretCode }) => {
    if (name && secretCode) {
      const members = [
        ...state.members,
        {
          id: state.members.length,
          name: name,
          secretCode: secretCode,
          hasPicked: false,
          isTaken: false,
          picked: "",
        },
      ];
      setState({ members });
    }
  };

  const handlePick = ({ name, secretCode }) => {
    const members = [...state.members];
    const member = members.filter(
      (m) => m.name === name && m.secretCode === secretCode
    )[0];
    console.log("member", member);
    if (member) {
      console.log("im in here");
      if (!member.hasPicked) {
        const index = members.indexOf(member);
        const availableMembers = members.filter(
          (m) => !m.isTaken && m !== member
        );
        const randomIndex =
          Math.floor(Math.random() * 100) % availableMembers.length;
        const pickedMember = availableMembers[randomIndex];

        member.hasPicked = true;
        pickedMember.isTaken = true;
        member.picked = pickedMember.name;

        setState({ members });
        console.log(member, pickedMember);
        console.log("picked");
      }
      return member.picked;
    }
    return "";
  };

  return (
    <>
      <NavBar totalCounters={state.members.length} />
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <Counters
            members={state.members}
            onReset={handleReset}
            onDelete={handleDelete}
            onJoin={handleJoin}
            onPick={handlePick}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
