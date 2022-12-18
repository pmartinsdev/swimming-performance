export interface GetAverageFromTimeParams {
  time: number;
  stopWatchTimeInSeconds: number;
}

export function getAverageFromTime({
  time,
  stopWatchTimeInSeconds: stopWatchTime,
}: GetAverageFromTimeParams): number {
  const isStopWatchTimeMoreThanTime = stopWatchTime > time;

  if (isStopWatchTimeMoreThanTime) {
    const percent = (time / stopWatchTime) * 100;

    return Math.trunc(percent);
  } else {
    const percent = (stopWatchTime / time) * 100;

    return 100 - Math.trunc(percent) + 100;
  }
}
