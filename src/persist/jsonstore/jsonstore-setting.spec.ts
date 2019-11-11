import { JsonstoreSetting } from "./jsonstore-setting";

describe("JsonstoreSetting", () => {
  it("should create an instance", () => {
    expect(new JsonstoreSetting("1", "url", "abc")).toBeTruthy();
  });
});
