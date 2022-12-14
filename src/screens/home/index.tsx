import { useMemo, useState } from "react";
import { Input } from "../../components/input";
import { Stopwatch } from "../../components/stopwatch";

import { HomeScreenContainer, HomeHeader, HeaderText } from "./styles";

export const HomeScreen = () => {
  const [time, setTime] = useState("");

  const timeInSeconds = useMemo(() => {
    if (!time) return 0;

    const [minutes, seconds] = time.split(":");

    return Number(seconds) + Number(minutes) * 60;
  }, [time]);

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
        mask={"[00]:[00]"}
      />

      <Stopwatch comparationTime={timeInSeconds} />
    </HomeScreenContainer>
  );
};
