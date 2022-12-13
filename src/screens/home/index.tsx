import { Stopwatch } from "../../components/stopwatch";

import { HomeScreenContainer, HomeHeader, HeaderText } from "./styles";

export const HomeScreen = () => {
  return (
    <HomeScreenContainer>
      <HomeHeader>
        <HeaderText>Avaliação de Performance</HeaderText>
      </HomeHeader>

      <Stopwatch />
    </HomeScreenContainer>
  );
};
