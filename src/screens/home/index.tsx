import { useState } from "react";
import { Input } from "../../components/input";
import { Stopwatch } from "../../components/stopwatch";

import { HomeScreenContainer, HomeHeader, HeaderText } from "./styles";

export const HomeScreen = () => {
  const [time, setTime] = useState("");

  return (
    <HomeScreenContainer>
      <HomeHeader>
        <HeaderText>Avaliação de Performance</HeaderText>
      </HomeHeader>

      <Input
        name="time"
        keyboardType="numeric"
        placeholderTextColor="#a8a8a8"
        placeholder="Coloque aqui o tempo de comparaçao"
        value={time}
        onChangeText={(value) => {
          setTime(value);
        }}
        mask={"[00]:[00]:[00]"}
      />

      <Stopwatch />
    </HomeScreenContainer>
  );
};
