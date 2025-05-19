import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Comunidad } from '../../comunidad/entities/comunidad.entity';

@Entity()
export class Publicacion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Usuario, usuario => usuario.publicaciones, { nullable: false })
  usuario: Usuario;

  @ManyToOne(() => Comunidad, comunidad => comunidad.publicaciones, { nullable: false })
  comunidad: Comunidad;

  @Column({ nullable: false })
  contenido: string;

  @Column({ type: 'timestamp', nullable: false })
  fecha_publicacion: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_edicion: Date;
} 