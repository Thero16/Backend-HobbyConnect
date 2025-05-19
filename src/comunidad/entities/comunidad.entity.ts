import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Publicacion } from '../../publicacion/entities/publicacion.entity';

@Entity()
export class Comunidad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: false })
  categoria: string;

  @Column({ nullable: false })
  creada_por: string;

  @Column({ type: 'timestamp', nullable: false })
  fecha_creacion: Date;

  @ManyToMany(() => Usuario, usuario => usuario.comunidades, { cascade: true })
  @JoinTable()
  usuarios: Usuario[];

  @OneToMany(() => Publicacion, publicacion => publicacion.comunidad)
  publicaciones: Publicacion[];
} 