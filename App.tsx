import React from "react";
import { Text } from "react-native";
import PageContainer from "./Components/PageContainer/PageContainer";
import TransitionView from "./Components/TransitionView/TransitionView";

export default function App() {
  return (
    <PageContainer centerContentVertically={true}>
      <TransitionView transitionIn="fadeInDown" transitionInDelay={1000}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </TransitionView>
    </PageContainer>
  );
}
