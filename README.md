# Sistema de Seguimiento de Vendedores

Sistema web desarrollado en Angular para el seguimiento de vendedores con vehículos asignados. La aplicación permite visualizar vendedores en un mapa de Google, gestionar su información y realizar seguimiento en tiempo real de sus ubicaciones.

---

## Descripción del Proyecto

- Mapa Interactivo: Visualización de vendedores en Google Maps con pines personalizados
- Lista de Vendedores: Panel lateral con información detallada de cada vendedor
- Gestión de Vendedores: Creación de nuevos vendedores mediante modal
- Seguimiento en Tiempo Real: Actualización automática de coordenadas
- Interfaz Responsiva: Diseño adaptable a diferentes dispositivos
- Navegación por Pestañas: Múltiples vistas organizadas

---

## Arquitectura Propuesta

### Visión General

La aplicación sigue una arquitectura modular basada en componentes y servicios, lo cual permite mantener el código organizado, reutilizable y escalable. Está estructurada siguiendo principios de separación de responsabilidades (SoC) y buenas prácticas recomendadas por Angular.

### Estructura por responsabilidades:

Presentación (UI): Componentes visuales ubicados en src/app/components, cada uno especializado en una función (mapa, listado, encabezado, sidebar, modal).

- Servicios (Data Layer): Ubicados en src/app/services, contienen la lógica de negocio, llamadas HTTP a la API y transformación de datos.

- Modelos: En src/app/models, definen interfaces fuertemente tipadas para mantener integridad de datos.

- Configuración y entorno: Gestión de variables en environments/ y conexión con Google Maps API.

- Routing: Control de vistas y navegación usando Angular Router con vistas por pestañas.

- Responsive Design: Implementado mediante clases personalizadas de SCSS y Bootstrap.

### Estructura del Proyecto

Estructura general de carpetas:

![Diseño desktop](./public/estructura-general.png.png)

Estructura carpeta src:

![Diseño desktop detalles](./public/estructura-src.png.png)

### Patrones de diseño

- **Singleton (Angular Services)**
- **Observer (RxJS)**
- **Factory Pattern (implícito en creación de pines)** 

---

## Tecnologías Utilizadas

### Frontend

- Angular 17+: Framework principal
- TypeScript: Lenguaje de programación
- Google Maps API: Integración de mapas
- Angular Material: Componentes UI
- RxJS: Programación reactiva
- Bootstrap: Estilos complementarios

### Herramientas y DevOps

- GitHub Actions (propuesto para CI/CD)

---

## Instalación y configuración

### Requisitos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v17 o superior)

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/cysorianop/gca-vendedores-app.git
cd gca-vendedores-app

# 2. Instala las dependencias
npm install

# 3. Configurar Google Maps API
- Obtener API key en Google Cloud Console
- Habilitar Maps JavaScript API
- Agregar la clave en src/index.html

# 4. Corre la app
ng serve

```

---

## Configuración del API

### Endpoints Disponibles

Base URL: http://52.188.225.26

1. Obtener lista de vendedores

GET /api/salesman
Retorna array de vendedores

2. Obtener vendedor específico

GET /api/salesman/{id}
Retorna información de un vendedor

3. Crear nuevo vendedor

POST /api/salesman
Crea un nuevo vendedor

---

### Modelo de datos

```bash
export interface Coordinates {
  latitude: number;
  longitude: number;
  height: number;
}

export interface Salesman {
  id: string;
  name: string;
  category: string;
  address: string;
  isActive: boolean;
  coordinates: Coordinates;
  photo: string;
  vehicle: string;
}

export interface CreateSalesmanRequest {
  id: string;
  name: string;
  category: string;
  address: string;
  photo: string;
  vehicle: string;
}

export enum SalesmanCategory {
  GERENTE = 'Gerente',
  VENDEDOR_SENIOR = 'Vendedor Senior',
  VENDEDOR_JUNIOR = 'Vendedor Junior',
  VENDEDOR = 'Vendedor'
}

export interface MarkerInfo {
  salesman: Salesman;
  marker?: google.maps.Marker;
  infoWindow?: google.maps.InfoWindow;
}

```

---

## Diseño de Referencia

Vista de escritorio:

![Diseño](./public/vista%20escritorio.png)


Vista responsive:

![Diseño](./public/vista%20responsive.png)

## Cómo se resolvió el reto

1. Integración de Google Maps API
Reto: Integrar correctamente el mapa de Google con múltiples pines personalizados y comportamiento interactivo.
Solución:

Se utilizó el paquete @angular/google-maps, que ofrece componentes ya integrados para Angular.

Se creó una lógica dinámica para asignar pines personalizados (rojo, azul, verde, amarillo) según la categoría del vendedor.

Se manejaron los eventos del mapa (markerClick, infoWindow) para brindar una experiencia interactiva fluida.

2. Actualización en Tiempo Real
Reto: Mantener las ubicaciones de los vendedores actualizadas sin recargar la página.
Solución:

Se implementó un sistema de polling utilizando setInterval() que cada 30 segundos hace una nueva petición a la API (getSalesmen()).

Al recibir la nueva data, se actualizan los marcadores en el mapa sin recargar la aplicación.

Se manejó limpieza de memoria para evitar múltiples intervalos o fugas.

---

## Cuellos de botella encontrados

- Integración de Google Maps con API Key protegida por entorno.

- Gestión y actualización de múltiples ubicaciones dinámicamente.

- Validaciones de formularios reactivas con retroalimentación visual.

- Control de estado y diseño responsivo con Angular Material y Bootstrap combinados.

- Modularidad y limpieza del código para facilitar pruebas unitarias.


# Contribución

- Crea una rama: feature/tu-cambio
- Haz tus cambios con tests
- Crea un Pull Request con descripción clara

# Estándares
- Código limpio
- Commits descriptivos
