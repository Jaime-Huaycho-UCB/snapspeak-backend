import { Dictionary } from "src/modules/dictionary/entities/dictionary.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn({name: 'id_language'})
    id: number

    @Column({name: 'code'})
    code: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => Dictionary,(word) => word.language)
    words: Dictionary[]
}
