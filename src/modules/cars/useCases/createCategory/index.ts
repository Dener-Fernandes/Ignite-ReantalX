import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// Colocando tudo dentro de uma função para impedir que os arquivos sejam carregados assim
// que este arquivo for carregado pelo arquivo de routes.
export default (): CreateCategoryController => {
  const categoryRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
