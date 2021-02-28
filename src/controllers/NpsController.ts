import { Request, Response } from 'express'
import { getCustomRepository, IsNull, Not } from 'typeorm'
import { SurveryUserRepository } from '../repositories/SurveryUserRepository'

class NpsController {
  async npsCalc(request: Request, response: Response) {
    const { survery_id } = request.params

    const surveryUserRepository = getCustomRepository(SurveryUserRepository)

    const surveyUser = await surveryUserRepository.find({
      survery_id,
      value: Not(IsNull())
    })

    const detractors = surveyUser.filter((survery) => 
      survery.value >= 0 && survery.value <= 6
    ).length

    const promotors = surveyUser.filter((survery) => 
      survery.value >= 9 && survery.value <= 10
    ).length

    const passives = surveyUser.filter((survery) => 
      survery.value >= 7 && survery.value <=8
    ).length

    const totalAnswers = surveyUser.length

    const npsValue = Number(
      (((promotors - detractors) / totalAnswers) * 100).toFixed(2)
    )

    return response.json({
      detractors,
      promotors,
      passives,
      totalAnswers,
      nps: npsValue
    })
  }
}

export { NpsController }