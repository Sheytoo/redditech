import MainNavigator from "./navigation/MainNavigator";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <>
      {isLogged ? <MainNavigator/> : <LoginScreen onLogin={() => setIsLogged(true)}/>}
      <StatusBar style="auto"/>
    </>
  );
};

export default App;
