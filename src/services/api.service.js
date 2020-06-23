class ApiService {
	constructor(baseUrl) {
		this.url = baseUrl
	}

	async createPost(post) {
		try {
			const request = new Request(this.url + '/posts.json', {
				method: 'POST',
				body: JSON.stringify(post)
			})
			return useRequest(request)
		} catch (e) {
			console.warn('Error', e.message)
		}
	}

	async fetchPosts() {
		try {
			const request = new Request(`${this.url}/posts.json`)
			return useRequest(request)
		} catch (e) {
			console.warn('Error', e.message)
		}
	}

	async fetchPostById(id) {
		try {
			const request = new Request(`${this.url}/posts/${id}.json`)
			return useRequest(request)
		} catch (e) {
			console.warn('Error', e.message)
		}
	}

	async deletePostById(id) {
		try {
			const request = new Request(`${this.url}/posts/${id}.json`,{
				method:'DELETE'
			})
			return useRequest(request)
		} catch (e) {
			console.warn('Error', e.message)
		}
	}

}

async function useRequest(request) {
	const response = await fetch(request)
	return await response.json()
}


export const apiService = new ApiService('https://js-blog-2020.firebaseio.com')