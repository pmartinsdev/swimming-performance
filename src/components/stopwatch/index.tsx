import { FC, useCallback, useMemo, useState } from "react";

import { getAverageFromTime } from "../../utils/get-average-from-time";
import { getNumberWithTwoDigits } from "../../utils/getNumberWithTwoDigits";

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
  const [stopwatchTime, setStopWatchTime] = useState(0);
  const [stopWatchIntervalID, setStopWatchIntervalID] =
    useState<NodeJS.Timer>();
  const [stopWatchSummary, setStopWatchSummary] = useState<string[]>([]);

  const handleStartStopWatch = useCallback(() => {
    if (stopWatchIntervalID != null) clearInterval(stopWatchIntervalID);

    const intervalID = setInterval(() => {
      setStopWatchTime((state) => state + 10);
    }, 100);

    setStopWatchIntervalID(intervalID);
  }, [stopWatchIntervalID]);

  const getTimerText = useCallback((timeInSeconds: number) => {
    const miliseconds = Math.floor(timeInSeconds / 1);
    const seconds = Math.round(miliseconds / 100);
    const minutes = Math.floor(seconds / 60);

    return `${getNumberWithTwoDigits(minutes % 60)}:${getNumberWithTwoDigits(
      seconds % 60
    )}:${getNumberWithTwoDigits(miliseconds % 60)}`;
  }, []);

  const stopWatchTimer = useMemo(() => {
    return getTimerText(stopwatchTime);
  }, [stopwatchTime]);

  const handleInserPerformanceResume = useCallback(() => {
    const percent = getAverageFromTime({
      stopWatchTime: stopwatchTime,
      time: comparationTime,
    });

    const { seconds, minutes } = {
      minutes: Math.floor(comparationTime % 60),
      seconds: Math.floor(comparationTime / 60),
    };

    setStopWatchSummary((state) => [
      ...state,
      `Você fez ${getNumberWithTwoDigits(percent)}% a ${
        percent > 100 ? "mais" : "menos"
      } no tempo de ${getNumberWithTwoDigits(minutes)}:${getNumberWithTwoDigits(
        seconds
      )}:00 com ${stopWatchTimer}`,
    ]);
  }, [comparationTime, stopwatchTime, stopWatchTimer]);

  const handleStopStopWatch = useCallback(() => {
    if (stopWatchIntervalID == null) return;

    clearInterval(stopWatchIntervalID);
    handleInserPerformanceResume();
  }, [
    stopWatchIntervalID,
    stopwatchTime,
    handleInserPerformanceResume,
    comparationTime,
  ]);

  const handleResetStopWatch = useCallback(() => {
    if (stopWatchIntervalID == null) return;

    setStopWatchTime(0);
    clearInterval(stopWatchIntervalID);
  }, [stopWatchIntervalID]);

  return (
    <>
      <StopWatch>
        <StopWatchText>{stopWatchTimer}</StopWatchText>

        <StopWatchFooter>
          <StopWatchButton
            activeOpacity={0.6}
            noMargin
            onPress={handleResetStopWatch}
          >
            <StopWatchButtonText>Zerar</StopWatchButtonText>
          </StopWatchButton>

          <StopWatchButton activeOpacity={0.6} onPress={handleStopStopWatch}>
            <StopWatchButtonText>Parar</StopWatchButtonText>
          </StopWatchButton>

          <StopWatchButton activeOpacity={0.6} onPress={handleStartStopWatch}>
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
          // @ts-expect-error
          renderItem={({ item }: { item: string }) => (
            <StopWatchInfo>{item}</StopWatchInfo>
          )}
          showsVerticalScrollIndicator={true}
        />
      </StopWatchSummary>
    </>
  );
};
