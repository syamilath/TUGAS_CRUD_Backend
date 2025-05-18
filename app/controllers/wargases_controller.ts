import type { HttpContext } from '@adonisjs/core/http'
import Warga from '#models/warga'

export default class WargasController {
  public async index({ response }: HttpContext) {
    const wargas = await Warga.all()
    return response.ok({
      status: 'success',
      data: wargas,
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nama', 'umur', 'alamat', 'pekerjaan'])

    if (!data.nama || data.nama.length < 3) {
      return response.badRequest({ message: 'Nama minimal 3 karakter' })
    }

    if (!data.umur || isNaN(data.umur) || data.umur < 0) {
      return response.badRequest({ message: 'Umur harus berupa angka positif' })
    }

    if (!data.alamat || data.alamat.length < 5) {
      return response.badRequest({ message: 'Alamat terlalu pendek' })
    }

    if (!data.pekerjaan || data.pekerjaan.length < 3) {
      return response.badRequest({ message: 'Pekerjaan minimal 3 karakter' })
    }

    const warga = await Warga.create(data)

    return response.created({
      status: 'success',
      message: 'Data warga berhasil ditambahkan',
      data: warga,
    })
  }

  public async show({ params, response }: HttpContext) {
    const warga = await Warga.find(params.id)
    if (!warga) {
      return response.notFound({ message: 'Data warga tidak ditemukan' })
    }
    return response.ok({
      status: 'success',
      data: warga,
    })
  }

  public async update({ params, request, response }: HttpContext) {
    const warga = await Warga.find(params.id)
    if (!warga) {
      return response.notFound({ message: 'Data warga tidak ditemukan' })
    }

    const data = request.only(['nama', 'umur', 'alamat', 'pekerjaan'])

    if (data.nama && data.nama.length < 3) {
      return response.badRequest({ message: 'Nama minimal 3 karakter' })
    }

    if (data.umur !== undefined && (isNaN(data.umur) || data.umur < 0)) {
      return response.badRequest({ message: 'Umur harus angka positif' })
    }

    if (data.alamat && data.alamat.length < 5) {
      return response.badRequest({ message: 'Alamat terlalu pendek' })
    }

    if (data.pekerjaan && data.pekerjaan.length < 3) {
      return response.badRequest({ message: 'Pekerjaan minimal 3 karakter' })
    }

    warga.merge(data)
    await warga.save()

    return response.ok({
      status: 'success',
      message: 'Data warga berhasil diperbarui',
      data: warga,
    })
  }

  public async destroy({ params, response }: HttpContext) {
    const warga = await Warga.find(params.id)
    if (!warga) {
      return response.notFound({ message: 'Data warga tidak ditemukan' })
    }
    await warga.delete()
    return response.noContent()
  }
}
