import { AccountModel } from '@/domain/models'

export interface IAddAccount {
  add(params: IAddAccount.Params): Promise<IAddAccount.Model>
}

export namespace IAddAccount {
  export type Params = {
    email: string
    password: string
    name: string
    passwordConfirmation: string
  }
  export type Model = AccountModel
}
