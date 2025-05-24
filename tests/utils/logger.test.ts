import logger from "../../src/utils/logger";

describe("Logger", () => {
  it("should log messages correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    logger({ status: "INFO", message: "Test message" });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Test message"));
    consoleSpy.mockRestore();
  });
});
