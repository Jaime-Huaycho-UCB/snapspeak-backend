import { Language } from "src/modules/languages/entities/language.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('dictionary')
export class Dictionary {
    @PrimaryGeneratedColumn({name: 'id_word'})
    id: number

    @Column({name: 'word'})
    word: string

    @ManyToOne(() => Language,(language) => language.words)
    @JoinColumn({name: 'id_language'})
    language: Language

    @Column({name: 'translated'})
    translated: string
}
