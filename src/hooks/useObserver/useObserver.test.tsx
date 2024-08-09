// useObserver.test.tsx
import React, { useState } from "react"
import { render, screen } from "@testing-library/react"
import { useObserver } from "."

describe("useObserver", () => {
	it("엘리먼트가 렌더링되면 콜백함수가 작동해야한다", () => {
		render(<TestComponent />)

		expect(screen.getByText("Intersected!")).toBeInTheDocument()
	})
})
const TestComponent: React.FC = () => {
	const [intersected, setIntersected] = useState(false)

	const handleIntersect = () => {
		setIntersected(true)
	}

	const ref = useObserver(handleIntersect)

	return (
		<div>
			<div style={{ height: "100vh" }}></div>
			<div ref={ref} style={{ height: "100px", backgroundColor: "red" }}></div>
			<div style={{ height: "100vh" }}></div>
			{intersected ? <p>Intersected!</p> : <p>Not intersected</p>}
		</div>
	)
}
