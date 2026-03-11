import { describe, it, expect } from "vitest"
import { getApiBaseUrl, getAuthLoginUrl, getAuthRegisterUrl } from "./api"

describe("api", () => {
  describe("getApiBaseUrl", () => {
    it("returns localhost:8080 in test/development mode", () => {
      expect(getApiBaseUrl()).toBe("http://localhost:8080")
    })
  })

  describe("getAuthLoginUrl", () => {
    it("returns full login URL with base", () => {
      expect(getAuthLoginUrl()).toBe("http://localhost:8080/auth/login")
    })
  })

  describe("getAuthRegisterUrl", () => {
    it("returns full register URL with base", () => {
      expect(getAuthRegisterUrl()).toBe("http://localhost:8080/auth/register")
    })
  })
})
