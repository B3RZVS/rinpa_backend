import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { MedidaIDAO } from 'src/modulos/producto/types/medida.dao.interface';
import { ProductoIDAO } from 'src/modulos/producto/types/producto.dao.interface';
import { ITipoProductoDAO } from 'src/modulos/producto/types/tipo-producto.dao.interface';
import { MedidaValidator } from './medida.validator';
import { TipoProductoValidator } from './tipo-producto.validator';
import { ProductoValidationResult } from '../types/validator.type';

@Injectable()
export class ProductoValidator {
  constructor(
    @Inject('ProductoIDAO') private readonly productoDAO: ProductoIDAO,
    private readonly medidaValidator: MedidaValidator,
    private readonly tipoProductoValidator: TipoProductoValidator,
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
  ): Promise<ProductoValidationResult> {
    const exists = await this.productoDAO.findByProducto(
      tipoProductoId,
      medidaID,
    );

    // Existe pero está eliminado → se puede restaurar
    if (exists && exists.getIsDelete()) {
      return { status: 'RESTORE', productoId: exists.getId() };
    }

    // Existe, no es el mismo, conflicto
    if (exists && exists.getId() !== idToExclude) {
      return {
        status: 'CONFLICT',
        message: `El producto ${exists.getTipoProductoNombre()} ${exists.getMedidaNombreSimbolo()} ya existe.`,
      };
    }

    // Todo OK → se puede crear
    return { status: 'OK' };
  }

  async validateCreate(
    tipoProductoId: number,
    medidaId: number,
  ): Promise<ProductoValidationResult> {
    const nameCheck = await this.ensureNameIsUnique(
      tipoProductoId,
      medidaId,
      0,
    );

    if (nameCheck.status !== 'OK') {
      return nameCheck;
    }

    // Validaciones adicionales
    await this.medidaValidator.ensureExistsById(medidaId);
    await this.tipoProductoValidator.ensureExistsById(tipoProductoId);

    return { status: 'OK' };
  }
}
