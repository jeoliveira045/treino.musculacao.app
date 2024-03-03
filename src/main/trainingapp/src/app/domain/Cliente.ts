import {Exercicio} from "./Exercicio";

export class Cliente{
  id!: number

  nome!: string

  cpf!: string

  exercicios!: Array<Exercicio>
}
