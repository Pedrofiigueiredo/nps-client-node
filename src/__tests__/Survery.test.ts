import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../database'

describe("Surverys", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it("Should be able to create a new survery", async () => {
    const response = await request(app).post("/surverys").send({
      title: "Survery Example",
      description: "The survery description example"
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
  })

  it("Should not be able to create a survey with a title already registered", async () => {
    const response = await request(app).post("/surverys").send({
      title: "Survery Example",
      description: "The survery description example"
    })

    expect(response.status).toBe(400)
  })

  it("Should be able to get all surverys", async () => {
    await request(app).post("/surverys").send({
      title: "Survery Example 2",
      description: "The survery description example"
    })

    const response = await request(app).get("/surverys")

    expect(response.body.length).toBe(2)
  })
})