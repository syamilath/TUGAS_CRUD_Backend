import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Warga extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama: string

  @column()
  declare umur: number

  @column()
  declare alamat: string

  @column()
  declare pekerjaan: string
}
