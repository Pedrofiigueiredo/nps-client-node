import { EntityRepository, Repository } from "typeorm";
import { Survery } from "../models/Survery";

@EntityRepository(Survery)
class SurveryRepository extends Repository<Survery> {}

export { SurveryRepository };
