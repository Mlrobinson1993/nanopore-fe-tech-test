export default function useApi() {
  const baseUrl = 'http://localhost:3000/api'

  const get = async <T>(endpoint: string): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`)
      const data: T = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  const post = async <T>(endpoint: string, data: T): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result: T = await response.json()
      return result
    } catch (e) {
      console.error('Error posting data:', e)
      throw e
    }
  }

  const put = async <T>(endpoint: string, data: T): Promise<T> => {
    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result: T = await response.json()
      return result
    } catch (e) {
      console.error('Error putting data:', e)
      throw e
    }
  }

  const remove = async (endpoint: string): Promise<boolean> => {
    try {
      const res = await fetch(`${baseUrl}/${endpoint}`, {
        method: 'DELETE'
      })

      return res.ok
    } catch (e) {
      console.error('Error deleting data:', e)
      throw e
    }
  }

  return {
    get,
    post,
    put,
    remove
  }
}
