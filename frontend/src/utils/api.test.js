import { describe, it, expect } from "vitest"
import { getApiBaseUrl, getAuthLoginUrl, getAuthRegisterUrl } from "./api"

describe("api", () => {
  // Ensure tests don't depend on local .env / build mode.
  // Vitest exposes import.meta.env as a mutable object in Vite environment.
  const originalEnv = { ...import.meta.env }
  const resetEnv = () => {
    Object.assign(import.meta.env, originalEnv)
  }

  const setLocalEnv = () => {
    Object.assign(import.meta.env, {
      VITE_API_BASE_URL: "",
      PROD: false,
    })
  }

  describe("getApiBaseUrl", () => {
    it("returns localhost:8080 in test/development mode", () => {
      setLocalEnv()
      expect(getApiBaseUrl()).toBe("http://localhost:8080")
      resetEnv()
    })
  })

  describe("getAuthLoginUrl", () => {
    it("returns full login URL with base", () => {
      setLocalEnv()
      expect(getAuthLoginUrl()).toBe("http://localhost:8080/auth/login")
      resetEnv()
    })
  })

  describe("getAuthRegisterUrl", () => {
    it("returns full register URL with base", () => {
      setLocalEnv()
      expect(getAuthRegisterUrl()).toBe("http://localhost:8080/auth/register")
      resetEnv()
    })
  })
})
