import React, { useState } from "react";
import Container from "@/components/Container";
import CreateFile from "@/components/file/CreateFile";
import FilesList from "./FilesList";
import { useAppSelector } from "@/lib/hooks";
import { NavigationName } from "@/features/navigation/navigationSlice";
import Settings from "./Settings";

type State = {
  create: boolean;
};

const initialState = {
  create: false,
};

const Home: React.FC = () => {
  const navigation = useAppSelector((state) => state.navigation);
  const [state, setState] = useState<State>({ create: false });

  return (
    <Container>
      {navigation.name === NavigationName.FILES && (
        <>
          {state.create && (
            <CreateFile onClose={() => setState(() => initialState)} />
          )}
          <FilesList
            create={() => setState(() => ({ ...initialState, create: true }))}
          />
        </>
      )}
      {navigation.name === NavigationName.SETTINGS && <Settings />}
    </Container>
  );
};

export default Home;
