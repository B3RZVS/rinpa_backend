/*
  Warnings:

  - A unique constraint covering the columns `[cantidad,unidadId]` on the table `Medida` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "tipoProductoId" INTEGER NOT NULL,
    "medidaId" INTEGER NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Medida_cantidad_unidadId_key" ON "Medida"("cantidad", "unidadId");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_tipoProductoId_fkey" FOREIGN KEY ("tipoProductoId") REFERENCES "TipoProducto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_medidaId_fkey" FOREIGN KEY ("medidaId") REFERENCES "Medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
