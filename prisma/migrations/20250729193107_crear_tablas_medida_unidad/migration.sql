-- CreateTable
CREATE TABLE "Medida" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "unidadId" INTEGER NOT NULL,

    CONSTRAINT "Medida_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medida" ADD CONSTRAINT "Medida_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
