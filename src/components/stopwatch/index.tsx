import { milliseconds } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
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

export const Stopwatch = () => {
  const [stopwatchTime, setStopWatchTime] = useState(0);
  const [isFirstStopWatchTime, setIsFirstStopWatchTime] = useState(true);
  const [firstStopwatchTime, setFirstStopWatchTime] = useState(0);
  const [stopWatchIntervalID, setStopWatchIntervalID] =
    useState<NodeJS.Timer>();
  const [stopWatchSummary, setStopWatchSummary] = useState<string[]>([]);

  const handleStartStopWatch = useCallback(() => {
    if (stopWatchIntervalID) clearInterval(stopWatchIntervalID);

    const intervalID = setInterval(() => {
      setStopWatchTime((state) => state + 10);
    }, 100);

    setStopWatchIntervalID(intervalID);
  }, [stopWatchIntervalID]);

  const handleInserPerformanceResume = useCallback(() => {
    if (!firstStopwatchTime) return;

    const isPerformanceLessThanOriginalTime =
      stopwatchTime < firstStopwatchTime;

    const percent = Math.floor(
      (Math.max(stopwatchTime, firstStopwatchTime) /
        Math.min(firstStopwatchTime, stopwatchTime)) *
        100
    );

    if (isPerformanceLessThanOriginalTime && percent === Infinity) {
      setStopWatchSummary((state) => [
        ...state,
        `Você teve -${100}% de performance.`,
      ]);
    } else {
      setStopWatchSummary((state) => [
        ...state,
        `Você teve ${
          isPerformanceLessThanOriginalTime ? "+" : "-"
        }${getNumberWithTwoDigits(percent)}% de performance.`,
      ]);
    }
  }, [firstStopwatchTime, stopwatchTime]);

  const handleStopStopWatch = useCallback(() => {
    if (!stopWatchIntervalID) return;

    if (isFirstStopWatchTime) {
      setFirstStopWatchTime(stopwatchTime);
    }

    setIsFirstStopWatchTime(false);

    clearInterval(stopWatchIntervalID);
    handleInserPerformanceResume();
  }, [
    stopWatchIntervalID,
    isFirstStopWatchTime,
    stopwatchTime,
    handleInserPerformanceResume,
  ]);

  const handleResetStopWatch = useCallback(() => {
    if (!stopWatchIntervalID) return;

    setStopWatchTime(0);
    clearInterval(stopWatchIntervalID);
  }, [stopWatchIntervalID]);

  const stopWatchTimer = useMemo(() => {
    const miliseconds = Math.floor(stopwatchTime / 1);
    const seconds = Math.round(miliseconds / 100);
    const minutes = Math.floor(seconds / 60);

    return `${getNumberWithTwoDigits(minutes % 60)}:${getNumberWithTwoDigits(
      seconds % 60
    )}:${getNumberWithTwoDigits(miliseconds % 60)}`;
  }, [stopwatchTime]);

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
          // @ts-ignore
          renderItem={({ item }: { item: string }) => (
            <StopWatchInfo>{item}</StopWatchInfo>
          )}
          showsVerticalScrollIndicator={true}
        />
      </StopWatchSummary>
    </>
  );
};
