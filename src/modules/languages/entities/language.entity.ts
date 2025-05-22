import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn({name: 'id_language'})
    id: number

    @Column({name: 'code'})
    code: number

    @Column({name: 'name'})
    name: string
}
