import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { ProductoIDAO } from 'src/modulos/producto/infrastructure/datoTypes/producto-IDAO/producto.dao.interface';

@Injectable()
export class ProductoValidator {
  constructor(
    @Inject('ProductoIDAO') private readonly productoDAO: ProductoIDAO,
  ) {}

  /**
   * Verifica que la Medida exista por ID
   */
  async ensureExistsById(id: number): Promise<void> {
    const exists = await this.productoDAO.findById(id);
    if (!exists) {
      throw new ConflictException(`El producto con ID '${id}' no existe.`);
    }
  }

  /**
   * Verifica que la combinacion medida y unidad sea único (excluyendo un ID opcional)
   */
  async ensureNameIsUnique(
    tipoProductoId: number,
    medidaID: number,
    idToExclude: number,
  ): Promise<void> {
    const exists = await this.productoDAO.findByProducto(
      tipoProductoId,
      medidaID,
    );

    if (exists && exists.getId() !== idToExclude) {
      throw new ConflictException(`El producto ya existe.`);
    }
  }
}
