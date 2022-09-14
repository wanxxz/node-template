import bcrypt from 'bcrypt'
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createDate: Date

  @UpdateDateColumn()
  updateDate: Date

  @DeleteDateColumn()
  deleteDate: Date

  @Column()
  name: string

  @Column('simple-array')
  groups: string[]

  @Column()
  email: string

  @Column()
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  @BeforeInsert()
  async duplicateName(x, y) {
    const user = await User.findOne({ where: { name: this.name } })
    if (user) throw new Error('user name been used')
  }

  @Column({ default: '' })
  firstName: string

  @Column({ default: '' })
  lastName: string
}
