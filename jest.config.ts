import type { Config } from "jest"

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
	testPathIgnorePatterns: ["/node_modules/", "/dist/"],
}

export default config
