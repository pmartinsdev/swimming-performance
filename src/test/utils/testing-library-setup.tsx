import { render, RenderResult } from "@testing-library/react-native";

const customRender: typeof render = (component, options): RenderResult => {
  return render(component, options);
};

export * from "@testing-library/react-native";
export { customRender as render };
