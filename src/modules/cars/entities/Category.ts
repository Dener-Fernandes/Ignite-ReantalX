import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

// O @Entity serve para definir que essa class será uma entidade do banco de dados.
@Entity("categories")
class Category {
  // Como o nome do atributo é o mesmo que foi definido na criação da migration, não é necessário
  // informar o nome dentro dos ().
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
