import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IsEmail, Length } from 'class-validator'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    role: string

  @Column()
  @IsEmail()
    email: string

  @Column({ select: false })
    password: string

  @Column({ default: '' })
    avatar: string

  @Column()
  @Length(2, 20)
    firstName: string

  @Column()
  @Length(2, 20)
    lastName: string

  @Column({ default: '' })
    fullName: string

  @Column({ default: '' })
    phone: string

  @Column({ type: 'text', nullable: true })
    description: string

  @Column({ nullable: true })
    age: number

  @CreateDateColumn()
    createdAt: Date

  @UpdateDateColumn()
    updatedAt: Date
}
