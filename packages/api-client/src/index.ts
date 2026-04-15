export async function getHealth(apiUrl: string) {
  const response = await fetch(`${apiUrl}/health`)
  return response.json()
}
