# Portal Estudiantil UNAB

Portal web moderno para estudiantes de la Universidad Autónoma de Bucaramanga (UNAB) que permite gestionar horas libres, eventos académicos, cursos y información personal de manera integrada.

## 🚀 Características Principales

### 📊 Dashboard Personalizado
- **Resumen académico** con progreso de horas libres
- **Visualización de cursos** y calificaciones actuales
- **Eventos registrados** y próximos
- **Anuncios** y noticias universitarias

### 👤 Gestión de Perfil
- **Información personal** editable
- **Datos académicos** (semestre, programa, promedio)
- **Contactos de emergencia**
- **Configuración de cuenta**

### 📅 Sistema de Eventos
- **Exploración de eventos** con filtros por categoría
- **Registro automático** en eventos universitarios
- **Gestión de eventos registrados**
- **Seguimiento de horas libres** otorgadas por eventos

### ⏰ Seguimiento de Horas Libres
- **Progreso visual** con barras interactivas
- **Cálculo automático** de horas restantes
- **Historial detallado** de actividades registradas

### 📚 Gestión Académica
- **Visualización de cursos** y calificaciones
- **Horario semanal** con opción de impresión
- **Seguimiento del rendimiento académico**

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **React Router 7.5.3** - Enrutamiento del lado del cliente y servidor
- **TypeScript 5.8.3** - Tipado estático
- **Tailwind CSS 4.1.6** - Framework de CSS utilitario
- **Headless UI 2.2.2** - Componentes accesibles sin estilos
- **Heroicons 2.2.0** - Iconos SVG

### Herramientas de Desarrollo
- **Vite 6.3.3** - Bundler y servidor de desarrollo
- **ESLint & Prettier** - Linting y formateo de código
- **Docker** - Contenedorización

### Arquitectura
- **SSR (Server-Side Rendering)** habilitado por defecto
- **Rutas protegidas** con sistema de autenticación
- **Responsive Design** para móvil y desktop
- **PWA-ready** con manifest y service workers

## 🏗️ Estructura del Proyecto

```
app/
├── components/          # Componentes reutilizables
│   ├── Card.tsx        # Componente de tarjeta
│   ├── Footer.tsx      # Pie de página
│   ├── Header.tsx      # Encabezado
│   ├── Modal.tsx       # Ventanas modales
│   ├── Navigation.tsx  # Navegación principal
│   ├── ProgressBar.tsx # Barra de progreso
│   ├── Toast.tsx       # Notificaciones
│   └── ...
├── context/            # Contextos de React
│   └── AuthContext.tsx # Contexto de autenticación
├── data/              # Datos estáticos
│   └── user.json      # Datos de usuario mock
├── layouts/           # Layouts de página
│   ├── AuthLayout.tsx # Layout de autenticación
│   ├── MainLayout.tsx # Layout principal
│   └── PublicLayout.tsx
├── pages/             # Páginas de la aplicación
│   ├── Dashboard.tsx  # Panel principal
│   ├── Events.tsx     # Eventos disponibles
│   ├── Profile.tsx    # Perfil de usuario
│   └── ...
├── routes/            # Definición de rutas
│   ├── protected/     # Rutas protegidas
│   └── public/        # Rutas públicas
├── services/          # Servicios de datos
│   ├── authService.ts # Servicio de autenticación
│   └── eventService.ts# Servicio de eventos
└── app.css           # Estilos globales
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 20+ (recomendado usar la versión LTS)
- npm o yarn
- Docker (opcional para contenedorización)

### Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd unab-student-portal
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con las configuraciones necesarias
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Construcción para Producción

```bash
# Generar build de producción
npm run build

# Iniciar servidor de producción
npm run start
```

### Despliegue con Docker

```bash
# Construir imagen
docker build -t unab-portal .

# Ejecutar contenedor
docker run -p 3000:3000 unab-portal
```

## 🔐 Sistema de Autenticación

### Credenciales de Prueba
- **Usuario:** `student3`
- **Contraseña:** `unab123`

### Funcionamiento
- **Autenticación basada en sesión** con sessionStorage
- **Rutas protegidas** que requieren autenticación
- **Redirección automática** después del login
- **Contexto global** para gestión del estado de autenticación

## 🎨 Personalización de Estilos

### Colores UNAB
```css
:root {
  --unab-blue: #003b71;    /* Azul institucional */
  --unab-yellow: #ffd200;  /* Amarillo institucional */
  --unab-gold: #d4a017;    /* Dorado */
  --unab-gray: #58595b;    /* Gris */
}
```

### Configuración de Tailwind
El proyecto utiliza Tailwind CSS 4.x con configuración personalizada en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      "unab-blue": "#003b71",
      "unab-yellow": "#ffd200",
      // ...
    }
  }
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

### Características Mobile
- **Navegación inferior** en dispositivos móviles
- **Menú hamburguesa** para navegación lateral
- **Optimización táctil** para mejor experiencia
- **Layouts adaptivos** según el tamaño de pantalla

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests de integración
npm run test:integration
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run typecheck    # Verificación de tipos TypeScript
npm run lint         # Linting del código
npm run format       # Formateo del código
```

## 🌐 Configuración de Rutas

### Rutas Públicas
- `/` - Landing page
- `/login` - Página de autenticación

### Rutas Protegidas
- `/dashboard` - Panel principal (requiere autenticación)
- `/profile` - Perfil de usuario
- `/events` - Eventos disponibles
- `/my-events` - Mis eventos registrados
- `/hours` - Horas libres
- `/courses` - Cursos y calificaciones
- `/schedule` - Horario semanal

## 🔒 Seguridad

### Medidas Implementadas
- **Rutas protegidas** con verificación de autenticación
- **Validación de formularios** en cliente y servidor
- **Sanitización de datos** de entrada
- **Headers de seguridad** configurados
- **HTTPS** recomendado en producción

### Recomendaciones de Producción
- Implementar autenticación JWT real
- Configurar CORS apropiadamente
- Usar variables de entorno para secretos
- Implementar rate limiting
- Configurar CSP (Content Security Policy)

## 🚀 Despliegue

### Plataformas Recomendadas
- **Vercel** (recomendado para SSR)
- **Netlify** 
- **Railway**
- **Render**
- **AWS ECS** (con Docker)
- **Google Cloud Run**

### Variables de Entorno de Producción
```bash
NODE_ENV=production
API_URL=https://api.unab.edu.co
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```

## 🤝 Contribución

### Proceso de Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Add: nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de Código
- **TypeScript** para tipado estático
- **ESLint** y **Prettier** para consistencia
- **Convenciones de nomenclatura** camelCase para variables, PascalCase para componentes
- **Comentarios JSDoc** para funciones públicas

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

**Universidad Autónoma de Bucaramanga (UNAB)**
- Facultad de Ingeniería
- Programa de Ingeniería de Sistemas

## 📞 Soporte

Para soporte técnico o consultas:
- **Email:** soporte.ti@unab.edu.co
- **Teléfono:** +57 (7) 643 6111
- **Dirección:** Av. 42 No. 48-11, Bucaramanga, Santander

## 🔄 Versiones

### v1.0.0 (Actual)
- ✅ Sistema de autenticación básico
- ✅ Gestión de horas libres
- ✅ Registro de eventos
- ✅ Perfil de usuario
- ✅ Dashboard interactivo
- ✅ Responsive design

### Próximas Versiones
- 🔄 v1.1.0 - Integración con API real
- 🔄 v1.2.0 - Notificaciones push
- 🔄 v1.3.0 - Calendario académico
- 🔄 v2.0.0 - Sistema de calificaciones en tiempo real

---

*Desarrollado con ❤️ para la comunidad estudiantil de la UNAB*
