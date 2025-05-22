import { UserVocabulary } from "src/modules/user-vocabularies/entities/user-vocabulary.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({name: 'id_user'})
    id: number

    @Column({name: 'username'})
    username: string

    @Column({name: 'password'})
    password: string

    @OneToMany(() => UserVocabulary,(vocabulary) => vocabulary.user)
    vocabularies: UserVocabulary[]
}
