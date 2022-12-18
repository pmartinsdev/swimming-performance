import { cleanup } from "@testing-library/react-native";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

afterEach(() => {
  cleanup();
});
