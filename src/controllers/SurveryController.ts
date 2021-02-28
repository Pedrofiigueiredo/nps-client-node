import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveryRepository } from '../repositories/SurveryRepository'

class SurveryController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body

    const surveryRepository = getCustomRepository(SurveryRepository)

    const surveryAlreadyExists = await surveryRepository.findOne({ title })

    if(surveryAlreadyExists) {
      throw new AppError("Survery already exists")
    }

    const survery = surveryRepository.create({
      title,
      description
    })

    await surveryRepository.save(survery)

    return response.status(201).json(survery)
  }

  async index(request: Request, response: Response) {
    const surveryRepository = getCustomRepository(SurveryRepository)

    const surverys = await surveryRepository.find()

    return response.json(surverys)
  }
}

export { SurveryController }
