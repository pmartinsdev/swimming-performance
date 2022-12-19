import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  bail: 0,
  rootDir: ".",
  clearMocks: true,
  preset: "react-native",
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts*"],
  coverageDirectory: "coverage",
  coverageReporters: ["text-summary", "lcov"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts*"],
  coveragePathIgnorePatterns: ["<rootDir>/src/test"],
  setupFilesAfterEnv: ["<rootDir>/src/test/setup.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/",
  }),
};
