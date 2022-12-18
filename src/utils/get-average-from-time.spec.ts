import { getAverageFromTime as sut } from "./get-average-from-time";

describe("@Util - getAverageFromTime", () => {
  it("should return less than 100% of average", () => {
    const result = sut({ stopWatchTimeInSeconds: 1.1, time: 1 });

    expect(result).toBe(90);
  });

  it("should return more than 110% of average", () => {
    const result = sut({ stopWatchTimeInSeconds: 0.9, time: 1 });

    expect(result).toBe(110);
  });

  it("should return than 100% of average", () => {
    const result = sut({ stopWatchTimeInSeconds: 1, time: 1 });

    expect(result).toBe(100);
  });
});
