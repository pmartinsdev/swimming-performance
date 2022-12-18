import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { getAverageFromTime } from "@utils/get-average-from-time";
import { getNumberWithTwoDigits } from "@utils/getNumberWithTwoDigits";

import {
  StopWatch,
  StopWatchText,
  StopWatchButton,
  StopWatchButtonText,
  StopWatchFooter,
  StopWatchSummary,
  StopWatchSummaryHeader,
  StopWatchSummaryText,
  StopWatchInfo,
  Divider,
  StopWatchFlatList,
} from "./styles";

export interface StopWatchProps {
  comparationTime: number;
}

export const Stopwatch: FC<StopWatchProps> = ({ comparationTime }) => {
  const [stopwatchTimeInMiliseconds, setStopWatchTimeinMiliseconds] =
    useState(0);
  const [stopWatchIntervalID, setStopWatchIntervalID] =
    useState<NodeJS.Timer>();
  const [stopWatchSummary, setStopWatchSummary] = useState<string[]>([]);

  const handleStartStopWatch = useCallback(() => {
    if (stopWatchIntervalID != null) clearInterval(stopWatchIntervalID);

    const intervalID = setInterval(() => {
      setStopWatchTimeinMiliseconds((state) => state + 10);
    }, 100);

    setStopWatchIntervalID(intervalID);
  }, [stopWatchIntervalID]);

  const getTimerText = useCallback((timeInMiliseconds: number): string => {
    const seconds = Math.floor(timeInMiliseconds / 100);
    const minutes = Math.floor(seconds / 60);

    return `${getNumberWithTwoDigits(minutes % 60)}:${getNumberWithTwoDigits(
      seconds % 60
    )}:${getNumberWithTwoDigits(timeInMiliseconds % 100)}`;
  }, []);

  const stopWatchTimer = useMemo(() => {
    return getTimerText(stopwatchTimeInMiliseconds);
  }, [stopwatchTimeInMiliseconds]);

  const handleInserPerformanceResume = useCallback(() => {
    const stopwatchSeconds = Math.round(stopwatchTimeInMiliseconds / 100);

    const percent = getAverageFromTime({
      stopWatchTimeInSeconds: stopwatchSeconds,
      time: comparationTime,
    });

    const { seconds, minutes } = {
      minutes: Math.floor(comparationTime / 60),
      seconds: Math.floor(comparationTime % 60),
    };

    setStopWatchSummary((state) => [
      ...state,
      `Você fez ${getNumberWithTwoDigits(percent)}% a ${
        percent > 100 ? "mais" : "menos"
      } no tempo de ${getNumberWithTwoDigits(minutes)}:${getNumberWithTwoDigits(
        seconds
      )}:00 com ${stopWatchTimer}`,
    ]);
  }, [comparationTime, stopwatchTimeInMiliseconds, stopWatchTimer]);

  const handleStopStopWatch = useCallback(() => {
    if (stopWatchIntervalID == null) return;

    clearInterval(stopWatchIntervalID);
    handleInserPerformanceResume();
  }, [
    stopWatchIntervalID,
    stopwatchTimeInMiliseconds,
    handleInserPerformanceResume,
    comparationTime,
  ]);

  const handleResetStopWatch = useCallback(() => {
    setStopWatchTimeinMiliseconds(0);

    if (stopWatchIntervalID) clearInterval(stopWatchIntervalID);
  }, [stopWatchIntervalID]);

  useEffect(() => {
    return () => clearInterval(stopWatchIntervalID);
  }, [stopWatchIntervalID]);

  return (
    <>
      <StopWatch testID="stopwatch">
        <StopWatchText>{stopWatchTimer}</StopWatchText>

        <StopWatchFooter>
          <StopWatchButton
            activeOpacity={0.6}
            noMargin
            onPress={handleResetStopWatch}
            testID="stopwatch-reset"
          >
            <StopWatchButtonText>Zerar</StopWatchButtonText>
          </StopWatchButton>

          <StopWatchButton
            activeOpacity={0.6}
            onPress={handleStopStopWatch}
            testID="stopwatch-stop"
          >
            <StopWatchButtonText>Parar</StopWatchButtonText>
          </StopWatchButton>

          <StopWatchButton
            activeOpacity={0.6}
            onPress={handleStartStopWatch}
            testID="stopwatch-start"
          >
            <StopWatchButtonText>Iniciar</StopWatchButtonText>
          </StopWatchButton>
        </StopWatchFooter>
      </StopWatch>

      <StopWatchSummary>
        <Divider />
        <StopWatchSummaryHeader>
          <StopWatchSummaryText>Histórico de performance</StopWatchSummaryText>
        </StopWatchSummaryHeader>

        <StopWatchFlatList
          data={stopWatchSummary}
          renderItem={({ item }: { item: string }) => (
            <StopWatchInfo testID="stopwatch-summary">{item}</StopWatchInfo>
          )}
          showsVerticalScrollIndicator={true}
        />
      </StopWatchSummary>
    </>
  );
};
