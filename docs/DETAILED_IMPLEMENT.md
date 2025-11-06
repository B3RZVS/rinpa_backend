# Plan Detallado de Implementación - Testing del Módulo de Entrega

**Fecha de Creación**: 2024-12-19  
**Módulo**: Entrega  
**Alcance**: Tests unitarios, de integración y e2e

---

## Índice

1. [Configuración Inicial de Testing](#10-configuración-inicial-de-testing)
2. [Tests Unitarios - Validators](#20-tests-unitarios---validators)
3. [Tests Unitarios - Mappers](#30-tests-unitarios---mappers)
4. [Tests Unitarios - Entities](#40-tests-unitarios---entities)
5. [Tests Unitarios - DAOs](#50-tests-unitarios---daos)
6. [Tests Unitarios - Services](#60-tests-unitarios---services)
7. [Tests Unitarios - Controllers](#70-tests-unitarios---controllers)
8. [Tests de Integración](#80-tests-de-integración)
9. [Tests End-to-End (E2E)](#90-tests-end-to-end-e2e)
10. [Tests de Rendimiento](#100-tests-de-rendimiento)

---

## 1.0 Configuración Inicial de Testing

### 1.1 Configurar Base de Datos de Testing

- **Objective**: Configurar una base de datos separada para ejecutar tests sin afectar datos de desarrollo/producción.

- **Prompt**: Crear archivo `.env.test` con configuración de base de datos de testing. Configurar Prisma para usar esta base de datos en modo test.

- **Expected Output**:
  - Archivo `.env.test` con `DATABASE_URL` apuntando a base de datos de test
  - Script en `package.json` para ejecutar tests con esta configuración
  - Documentación de cómo resetear la base de datos de test

- **Testing/Validation**:
  - Verificar que `DATABASE_URL` en `.env.test` apunta a base de datos diferente
  - Ejecutar `npm run test` y verificar que no afecta base de datos principal
  - Verificar que `.env.test` está en `.gitignore`

- **Dependencies**:
  - PostgreSQL instalado y corriendo
  - Prisma configurado

- **Notes**:
  - Usar base de datos como `rinpa_test` o similar
  - Considerar usar SQLite en memoria para tests más rápidos
  - Documentar proceso de migración de schema para tests

---

### 1.2 Configurar Mocks y Fixtures

- **Objective**: Crear mocks reutilizables y fixtures de datos para tests del módulo de entrega.

- **Prompt**: Crear archivo `src/modulos/entrega/__tests__/fixtures/entrega.fixtures.ts` con datos de prueba para entregas, clientes, usuarios, productos y precios de nafta. Crear archivo `src/modulos/entrega/__tests__/mocks/` con mocks de DAOs, validators y servicios.

- **Expected Output**:
  - `src/modulos/entrega/__tests__/fixtures/entrega.fixtures.ts` con funciones que retornan objetos de prueba
  - `src/modulos/entrega/__tests__/mocks/entrega-dao.mock.ts`
  - `src/modulos/entrega/__tests__/mocks/detalle-entrega-dao.mock.ts`
  - `src/modulos/entrega/__tests__/mocks/validators.mock.ts`
  - `src/modulos/entrega/__tests__/mocks/prisma.mock.ts`

- **Testing/Validation**:
  - Verificar que los fixtures retornan datos válidos según los DTOs
  - Verificar que los mocks implementan las interfaces correctamente
  - Ejecutar tests básicos usando los fixtures y mocks

- **Dependencies**:
  - DTOs y Entities del módulo de entrega definidos
  - Interfaces de DAOs definidas

- **Notes**:
  - Usar factory pattern para crear datos de prueba
  - Incluir casos edge (datos vacíos, null, valores límite)
  - Documentar qué representa cada fixture

---

## 2.0 Tests Unitarios - Validators

### 2.1 Test de EntregaValidator.ensureExistsById

- **Objective**: Verificar que el validador lanza excepción cuando la entrega no existe y no lanza cuando existe.

- **Prompt**: Crear archivo `src/modulos/entrega/validators/entrega.validator.spec.ts` con tests para `ensureExistsById`. Testear casos: entrega existe, entrega no existe, ID inválido.

- **Expected Output**:
  - Archivo `entrega.validator.spec.ts` con al menos 3 tests:
    - `should throw ConflictException when entrega does not exist`
    - `should not throw when entrega exists`
    - `should handle invalid ID gracefully`

- **Testing/Validation**:
  - Ejecutar `npm test entrega.validator.spec.ts`
  - Verificar que todos los tests pasan
  - Verificar cobertura de código > 80%

- **Dependencies**:
  - Mock de EntregaDAO
  - Fixtures de entrega

- **Notes**:
  - Usar `jest.spyOn` para mockear el DAO
  - Verificar que el mensaje de error es descriptivo

---

## 3.0 Tests Unitarios - Mappers

### 3.1 Test de EntregaMapper.toEntity

- **Objective**: Verificar que el mapper transforma correctamente modelos de Prisma a Entities, incluyendo relaciones opcionales.

- **Prompt**: Crear archivo `src/modulos/entrega/mappers/mapper-dao/entrega.mapper.spec.ts` con tests para `toEntity`. Testear casos: con relaciones, sin relaciones, con detalles, sin detalles.

- **Expected Output**:
  - Archivo `entrega.mapper.spec.ts` con tests para:
    - Mapeo con todas las relaciones (cliente, usuario, precioNafta, detalles)
    - Mapeo sin relaciones
    - Mapeo con detalles vacíos
    - Mapeo con detalles múltiples

- **Testing/Validation**:
  - Verificar que todos los campos se mapean correctamente
  - Verificar que las relaciones opcionales se manejan correctamente
  - Verificar que los detalles se mapean como array de DetalleEntregaEntity

- **Dependencies**:
  - Fixtures de Prisma models
  - Entities definidas

- **Notes**:
  - Testear especialmente las relaciones ya que fueron agregadas recientemente
  - Verificar que null se maneja correctamente

---

### 3.2 Test de EntregaResponseMapper.toResponse

- **Objective**: Verificar que el mapper de respuesta transforma correctamente Entities a DTOs de respuesta.

- **Prompt**: Crear archivo `src/modulos/entrega/mappers/mappers-response/entrega-responde.mapper.spec.ts` con tests para `toResponse`. Testear casos: con todas las relaciones, sin relaciones, cálculo de consumoTotal.

- **Expected Output**:
  - Archivo `entrega-responde.mapper.spec.ts` con tests para:
    - Mapeo completo con cliente, usuario y precioNafta
    - Mapeo sin relaciones (valores por defecto)
    - Cálculo correcto de `consumoTotal` (litrosGastados \* precioNafta)
    - Mapeo de detalles

- **Testing/Validation**:
  - Verificar que `consumoTotal` se calcula correctamente
  - Verificar que valores null se manejan con valores por defecto
  - Verificar que todos los campos del DTO se completan

- **Dependencies**:
  - EntregaEntity con relaciones
  - GetEntregaDTO definido

- **Notes**:
  - El cálculo de `consumoTotal` es crítico para el negocio
  - Verificar casos edge (precioNafta = 0, litrosGastados = 0)

---

## 4.0 Tests Unitarios - Entities

### 4.1 Test de EntregaEntity

- **Objective**: Verificar que la entidad Entrega encapsula correctamente los datos y expone los getters apropiados.

- **Prompt**: Crear archivo `src/modulos/entrega/entities/entrega.entity.spec.ts` con tests para todos los getters y verificación de relaciones opcionales.

- **Expected Output**:
  - Archivo `entrega.entity.spec.ts` con tests para:
    - Todos los getters (getId, getClienteId, getUsuarioId, etc.)
    - Getters de relaciones opcionales (getCliente, getUsuario, getPrecioNafta)
    - Retorno de null cuando las relaciones no están presentes

- **Testing/Validation**:
  - Verificar que todos los getters retornan valores correctos
  - Verificar que getters de relaciones retornan null cuando no están presentes
  - Verificar que getters de relaciones retornan entidades cuando están presentes

- **Dependencies**:
  - EntregaEntity definida
  - ClienteEntity, UserEntity, PrecioNaftaEntity definidas

- **Notes**:
  - Las relaciones opcionales fueron agregadas recientemente, testear especialmente

---

## 5.0 Tests Unitarios - DAOs

### 5.1 Test de EntregaDAO.findAll

- **Objective**: Verificar que el DAO retorna todas las entregas no eliminadas con relaciones incluidas, ordenadas por fecha descendente.

- **Prompt**: Crear archivo `src/modulos/entrega/repository/entrega.dao.spec.ts` con tests para `findAll`. Mockear PrismaService y verificar que se incluyen todas las relaciones y se aplica el filtro `isDeleted: false`.

- **Expected Output**:
  - Archivo `entrega.dao.spec.ts` con tests para:
    - Retorna solo entregas con `isDeleted: false`
    - Incluye relaciones (cliente, usuario, precioNafta, detalles)
    - Ordena por fecha descendente
    - Mapea correctamente a Entities

- **Testing/Validation**:
  - Verificar que Prisma se llama con `where: { isDeleted: false }`
  - Verificar que `include` contiene todas las relaciones
  - Verificar que `orderBy: { fecha: 'desc' }` está presente
  - Verificar que se mapea a EntregaEntity[]

- **Dependencies**:
  - Mock de PrismaService
  - EntregaMapper
  - Fixtures de Prisma models

- **Notes**:
  - Este método fue optimizado recientemente, verificar especialmente las relaciones incluidas
  - Verificar que no hay problema N+1 (una sola consulta)

---

### 5.2 Test de EntregaDAO.findAllPaginated

- **Objective**: Verificar que el DAO retorna entregas paginadas con filtros aplicados correctamente.

- **Prompt**: Agregar tests a `entrega.dao.spec.ts` para `findAllPaginated`. Verificar paginación, filtros, y que el count usa el mismo where clause.

- **Expected Output**:
  - Tests para:
    - Paginación correcta (skip, take)
    - Filtro `isDeleted: false` siempre aplicado
    - Filtros adicionales se combinan correctamente
    - Count usa el mismo where clause
    - Retorna tupla [EntregaEntity[], number]

- **Testing/Validation**:
  - Verificar que `skip` y `take` se pasan correctamente
  - Verificar que `whereClause` combina `isDeleted: false` con filtros adicionales
  - Verificar que count y findMany usan el mismo where
  - Verificar ordenamiento por fecha descendente

- **Dependencies**:
  - Mock de PrismaService
  - EntregaMapper

- **Notes**:
  - Este método fue corregido recientemente para incluir `isDeleted: false` en el count
  - Verificar especialmente que el count no se olvida del filtro

---

### 5.3 Test de EntregaDAO.findById

- **Objective**: Verificar que el DAO retorna una entrega por ID con todas sus relaciones incluidas.

- **Prompt**: Agregar tests a `entrega.dao.spec.ts` para `findById`. Verificar que incluye relaciones y retorna null cuando no existe.

- **Expected Output**:
  - Tests para:
    - Retorna EntregaEntity cuando existe
    - Retorna null cuando no existe
    - Incluye todas las relaciones (cliente, usuario, precioNafta, detalles)
    - Mapea correctamente a Entity

- **Testing/Validation**:
  - Verificar que Prisma se llama con `where: { id }`
  - Verificar que `include` contiene todas las relaciones
  - Verificar mapeo correcto

- **Dependencies**:
  - Mock de PrismaService
  - EntregaMapper

- **Notes**:
  - Este método fue optimizado para incluir relaciones, verificar especialmente

---

### 5.4 Test de EntregaDAO.create

- **Objective**: Verificar que el DAO crea una nueva entrega correctamente.

- **Prompt**: Agregar tests a `entrega.dao.spec.ts` para `create`. Verificar que se crea con los datos correctos y se mapea a Entity.

- **Expected Output**:
  - Tests para:
    - Crea entrega con datos correctos
    - Retorna EntregaEntity mapeada
    - Maneja errores de Prisma

- **Testing/Validation**:
  - Verificar que Prisma.create se llama con datos correctos
  - Verificar mapeo a Entity

- **Dependencies**:
  - Mock de PrismaService
  - EntregaMapper
  - CreateEntregaDTO

- **Notes**:
  - Este método no incluye relaciones en la creación (se obtienen después con findById)

---

### 5.5 Test de EntregaDAO.update

- **Objective**: Verificar que el DAO actualiza una entrega y luego la retorna con relaciones.

- **Prompt**: Agregar tests a `entrega.dao.spec.ts` para `update`. Verificar que actualiza, luego busca con findById (que incluye relaciones), y maneja errores.

- **Expected Output**:
  - Tests para:
    - Actualiza con datos correctos
    - Llama a findById después de actualizar
    - Retorna EntregaEntity con relaciones
    - Lanza error si findById retorna null

- **Testing/Validation**:
  - Verificar que Prisma.update se llama correctamente
  - Verificar que findById se llama después
  - Verificar manejo de errores

- **Dependencies**:
  - Mock de PrismaService
  - EntregaMapper

- **Notes**:
  - Este método llama a findById que incluye relaciones, verificar que funciona correctamente

---

### 5.6 Test de EntregaDAO.delete

- **Objective**: Verificar que el DAO realiza soft delete correctamente.

- **Prompt**: Agregar tests a `entrega.dao.spec.ts` para `delete`. Verificar que actualiza `isDeleted: true` y no borra físicamente.

- **Expected Output**:
  - Tests para:
    - Actualiza `isDeleted: true`
    - No borra físicamente (usa update, no delete)
    - Maneja errores

- **Testing/Validation**:
  - Verificar que Prisma.update se llama con `data: { isDeleted: true }`
  - Verificar que NO se llama a Prisma.delete

- **Dependencies**:
  - Mock de PrismaService

- **Notes**:
  - Soft delete es importante para mantener historial

---

## 6.0 Tests Unitarios - Services

### 6.1 Test de EntregaService.getAll

- **Objective**: Verificar que el servicio retorna todas las entregas usando el DAO.

- **Prompt**: Crear archivo `src/modulos/entrega/services/entrega.service.spec.ts` con tests para `getAll`. Mockear EntregaDAO y verificar que retorna las entregas correctamente.

- **Expected Output**:
  - Archivo `entrega.service.spec.ts` con tests para:
    - Llama a entregaDAO.findAll()
    - Retorna array de EntregaEntity
    - Maneja errores del DAO

- **Testing/Validation**:
  - Verificar que se llama al DAO correctamente
  - Verificar que retorna lo que el DAO retorna
  - Verificar manejo de errores

- **Dependencies**:
  - Mock de EntregaDAO
  - Fixtures de EntregaEntity

- **Notes**:
  - Este método es simple, pero importante verificar que funciona correctamente

---

### 6.2 Test de EntregaService.getAllPaginated

- **Objective**: Verificar que el servicio retorna entregas paginadas usando queryBuilder.

- **Prompt**: Agregar tests a `entrega.service.spec.ts` para `getAllPaginated`. Mockear queryBuilder y verificar que se pasa correctamente al DAO.

- **Expected Output**:
  - Tests para:
    - Llama a queryBuilder con función correcta
    - Retorna resultado paginado
    - Pasa parámetros correctamente al DAO

- **Testing/Validation**:
  - Verificar que queryBuilder se llama con función que usa entregaDAO.findAllPaginated
  - Verificar estructura de respuesta (data, meta)

- **Dependencies**:
  - Mock de queryBuilder
  - Mock de EntregaDAO

- **Notes**:
  - queryBuilder es una función genérica, verificar que se usa correctamente

---

### 6.3 Test de EntregaService.getById

- **Objective**: Verificar que el servicio retorna una entrega por ID y lanza excepción si no existe.

- **Prompt**: Agregar tests a `entrega.service.spec.ts` para `getById`. Verificar que retorna la entrega cuando existe y lanza ConflictException cuando no existe.

- **Expected Output**:
  - Tests para:
    - Retorna EntregaEntity cuando existe
    - Lanza ConflictException cuando no existe
    - Mensaje de error descriptivo

- **Testing/Validation**:
  - Verificar que se llama a entregaDAO.findById(id)
  - Verificar que lanza ConflictException con mensaje correcto
  - Verificar que retorna la entidad cuando existe

- **Dependencies**:
  - Mock de EntregaDAO
  - Fixtures

- **Notes**:
  - El error cambió recientemente de Error genérico a ConflictException, verificar

---

### 6.4 Test de EntregaService.create

- **Objective**: Verificar que el servicio crea una entrega validando usuario y cliente, creando la entrega y sus detalles.

- **Prompt**: Agregar tests a `entrega.service.spec.ts` para `create`. Mockear validators, DAOs y verificar el flujo completo.

- **Expected Output**:
  - Tests para:
    - Valida que usuario existe
    - Valida que cliente existe
    - Crea la entrega
    - Crea los detalles
    - Retorna entrega con relaciones
    - Lanza error si validación falla
    - Lanza error si findById retorna null después de crear

- **Testing/Validation**:
  - Verificar orden de llamadas: userValidator → clienteValidator → entregaDAO.create → detalleDAO.create → entregaDAO.findById
  - Verificar que se pasan los datos correctos
  - Verificar manejo de errores en cada paso

- **Dependencies**:
  - Mocks de AuthValidator, ClienteValidator
  - Mocks de EntregaDAO, DetalleEntregaDAO
  - Fixtures de CreateEntregaDTO

- **Notes**:
  - Este es un método complejo con múltiples pasos, testear cada uno
  - Verificar especialmente que findById se llama después de crear para obtener relaciones

---

### 6.5 Test de EntregaService.update

- **Objective**: Verificar que el servicio actualiza una entrega validando que existe primero.

- **Prompt**: Agregar tests a `entrega.service.spec.ts` para `update`. Verificar validación y actualización.

- **Expected Output**:
  - Tests para:
    - Valida que entrega existe
    - Llama a entregaDAO.update con datos correctos
    - Retorna entrega actualizada
    - Lanza error si validación falla

- **Testing/Validation**:
  - Verificar que entregaValidator.ensureExistsById se llama primero
  - Verificar que entregaDAO.update se llama con id y data
  - Verificar retorno correcto

- **Dependencies**:
  - Mock de EntregaValidator
  - Mock de EntregaDAO

- **Notes**:
  - Verificar que la validación es asíncrona (await)

---

### 6.6 Test de EntregaService.delete

- **Objective**: Verificar que el servicio elimina (soft delete) una entrega validando que existe.

- **Prompt**: Agregar tests a `entrega.service.spec.ts` para `delete`. Verificar validación y eliminación.

- **Expected Output**:
  - Tests para:
    - Valida que entrega existe
    - Llama a entregaDAO.delete
    - Lanza error si validación falla

- **Testing/Validation**:
  - Verificar que entregaValidator.ensureExistsById se llama primero
  - Verificar que entregaDAO.delete se llama con id
  - Verificar que no retorna nada (void)

- **Dependencies**:
  - Mock de EntregaValidator
  - Mock de EntregaDAO

- **Notes**:
  - Verificar que la validación es asíncrona (await)

---

## 7.0 Tests Unitarios - Controllers

### 7.1 Test de EntregaController.getEntregas

- **Objective**: Verificar que el controller retorna todas las entregas mapeadas a DTOs de respuesta.

- **Prompt**: Crear archivo `src/modulos/entrega/controllers/entrega.controller.spec.ts` con tests para `getEntregas`. Mockear EntregaService y verificar que mapea correctamente usando las relaciones incluidas.

- **Expected Output**:
  - Archivo `entrega.controller.spec.ts` con tests para:
    - Llama a entregaService.getAll()
    - Mapea cada entrega usando relaciones ya incluidas (no hace consultas adicionales)
    - Retorna array de GetEntregaDTO
    - Maneja errores

- **Testing/Validation**:
  - Verificar que no se hacen consultas adicionales a servicios externos (cliente, usuario, precioNafta)
  - Verificar que se usan getCliente(), getUsuario(), getPrecioNafta() de la entidad
  - Verificar que EntregaResponseMapper.toResponse se llama correctamente

- **Dependencies**:
  - Mock de EntregaService
  - Fixtures de EntregaEntity con relaciones

- **Notes**:
  - Este endpoint fue optimizado recientemente para usar relaciones ya incluidas
  - Verificar especialmente que NO se hacen consultas N+1

---

### 7.2 Test de EntregaController.getPaginatedEntregas

- **Objective**: Verificar que el controller retorna entregas paginadas correctamente.

- **Prompt**: Agregar tests a `entrega.controller.spec.ts` para `getPaginatedEntregas`. Verificar paginación y mapeo.

- **Expected Output**:
  - Tests para:
    - Llama a entregaService.getAllPaginated con query params
    - Mapea entregas usando relaciones incluidas
    - Retorna estructura { data, meta }
    - Maneja errores

- **Testing/Validation**:
  - Verificar que query params se pasan correctamente
  - Verificar estructura de respuesta
  - Verificar que no hay consultas N+1

- **Dependencies**:
  - Mock de EntregaService
  - QueryParamsDto

- **Notes**:
  - Verificar especialmente que no hay Promise.all innecesario (ya fue optimizado)

---

### 7.3 Test de EntregaController.getEntregaById

- **Objective**: Verificar que el controller retorna una entrega por ID mapeada correctamente.

- **Prompt**: Agregar tests a `entrega.controller.spec.ts` para `getEntregaById`. Verificar que usa relaciones incluidas.

- **Expected Output**:
  - Tests para:
    - Llama a entregaService.getById(id)
    - Mapea usando relaciones incluidas (no consultas adicionales)
    - Retorna GetEntregaDTO
    - Maneja errores (404, etc.)

- **Testing/Validation**:
  - Verificar que no se hacen consultas adicionales
  - Verificar mapeo correcto
  - Verificar manejo de errores

- **Dependencies**:
  - Mock de EntregaService

- **Notes**:
  - Este endpoint fue optimizado recientemente

---

### 7.4 Test de EntregaController.crearEntrega

- **Objective**: Verificar que el controller crea una entrega y retorna respuesta correcta.

- **Prompt**: Agregar tests a `entrega.controller.spec.ts` para `crearEntrega`. Verificar creación y mapeo.

- **Expected Output**:
  - Tests para:
    - Llama a entregaService.create con DTO
    - Mapea usando relaciones incluidas
    - Retorna ResponseDto con estructura correcta
    - Maneja errores de validación

- **Testing/Validation**:
  - Verificar que DTO se pasa correctamente
  - Verificar estructura de ResponseDto
  - Verificar que no hay consultas adicionales después de crear

- **Dependencies**:
  - Mock de EntregaService
  - CreateEntregaDTO fixture

- **Notes**:
  - Verificar que el servicio ya retorna la entrega con relaciones

---

### 7.5 Test de EntregaController.updateEntrega

- **Objective**: Verificar que el controller actualiza una entrega correctamente.

- **Prompt**: Agregar tests a `entrega.controller.spec.ts` para `updateEntrega`. Verificar actualización y mapeo.

- **Expected Output**:
  - Tests para:
    - Llama a entregaService.update con id y DTO
    - Mapea usando relaciones incluidas
    - Retorna ResponseDto correcto
    - Maneja errores

- **Testing/Validation**:
  - Verificar parámetros correctos
  - Verificar estructura de respuesta
  - Verificar manejo de errores

- **Dependencies**:
  - Mock de EntregaService
  - UpdateEntregaDTO fixture

---

### 7.6 Test de EntregaController.deleteEntrega

- **Objective**: Verificar que el controller elimina una entrega correctamente.

- **Prompt**: Agregar tests a `entrega.controller.spec.ts` para `deleteEntrega`. Verificar eliminación y respuesta.

- **Expected Output**:
  - Tests para:
    - Llama a entregaService.delete(id)
    - Retorna ResponseDto con mensaje correcto
    - Maneja errores

- **Testing/Validation**:
  - Verificar que se llama con id correcto
  - Verificar estructura de respuesta
  - Verificar manejo de errores

- **Dependencies**:
  - Mock de EntregaService

---

## 8.0 Tests de Integración

### 8.1 Test de Integración: Crear Entrega Completa

- **Objective**: Verificar que el flujo completo de creación de entrega funciona correctamente con base de datos real.

- **Prompt**: Crear archivo `src/modulos/entrega/__tests__/integration/entrega.integration.spec.ts` con test que crea una entrega completa (con cliente, usuario, productos existentes) y verifica que se guarda correctamente con todas las relaciones.

- **Expected Output**:
  - Archivo de integración con test que:
    - Crea datos de prueba en BD (cliente, usuario, productos, precioNafta)
    - Crea entrega con detalles
    - Verifica que se guardó correctamente
    - Verifica que las relaciones están presentes
    - Limpia datos de prueba

- **Testing/Validation**:
  - Ejecutar con base de datos de test real
  - Verificar que todas las relaciones se guardan
    - Verificar que los detalles se crean
    - Verificar que las relaciones (cliente, usuario, precioNafta) están presentes al recuperar
  - Verificar que soft delete funciona

- **Dependencies**:
  - Base de datos de test configurada
  - Prisma migrations aplicadas
  - Datos de prueba (seeds)

- **Notes**:
  - Usar `beforeEach` y `afterEach` para limpiar datos
  - Considerar usar transacciones que se revierten

---

### 8.2 Test de Integración: Consultas Optimizadas (Sin N+1)

- **Objective**: Verificar que las consultas optimizadas no tienen problema N+1.

- **Prompt**: Agregar test a `entrega.integration.spec.ts` que crea múltiples entregas y verifica que getAll() hace solo una consulta a la base de datos (usando Prisma query logging).

- **Expected Output**:
  - Test que:
    - Crea 10 entregas con relaciones
    - Ejecuta getAll()
    - Verifica número de consultas SQL (debe ser 1 o muy pocas)
    - Verifica que todas las relaciones están presentes

- **Testing/Validation**:
  - Habilitar logging de queries de Prisma
  - Contar número de queries ejecutadas
  - Verificar que es 1 (o máximo 2-3 si hay subconsultas necesarias)
  - Verificar que todas las entregas tienen relaciones cargadas

- **Dependencies**:
  - Prisma con logging habilitado
  - Base de datos de test

- **Notes**:
  - Este test valida la optimización reciente del módulo
  - Usar `prisma.$on('query')` para contar queries

---

### 8.3 Test de Integración: Paginación con Filtros

- **Objective**: Verificar que la paginación funciona correctamente con filtros.

- **Prompt**: Agregar test a `entrega.integration.spec.ts` que prueba paginación con diferentes filtros (por cliente, por fecha, etc.).

- **Expected Output**:
  - Tests para:
    - Paginación básica (page, page_size)
    - Filtros por clienteId
    - Filtros por fecha
    - Verificación de metadatos (totalItems, totalPages, etc.)
    - Verificación de que isDeleted: false siempre se aplica

- **Testing/Validation**:
  - Crear entregas de prueba con diferentes clientes y fechas
  - Verificar que los filtros funcionan
  - Verificar que la paginación es correcta
  - Verificar que las entregas eliminadas no aparecen

- **Dependencies**:
  - Base de datos de test
  - Datos de prueba

---

## 9.0 Tests End-to-End (E2E)

### 9.1 Test E2E: Flujo Completo de Entrega

- **Objective**: Verificar que el flujo completo desde HTTP hasta base de datos funciona correctamente.

- **Prompt**: Crear archivo `test/entrega.e2e-spec.ts` con tests E2E usando supertest. Testear todos los endpoints del módulo de entrega.

- **Expected Output**:
  - Archivo `test/entrega.e2e-spec.ts` con tests para:
    - GET /entrega - Listar todas las entregas
    - GET /entrega/paginated - Listar paginado
    - GET /entrega/:id - Obtener por ID
    - POST /entrega - Crear entrega
    - PUT /entrega/:id - Actualizar entrega
    - DELETE /entrega/:id - Eliminar entrega

- **Testing/Validation**:
  - Ejecutar `npm run test:e2e`
  - Verificar códigos de estado HTTP correctos
  - Verificar estructura de respuestas
  - Verificar que las relaciones están presentes en respuestas
  - Verificar validaciones (400, 404, etc.)

- **Dependencies**:
  - AppModule configurado
  - Base de datos de test
  - Autenticación mockeada si es necesaria

- **Notes**:
  - Estos tests son más lentos pero validan el sistema completo
  - Considerar usar base de datos en memoria para velocidad

---

### 9.2 Test E2E: Optimización N+1

- **Objective**: Verificar desde E2E que no hay problema N+1 en los endpoints GET.

- **Prompt**: Agregar test a `test/entrega.e2e-spec.ts` que mide el tiempo de respuesta de GET /entrega con múltiples entregas y verifica que es razonable (no escala linealmente).

- **Expected Output**:
  - Test que:
    - Crea 50 entregas de prueba
    - Mide tiempo de GET /entrega
    - Verifica que el tiempo es razonable (< 1 segundo para 50 entregas)
    - Verifica que todas las relaciones están presentes

- **Testing/Validation**:
  - Medir tiempo de respuesta
  - Comparar con tiempo esperado
  - Verificar que escala bien (no linealmente)

- **Dependencies**:
  - Base de datos de test con datos
  - Herramientas de medición de tiempo

- **Notes**:
  - Este test valida la optimización desde el punto de vista del usuario final

---

## 10.0 Tests de Rendimiento

### 10.1 Test de Rendimiento: Consultas con Muchos Datos

- **Objective**: Verificar que las consultas optimizadas funcionan bien con grandes volúmenes de datos.

- **Prompt**: Crear archivo `src/modulos/entrega/__tests__/performance/entrega.performance.spec.ts` con tests que crean 1000+ entregas y verifican tiempos de respuesta de las consultas principales.

- **Expected Output**:
  - Tests de rendimiento para:
    - findAll() con 1000 entregas
    - findAllPaginated() con 1000 entregas
    - findById() (debe ser rápido siempre)
    - Verificación de que los tiempos son aceptables

- **Testing/Validation**:
  - Crear datos de prueba (puede ser lento, usar beforeAll)
  - Medir tiempos de cada consulta
  - Verificar que están dentro de límites aceptables
  - Documentar resultados

- **Dependencies**:
  - Base de datos de test
  - Tiempo suficiente para ejecutar

- **Notes**:
  - Estos tests pueden ser opcionales o ejecutarse solo en CI
  - Documentar benchmarks esperados

---

## Resumen de Archivos a Crear

### Tests Unitarios

- `src/modulos/entrega/validators/entrega.validator.spec.ts`
- `src/modulos/entrega/mappers/mapper-dao/entrega.mapper.spec.ts`
- `src/modulos/entrega/mappers/mappers-response/entrega-responde.mapper.spec.ts`
- `src/modulos/entrega/entities/entrega.entity.spec.ts`
- `src/modulos/entrega/repository/entrega.dao.spec.ts`
- `src/modulos/entrega/services/entrega.service.spec.ts`
- `src/modulos/entrega/controllers/entrega.controller.spec.ts`

### Tests de Integración

- `src/modulos/entrega/__tests__/integration/entrega.integration.spec.ts`
- `src/modulos/entrega/__tests__/fixtures/entrega.fixtures.ts`
- `src/modulos/entrega/__tests__/mocks/entrega-dao.mock.ts`
- `src/modulos/entrega/__tests__/mocks/detalle-entrega-dao.mock.ts`
- `src/modulos/entrega/__tests__/mocks/validators.mock.ts`
- `src/modulos/entrega/__tests__/mocks/prisma.mock.ts`

### Tests E2E

- `test/entrega.e2e-spec.ts`

### Tests de Rendimiento (Opcional)

- `src/modulos/entrega/__tests__/performance/entrega.performance.spec.ts`

### Configuración

- `.env.test` (archivo de configuración de test)

---

## Comandos de Ejecución

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:cov

# Ejecutar solo tests del módulo de entrega
npm test -- entrega

# Ejecutar tests E2E
npm run test:e2e

# Ejecutar tests de integración específicos
npm test -- integration
```

---

## Criterios de Éxito

- ✅ Todos los tests unitarios pasan
- ✅ Cobertura de código > 80% para el módulo de entrega
- ✅ Tests de integración validan flujos completos
- ✅ Tests E2E validan endpoints HTTP
- ✅ Tests de rendimiento validan optimizaciones
- ✅ No hay problemas N+1 en consultas
- ✅ Todas las relaciones se incluyen correctamente

---

## Referencias

- [Documentación de NestJS Testing](https://docs.nestjs.com/fundamentals/testing)
- [Documentación de Jest](https://jestjs.io/docs/getting-started)
- [Documentación de Prisma Testing](https://www.prisma.io/docs/guides/testing)
- [Revisión del Módulo de Entrega](../project_review.md#25-módulo-de-entrega-recientemente-optimizado)
- [Diagrama de Arquitectura](../diagrams/architecture.md)
