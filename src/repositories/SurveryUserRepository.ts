import { EntityRepository, Repository } from "typeorm";
import { SurveryUser } from "../models/SurveryUsers";

@EntityRepository(SurveryUser)
class SurveryUserRepository extends Repository<SurveryUser> {}

export { SurveryUserRepository }