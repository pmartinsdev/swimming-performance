import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@test/utils/testing-library-setup";
import { getNumberWithTwoDigits } from "@utils/getNumberWithTwoDigits";
import { Stopwatch } from ".";

let sut: RenderResult;

class Helpers {
  getStartButton() {
    const startButtonElement = sut.getByTestId("stopwatch-start");

    return startButtonElement;
  }

  getStopButton() {
    const stopButtonElement = sut.getByTestId("stopwatch-stop");

    return stopButtonElement;
  }

  getResetButton() {
    const resetButtonElement = sut.getByTestId("stopwatch-reset");

    return resetButtonElement;
  }

  async handleCountOneSecond() {
    fireEvent.press(this.getStartButton());

    await waitFor(
      async () => {
        const stopWatchTimerElement = sut.queryByText("00:01:00");

        expect(stopWatchTimerElement).toBeTruthy();
      },
      {
        timeout: 1100,
      }
    );
  }

  async handleStopStopwatch() {
    fireEvent.press(this.getStopButton());
  }

  async handleResetStopwatch() {
    fireEvent.press(this.getResetButton());
  }

  async handleCountSeconds(seconds: number) {
    fireEvent.press(this.getStartButton());
    const second = getNumberWithTwoDigits(seconds);

    const timerText = `00:${second}:00`;

    await waitFor(
      async () => {
        const stopWatchTimerElement = sut.queryByText(timerText);

        expect(stopWatchTimerElement).toBeTruthy();
      },
      { timeout: seconds * 1000 + 100 }
    );
  }
}

describe("@Component -  Stopwatch", () => {
  const helper = new Helpers();

  beforeEach(async () => {
    jest.spyOn(global, "clearInterval");
    sut = render(<Stopwatch comparationTime={1 * 60} />);
  });

  it("should be able to render with success", () => {
    const { queryByTestId } = sut;

    const containerElement = queryByTestId("stopwatch");

    expect(containerElement).toBeTruthy();
  });

  it("should count up stopwatch", async () => {
    const { queryByTestId, queryByText } = sut;

    const startButtonElement = queryByTestId("stopwatch-start");

    act(() => {
      fireEvent.press(startButtonElement);
    });

    await waitFor(
      async () => {
        const stopWatchTimerElement = queryByText("00:01:00");

        expect(stopWatchTimerElement).toBeTruthy();
      },
      {
        timeout: 1100,
      }
    );
  });

  it("should insert data into resume list after press into stopbutton", async () => {
    const { queryAllByTestId } = sut;

    await helper.handleCountOneSecond();
    await helper.handleStopStopwatch();

    const summaryItems = queryAllByTestId("stopwatch-summary");

    expect(summaryItems).toHaveLength(1);
  });

  it("should not call clearInterval if has no stopwatch running", () => {
    const stopButtonElement = helper.getStopButton();

    fireEvent.press(stopButtonElement);

    expect(clearInterval).not.toHaveBeenCalled();
  });

  it("should clear interval if stopwatch already is running", async () => {
    const startButton = helper.getStartButton();
    await helper.handleCountOneSecond();

    fireEvent.press(startButton);

    expect(clearInterval).toHaveBeenCalled();
  });

  it("should reset timer on press reset button", async () => {
    const { queryByText } = sut;

    const resetButton = helper.getResetButton();
    await helper.handleCountOneSecond();

    fireEvent.press(resetButton);

    const resetedTimerElement = queryByText("00:00:00");
    expect(resetedTimerElement).toBeTruthy();
  });

  it("should not clear interval on reset when stopwatch is running", async () => {
    await helper.handleResetStopwatch();

    expect(clearInterval).not.toHaveBeenCalled();
  });

  it("should summary text have word 'menos' if time is more than comparationTime", async () => {
    sut.rerender(<Stopwatch comparationTime={1} />);

    const { getByTestId } = sut;

    await helper.handleCountSeconds(1);
    await helper.handleStopStopwatch();

    const summaryItem = getByTestId("stopwatch-summary");
    const summaryChildrenText = summaryItem.children[0];

    expect(summaryChildrenText).toEqual(
      "Você fez 100% a menos no tempo de 00:01:00 com 00:01:00"
    );
  });

  it("should summary text have word 'mais' if time is less than comparationTime", async () => {
    sut.rerender(<Stopwatch comparationTime={2} />);

    const { getByTestId } = sut;

    await helper.handleCountSeconds(1);
    await helper.handleStopStopwatch();

    const summaryItem = getByTestId("stopwatch-summary");
    const summaryChildrenText = summaryItem.children[0];

    expect(summaryChildrenText).toEqual(
      "Você fez 150% a mais no tempo de 00:02:00 com 00:01:00"
    );
  });
});
