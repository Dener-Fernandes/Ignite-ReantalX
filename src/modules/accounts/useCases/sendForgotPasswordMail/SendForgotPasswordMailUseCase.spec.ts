import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail Use Case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "emailTest@gmail.com",
      name: "NewUserTest",
      password: "7891011",
    });

    await sendForgotPasswordMailUseCase.execute("emailTest@gmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a mail if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("anotherEmailTest@gmail.com")
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "emailTest@gmail.com",
      name: "NewUserTest",
      password: "7891011",
    });

    await sendForgotPasswordMailUseCase.execute("emailTest@gmail.com");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
