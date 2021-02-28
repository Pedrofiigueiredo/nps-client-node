import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveryUserRepository } from '../repositories/SurveryUserRepository'

class AnswerController {

  // https://localhost:3333/answers/10?u=228c6137-95ef-4b66-9873-e590bc1a3708

  async execute(request: Request, response: Response) {
    const { value } = request.params /* Nota */
    const { u } = request.query /* Id */

    const surveryUserRepository = getCustomRepository(SurveryUserRepository)

    const surveryUser = await surveryUserRepository.findOne({
      id: String(u)
    })

    if(!surveryUser) {
      throw new AppError("SurveryUser not registered")
    }

    surveryUser.value = Number(value)

    await surveryUserRepository.save(surveryUser)

    return response.json(surveryUser)
  }
}

export { AnswerController }