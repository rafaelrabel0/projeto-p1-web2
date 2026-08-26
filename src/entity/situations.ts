import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Users } from "./users";

@Entity("situations")
export class Situations {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nameSituation!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  // uma situacao para muitos usuarios
  @OneToMany(() => Users, (users) => users.situation)
  users!: Users[];
}
