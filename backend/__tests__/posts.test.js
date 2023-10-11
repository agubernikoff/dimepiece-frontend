const request = require('supertest')
const app = require('../server')

describe('Get all posts list', () => {
  it('should fetch all the posts available', async () => {
    const res = await request(app)
      .get('/api/posts')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 200)
    expect(res.body).toHaveProperty('message', 'Ok')
    expect(res.body).toHaveProperty('list')
    expect(Array.isArray(res.body.list)).toBe(true)
  })
})
