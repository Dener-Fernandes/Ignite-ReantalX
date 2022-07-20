import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailabletCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 110.0,
      license_plate: "CIA-4577",
      fine_amount: 40,
      brand: "Car1 brand",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 110.0,
      license_plate: "CIA-4577",
      fine_amount: 40,
      brand: "Car1 brand Test",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car1 brand Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car1 description",
      daily_rate: 110.0,
      license_plate: "CIA-5677",
      fine_amount: 40,
      brand: "Car1 brand Test",
      category_id: "category_id",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car1 description",
      daily_rate: 110.0,
      license_plate: "CIA-5677",
      fine_amount: 40,
      brand: "Car1 brand Test",
      category_id: "12345",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
