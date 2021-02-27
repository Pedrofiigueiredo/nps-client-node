import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { v4 as uuid } from 'uuid'
import { Survery } from "./Survery"
import { User } from "./User"

@Entity("surverys_users")
class SurveryUser {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User

  @Column()
  user_id: string

  @ManyToOne(() => Survery)
  @JoinColumn({name: "survery_id"})
  survery: Survery

  @Column()
  survery_id: string

  @Column()
  value: number

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuid()
    }
  }
}

export { SurveryUser }
