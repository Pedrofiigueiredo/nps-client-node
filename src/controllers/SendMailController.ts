import { Request, Response } from 'express'
import { resolve } from 'path'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { SurveryRepository } from '../repositories/SurveryRepository'
import { SurveryUserRepository } from '../repositories/SurveryUserRepository'
import { UserRepository } from '../repositories/UserRepository'
import SendMailService from '../services/SendMailService'

class SendMailController {
  async send(request: Request, response: Response) {
    const { email, survery_id } = request.body

    const userRepository = getCustomRepository(UserRepository)
    const surveryRepository = getCustomRepository(SurveryRepository)
    const surveryUserRepository = getCustomRepository(SurveryUserRepository)

    // Verificar se o email está cadastrado
    const user = await userRepository.findOne({ email })

    if(!user) {
      return response.status(400).json({ error: "User not registered"})
    }

    // Verificar se a survery existe
    const survery = await surveryRepository.findOne({ id: survery_id })

    if(!survery) {
      throw new AppError("Survery not registered")
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

    const surveryUserAlreadyExists = await surveryUserRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survery"]
    })

    const variables = {
      name: user.name,
      title: survery.title,
      description: survery.description,
      id: "",
      link: process.env.URL_MAIL
    }

    if(surveryUserAlreadyExists) {
      variables.id = surveryUserAlreadyExists.id
      await SendMailService.sendMail(email, survery.title, variables, npsPath)
      return response.json(surveryUserAlreadyExists)
    }

    // Salvar os dados na tabela SurverysUsers
    const surveryUser = surveryUserRepository.create({
      user_id: user.id,
      survery_id
    })

    await surveryUserRepository.save(surveryUser)

    variables.id = surveryUser.id

    await SendMailService.sendMail(email, survery.title, variables, npsPath)

    return response.status(201).json({ surveryUser })
  }
}

export { SendMailController }
