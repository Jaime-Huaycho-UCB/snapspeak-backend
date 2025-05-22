import { Dictionary } from "src/modules/dictionary/entities/dictionary.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_vocabularies')
export class UserVocabulary {
    @PrimaryGeneratedColumn({name: 'id_vocabulary'})
    id: number

    @ManyToOne(() => User,(user) => user.vocabularies)
    @JoinColumn({name: 'id_user'})
    user: User

    @ManyToOne(() => Dictionary,(word) => word.userVocabularies)
    @JoinColumn({name: 'id_word'})
    dictionary: Dictionary

    @Column({name: 'image_url'})
    imageUrl: string
}
