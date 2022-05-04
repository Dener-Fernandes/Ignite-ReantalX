import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRquest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRquest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
