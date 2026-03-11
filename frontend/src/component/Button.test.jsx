import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import Button from "./Button"

describe("Button", () => {
  it("renders content text", () => {
    render(<Button content="Click me" />)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("renders as button element", () => {
    render(<Button content="Submit" />)
    expect(screen.getByRole("button")).toHaveTextContent("Submit")
  })
})
