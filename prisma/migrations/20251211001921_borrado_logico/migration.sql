-- AlterTable
ALTER TABLE "Medida" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TipoProducto" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Unidad" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
