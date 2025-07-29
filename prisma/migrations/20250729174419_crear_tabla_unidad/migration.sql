-- CreateTable
CREATE TABLE "Unidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,

    CONSTRAINT "Unidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unidad_nombre_key" ON "Unidad"("nombre");
