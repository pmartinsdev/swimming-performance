import {
  fireEvent,
  render,
  RenderResult,
} from "@test/utils/testing-library-setup";

import { HomeScreen } from ".";

let sut: RenderResult;

describe("@Component - Input", () => {
  beforeEach(() => {
    sut = render(<HomeScreen />);
  });

  it("should be able to render with success", () => {
    const { queryByTestId } = sut;

    const containerElement = queryByTestId("input");

    expect(containerElement).toBeTruthy();
  });

  it("should be able to change text", () => {
    const { getByTestId, queryByDisplayValue } = sut;

    const inputTextElement = getByTestId("input");
    fireEvent.changeText(inputTextElement, "0001");

    const updatedInputValue = queryByDisplayValue("00:01");

    expect(updatedInputValue).toBeTruthy();
  });
});
