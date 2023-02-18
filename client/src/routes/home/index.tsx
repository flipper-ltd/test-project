import React, { useState } from "react";
import Container from "@/components/Container";
import CreateFile from "@/components/file/CreateFile";
import FilesList from "./FilesList";

type State = {
  create: boolean;
};

const initialState = {
  create: true,
};

const Home: React.FC = () => {
  const [state, setState] = useState<State>({ create: false });
  return (
    <Container>
      {state.create && (
        <CreateFile onClose={() => setState(() => initialState)} />
      )}
      <FilesList create={() => setState((prevState) => initialState)} />
    </Container>
  );
};

export default Home;
