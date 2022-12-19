import {
  fireEvent,
  render,
  RenderResult,
} from "@test/utils/testing-library-setup";

import { Input } from ".";

let sut: RenderResult;

const inputProps = {
  onChangeText: jest.fn(),
};

describe("@Component - Input", () => {
  beforeEach(() => {
    sut = render(<Input name="test" onChangeText={inputProps.onChangeText} />);
  });

  it("should be able to render with success", () => {
    const { queryByTestId } = sut;

    const containerElement = queryByTestId("input");

    expect(containerElement).toBeTruthy();
  });

  it("should be able to change text", () => {
    const { getByTestId } = sut;

    const inputTextElement = getByTestId("input");

    fireEvent.changeText(inputTextElement, "abc");

    expect(inputProps.onChangeText).toHaveBeenCalledWith("", "abc");
  });
});
