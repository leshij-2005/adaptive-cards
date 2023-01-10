export default async function request<T> (url: string): Promise<T> {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error([response.url, response.statusText].join(': '))
      }

      return response.json()
    })
}
