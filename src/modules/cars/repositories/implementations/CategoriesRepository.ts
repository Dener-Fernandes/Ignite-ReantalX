import { Category } from "../../model/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

// DTO: Data transfer obejct: um objeto que faz a transferência de dados entre classes.

// Singleton patter sendo aplicado nesta class.

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    // Instânciando a class Category para chamar o constructor e criar o id.
    const category = new Category();

    // Esta função assign permite que sejam passados atributos ao category.
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };
