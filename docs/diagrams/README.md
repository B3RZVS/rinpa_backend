# Diagramas de Arquitectura - RINPA Backend

Este directorio contiene los diagramas de arquitectura y diseño del sistema RINPA Backend, generados usando Mermaid.

## Diagramas Disponibles

### 1. Arquitectura General

**Archivo**: `architecture.md`

**Descripción**: Diagrama completo de la arquitectura del sistema mostrando:

- Todas las capas del sistema (HTTP, Controllers, Services, DAOs, Entities, ORM, Database)
- Módulos principales y sus componentes
- Flujo de datos y dependencias
- Componentes transversales

**Última actualización**: 2024-12-19

## Tipos de Diagramas

### Diagramas de Arquitectura

Muestran la estructura general del sistema, capas y componentes principales.

### Diagramas de Flujo de Datos

Muestran cómo fluyen los datos a través del sistema en operaciones específicas.

### Diagramas de Secuencia

Muestran la interacción temporal entre componentes en un flujo específico.

### Diagramas de Componentes

Muestran las relaciones y dependencias entre módulos y componentes.

## Cómo Ver los Diagramas

### En GitHub

Los diagramas Mermaid se renderizan automáticamente en GitHub cuando se visualiza el archivo `.md`.

### En VS Code

1. Instalar la extensión "Markdown Preview Mermaid Support"
2. Abrir el archivo `.md` con el diagrama
3. Usar el preview de Markdown (Ctrl+Shift+V)

### En Navegador

1. Usar herramientas online como [Mermaid Live Editor](https://mermaid.live/)
2. Copiar el código del diagrama
3. Pegar en el editor

### En el Proyecto

El proyecto incluye un script para renderizar markdown:

```bash
npm run render-md docs/diagrams/architecture.md
```

## Cómo Actualizar los Diagramas

### Cuando Agregar un Nuevo Módulo

1. Agregar el módulo en la capa correspondiente
2. Actualizar las conexiones con otros módulos
3. Documentar las dependencias

### Cuando Cambiar la Arquitectura

1. Actualizar el diagrama principal
2. Actualizar la fecha de última modificación
3. Documentar los cambios en el log de cambios

### Convenciones

- **Colores**: Usar colores consistentes para cada tipo de componente
- **Nombres**: Usar nombres descriptivos y consistentes
- **Flechas**: Indicar dirección de dependencia claramente
- **Agrupaciones**: Agrupar componentes relacionados en subgrafos

## Estructura de Archivos

```
docs/diagrams/
├── README.md              # Este archivo
├── architecture.md         # Arquitectura general del sistema
├── data-flow.md           # Flujos de datos (futuro)
├── sequence.md            # Diagramas de secuencia (futuro)
└── component-interaction.md # Interacciones entre componentes (futuro)
```

## Herramientas Recomendadas

- **Mermaid Live Editor**: https://mermaid.live/
- **VS Code Extension**: "Markdown Preview Mermaid Support"
- **GitHub**: Renderizado nativo de Mermaid

## Referencias

- [Documentación de Mermaid](https://mermaid.js.org/)
- [Sintaxis de Mermaid](https://mermaid.js.org/intro/syntax-reference.html)
- [Revisión del Proyecto](../project_review.md)

## Mantenimiento

Los diagramas deben actualizarse cuando:

- Se agreguen nuevos módulos
- Se cambie la arquitectura
- Se modifiquen dependencias importantes
- Se identifiquen inconsistencias

**Responsable**: Equipo de desarrollo  
**Frecuencia de revisión**: Mensual o cuando haya cambios arquitectónicos significativos
