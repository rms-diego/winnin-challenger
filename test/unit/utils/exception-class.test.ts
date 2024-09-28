import { describe, test, expect } from "vitest";
import { Exception } from "@/utils/exception";

describe("Unit test case for exception class", () => {
  test("it should be able instance a new Exception and set 'foo' as a message and 200 as a statusCode", () => {
    const exception = new Exception("foo", 200);

    expect(exception.message).toBe("foo");
    expect(exception.statusCode).toBe(200);
  });

  test("it should be able instance a new Exception and set 'foo' as a message and return 500 for statusCode", () => {
    const exception = new Exception("foo");

    expect(exception.message).toBe("foo");
    expect(exception.statusCode).toBe(500);
  });
});
