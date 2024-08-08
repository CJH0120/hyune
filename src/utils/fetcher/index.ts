export const fetcher = async (
	input: RequestInfo,
	init?: RequestInit
): Promise<any> => {
	try {
		const response = await fetch(input, {
			...init,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				...(init?.headers || {}),
			},
		})

		if (response.redirected) {
			window.location.href = response.url
			return
		}

		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.message || "Error response not ok")
		}

		return await response.json()
	} catch (error) {
		console.error("Fetch error:", error)
		throw error
	}
}
