import React, { useEffect, useState } from "react";
import Counters from "./components/members";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import database, { join, remove, update } from "./firebase";

function App() {
  const [state, setState] = useState({
    members: [],
    roomId: "",
  });

  useEffect(() => {
    const roomRef = database.ref("room");
    roomRef.on("value", (snapshot) => {
      try {
        const members = snapshot.val()[state.roomId];
        const output = members ? members : [];
        setState({ roomId: state.roomId, members: output });
      } catch (error) {
        console.error(error);
      }
    });
  }, [state.roomId]);

  const handleDelete = (memberId) => {
    remove(state.roomId, memberId);
  };

  const handleJoin = ({ name, secretCode }) => {
    if (!state.members.some((member) => member.name === name))
      if (name && secretCode) {
        join(state.roomId, {
          id: state.members.length,
          name: name,
          secretCode: secretCode,
        });
      }
  };

  const handlePick = ({ name, secretCode }) => {
    const members = state.members;
    const member = members.filter(
      (m) => m.name === name && m.secretCode === secretCode
    )[0];

    if (member) {
      if (!member.hasPicked) {
        const availableMembers = members.filter(
          (m) => !m.isTaken && m !== member
        );

        const notPicked = state.members.filter(
          (m) => !m.hasPicked && !m.isTaken && m !== member
        );

        const randomIndex =
          Math.floor(Math.random() * 100) % availableMembers.length;

        const randomMember = availableMembers[randomIndex];

        const pickedMember =
          notPicked.length === 1 ? notPicked[0] : randomMember;

 /*        console.log("not picked", notPicked);
        console.log("random member", randomMember); */

        member.hasPicked = true;
        pickedMember.isTaken = true;
        member.picked = pickedMember.name;
        update(state.roomId, member, pickedMember);
        return member.picked;
      }
    }
    return "";
  };

  const handleRoomChange = (data) => {
    setState({ ...state, roomId: data });
  };

  return (
    <>
      <NavBar
        onRoomChange={handleRoomChange}
        totalCounters={state.members.length}
      />
      <main role="main" className="flex-shrink-0">
        <div className="container">
          <Counters
            members={state.members}
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
