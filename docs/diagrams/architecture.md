# Arquitectura del Sistema RINPA Backend

Este documento describe la arquitectura completa del sistema RINPA Backend, mostrando las distintas capas, módulos y sus interacciones.

## Diagrama de Arquitectura General

```mermaid
graph TB
    subgraph "Capa de Presentación - HTTP/API"
        HTTP[Cliente HTTP<br/>Frontend/Postman]
        CORS[CORS Middleware]
        VALIDATION[ValidationPipe<br/>class-validator]
        EXCEPTION[AllExceptionsFilter<br/>Manejo Global de Errores]
    end

    subgraph "Capa de Controladores - Controllers"
        AUTH_CTRL[AuthController<br/>Autenticación]
        USER_CTRL[UserController<br/>Usuarios]
        CLIENTE_CTRL[ClienteController<br/>Clientes]
        PRODUCTO_CTRL[ProductoController<br/>Productos]
        ENTREGA_CTRL[EntregaController<br/>Entregas]
        PRECIO_CTRL[PrecioNaftaController<br/>Precios]
    end

    subgraph "Capa de Servicios - Services"
        AUTH_SVC[AuthService<br/>Lógica de Auth]
        USER_SVC[UserService<br/>Gestión Usuarios]
        CLIENTE_SVC[ClienteService<br/>Gestión Clientes]
        PRODUCTO_SVC[ProductoService<br/>Gestión Productos]
        ENTREGA_SVC[EntregaService<br/>Gestión Entregas]
        PRECIO_SVC[PrecioNaftaService<br/>Gestión Precios]
    end

    subgraph "Capa de Validación - Validators"
        AUTH_VAL[AuthValidator]
        USER_VAL[UserValidator]
        CLIENTE_VAL[ClienteValidator]
        PRODUCTO_VAL[ProductoValidator]
        ENTREGA_VAL[EntregaValidator]
    end

    subgraph "Capa de Acceso a Datos - DAOs"
        USER_DAO[UserDAO<br/>RolDAO]
        CLIENTE_DAO[ClienteDAO]
        PRODUCTO_DAO[ProductoDAO<br/>TipoProductoDAO<br/>MedidaDAO<br/>UnidadDAO]
        ENTREGA_DAO[EntregaDAO<br/>DetalleEntregaDAO<br/>PrecioNaftaDAO]
    end

    subgraph "Capa de Transformación - Mappers"
        USER_MAP[UserMapper<br/>RolMapper]
        CLIENTE_MAP[ClienteMapper]
        PRODUCTO_MAP[ProductoMapper<br/>TipoProductoMapper<br/>MedidaMapper<br/>UnidadMapper]
        ENTREGA_MAP[EntregaMapper<br/>DetalleEntregaMapper<br/>PrecioNaftaMapper]
    end

    subgraph "Capa de Entidades - Entities"
        USER_ENT[UserEntity<br/>RolEntity]
        CLIENTE_ENT[ClienteEntity]
        PRODUCTO_ENT[ProductoEntity<br/>TipoProductoEntity<br/>MedidaEntity<br/>UnidadEntity]
        ENTREGA_ENT[EntregaEntity<br/>DetalleEntregaEntity<br/>PrecioNaftaEntity]
    end

    subgraph "Capa de Persistencia - ORM"
        PRISMA[PrismaService<br/>ORM Client]
        PRISMA_SCHEMA[Prisma Schema<br/>Modelos]
    end

    subgraph "Base de Datos"
        POSTGRES[(PostgreSQL<br/>Base de Datos)]
    end

    subgraph "Componentes Transversales"
        JWT[JWT Strategy<br/>Passport]
        CONFIG[ConfigModule<br/>Variables de Entorno]
        PAGINATION[Pagination Utils<br/>query-builder]
    end

    %% Flujo principal HTTP → Controllers
    HTTP --> CORS
    CORS --> VALIDATION
    VALIDATION --> EXCEPTION
    EXCEPTION --> AUTH_CTRL
    EXCEPTION --> USER_CTRL
    EXCEPTION --> CLIENTE_CTRL
    EXCEPTION --> PRODUCTO_CTRL
    EXCEPTION --> ENTREGA_CTRL
    EXCEPTION --> PRECIO_CTRL

    %% Controllers → Services
    AUTH_CTRL --> AUTH_SVC
    USER_CTRL --> USER_SVC
    CLIENTE_CTRL --> CLIENTE_SVC
    PRODUCTO_CTRL --> PRODUCTO_SVC
    ENTREGA_CTRL --> ENTREGA_SVC
    PRECIO_CTRL --> PRECIO_SVC

    %% Services → Validators
    AUTH_SVC --> AUTH_VAL
    USER_SVC --> USER_VAL
    CLIENTE_SVC --> CLIENTE_VAL
    PRODUCTO_SVC --> PRODUCTO_VAL
    ENTREGA_SVC --> ENTREGA_VAL

    %% Services → DAOs
    AUTH_SVC --> USER_DAO
    USER_SVC --> USER_DAO
    CLIENTE_SVC --> CLIENTE_DAO
    PRODUCTO_SVC --> PRODUCTO_DAO
    ENTREGA_SVC --> ENTREGA_DAO
    PRECIO_SVC --> ENTREGA_DAO

    %% DAOs → Mappers
    USER_DAO --> USER_MAP
    CLIENTE_DAO --> CLIENTE_MAP
    PRODUCTO_DAO --> PRODUCTO_MAP
    ENTREGA_DAO --> ENTREGA_MAP

    %% Mappers → Entities
    USER_MAP --> USER_ENT
    CLIENTE_MAP --> CLIENTE_ENT
    PRODUCTO_MAP --> PRODUCTO_ENT
    ENTREGA_MAP --> ENTREGA_ENT

    %% DAOs → Prisma
    USER_DAO --> PRISMA
    CLIENTE_DAO --> PRISMA
    PRODUCTO_DAO --> PRISMA
    ENTREGA_DAO --> PRISMA

    %% Prisma → PostgreSQL
    PRISMA --> PRISMA_SCHEMA
    PRISMA_SCHEMA --> POSTGRES

    %% Componentes transversales
    AUTH_SVC --> JWT
    AUTH_CTRL --> JWT
    ENTREGA_SVC --> CLIENTE_SVC
    ENTREGA_SVC --> USER_SVC
    ENTREGA_SVC --> PAGINATION
    CLIENTE_SVC --> PAGINATION
    PRODUCTO_SVC --> PAGINATION
    CONFIG --> PRISMA
    CONFIG --> JWT

    %% Estilos
    classDef controller fill:#4A90E2,stroke:#2E5C8A,stroke-width:2px,color:#fff
    classDef service fill:#50C878,stroke:#2E7D4E,stroke-width:2px,color:#fff
    classDef dao fill:#FF6B6B,stroke:#C92A2A,stroke-width:2px,color:#fff
    classDef entity fill:#FFA500,stroke:#CC8500,stroke-width:2px,color:#fff
    classDef database fill:#9B59B6,stroke:#6C3483,stroke-width:2px,color:#fff
    classDef middleware fill:#3498DB,stroke:#21618C,stroke-width:2px,color:#fff

    class AUTH_CTRL,USER_CTRL,CLIENTE_CTRL,PRODUCTO_CTRL,ENTREGA_CTRL,PRECIO_CTRL controller
    class AUTH_SVC,USER_SVC,CLIENTE_SVC,PRODUCTO_SVC,ENTREGA_SVC,PRECIO_SVC service
    class USER_DAO,CLIENTE_DAO,PRODUCTO_DAO,ENTREGA_DAO dao
    class USER_ENT,CLIENTE_ENT,PRODUCTO_ENT,ENTREGA_ENT entity
    class POSTGRES database
    class CORS,VALIDATION,EXCEPTION,JWT,CONFIG middleware
```

## Descripción de Capas

### 1. Capa de Presentación (HTTP/API)
- **Responsabilidad**: Manejo de peticiones HTTP entrantes
- **Componentes**:
  - CORS Middleware: Control de acceso cross-origin
  - ValidationPipe: Validación automática de DTOs usando class-validator
  - AllExceptionsFilter: Captura y formatea todas las excepciones

### 2. Capa de Controladores (Controllers)
- **Responsabilidad**: Recepción de peticiones HTTP y enrutamiento
- **Módulos**:
  - **Auth**: Autenticación y generación de tokens JWT
  - **User**: Gestión de usuarios y roles
  - **Cliente**: CRUD de clientes
  - **Producto**: Gestión de productos, tipos, medidas y unidades
  - **Entrega**: Gestión de entregas, detalles y precios de nafta

### 3. Capa de Servicios (Services)
- **Responsabilidad**: Lógica de negocio y orquestación
- **Características**:
  - Validación de reglas de negocio
  - Coordinación entre DAOs
  - Transformación de datos cuando es necesario

### 4. Capa de Validación (Validators)
- **Responsabilidad**: Validación de reglas de negocio específicas
- **Ejemplos**:
  - Verificar existencia de entidades relacionadas
  - Validar unicidad de campos
  - Validar estados y transiciones

### 5. Capa de Acceso a Datos (DAOs)
- **Responsabilidad**: Abstracción del acceso a datos
- **Patrón**: Repository Pattern
- **Características**:
  - Interfaces (IDAO) para desacoplamiento
  - Implementaciones específicas de Prisma
  - Inclusión de relaciones para evitar N+1

### 6. Capa de Transformación (Mappers)
- **Responsabilidad**: Transformación entre modelos de datos
- **Tipos**:
  - **DAO Mappers**: Prisma Models → Entities
  - **Response Mappers**: Entities → DTOs de respuesta

### 7. Capa de Entidades (Entities)
- **Responsabilidad**: Representación del dominio
- **Características**:
  - Encapsulación de lógica de dominio
  - Getters/Setters controlados
  - Relaciones opcionales para optimización

### 8. Capa de Persistencia (ORM)
- **Responsabilidad**: Abstracción de la base de datos
- **Tecnología**: Prisma ORM
- **Características**:
  - Type-safe queries
  - Migrations automáticas
  - Schema centralizado

### 9. Base de Datos
- **Tecnología**: PostgreSQL
- **Características**:
  - Relaciones bien definidas
  - Soft delete implementado
  - Índices en campos críticos

## Componentes Transversales

### JWT Strategy
- Autenticación basada en tokens
- Integración con Passport
- Protección de rutas mediante guards

### ConfigModule
- Gestión centralizada de configuración
- Variables de entorno
- Validación de configuración

### Pagination Utils
- Utilidades reutilizables para paginación
- Soporte para filtros dinámicos
- Query builder genérico

## Flujo de Datos Típico

1. **Request HTTP** → Cliente envía petición
2. **Middleware** → CORS, validación, manejo de errores
3. **Controller** → Recibe petición, extrae parámetros
4. **Service** → Ejecuta lógica de negocio
5. **Validator** → Valida reglas de negocio
6. **DAO** → Consulta datos usando Prisma
7. **Mapper** → Transforma Prisma Model → Entity
8. **Service** → Retorna Entity
9. **Mapper** → Transforma Entity → Response DTO
10. **Controller** → Retorna respuesta HTTP

## Dependencias entre Módulos

```mermaid
graph LR
    AUTH[Auth Module] --> USER[User Module]
    ENTREGA[Entrega Module] --> CLIENTE[Cliente Module]
    ENTREGA --> USER
    ENTREGA --> AUTH
    PRODUCTO[Producto Module] --> |Independiente|
    CLIENTE --> |Independiente|
    USER --> |Independiente|
```

## Notas de Arquitectura

### Patrones Implementados
- **Layered Architecture**: Separación clara de responsabilidades
- **Repository Pattern**: Abstracción del acceso a datos
- **Dependency Injection**: Desacoplamiento mediante interfaces
- **DTO Pattern**: Separación entre modelos de dominio y transferencia
- **Mapper Pattern**: Transformación centralizada de datos

### Optimizaciones Aplicadas
- **Módulo Entrega**: Eliminado problema N+1 mediante includes de Prisma
- **Paginación**: Implementada en módulos principales
- **Soft Delete**: Mantiene historial sin borrar físicamente

### Inconsistencias Identificadas
- **Módulo User**: Implementa DDD (Domain-Driven Design) parcialmente
- **Resto de módulos**: Usan arquitectura en capas simple
- **Recomendación**: Estandarizar arquitectura o documentar decisión

## Referencias

- [Revisión Completa del Proyecto](../project_review.md)
- [Contexto Activo](../active_context.md)
- [Documentación de NestJS](https://docs.nestjs.com/)
- [Documentación de Prisma](https://www.prisma.io/docs)

