import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm";
import { Comunidad } from '../../comunidad/entities/comunidad.entity';
import { Publicacion } from '../../publicacion/entities/publicacion.entity';

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    nombre: string;

    @Column({ nullable: false })
    correo: string;

    @Column({ nullable: false })
    contrasena: string;

    @Column({ nullable: true })
    descripcion: string;

    @Column({ nullable: true })
    fotoUrl: string;

    @Column({ type: Date, nullable: false })
    fechaRegistro: Date;

    @Column("simple-array", { nullable: true })
    hobbies: string[]; 

    @ManyToMany(() => Comunidad, comunidad => comunidad.usuarios)
    comunidades: Comunidad[];

    @OneToMany(() => Publicacion, publicacion => publicacion.usuario)
    publicaciones: Publicacion[];
}
