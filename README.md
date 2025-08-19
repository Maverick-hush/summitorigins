
# Summit Origins - Tienda Web Estática

Una tienda web moderna y profesional para vender magnesia premium para escalada, optimizada para GitHub Pages y completamente estática.

## 🚀 Características

- **100% Estática**: Compatible con GitHub Pages, sin necesidad de backend
- **Responsive**: Diseño mobile-first que se adapta a todos los dispositivos
- **Rápida**: Optimizada para carga rápida y SEO
- **Fácil de editar**: Contenido y precios gestionados desde archivos JSON
- **Pagos modernos**: Integración con Stripe y MercadoPago
- **Analytics incluido**: Google Analytics 4 configurado

## 📁 Estructura del Proyecto

```
magnesia_store/
├── index.html                 # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos CSS responsivos
│   └── js/
│       └── main.js           # JavaScript principal
├── data/
│   └── config.json           # Configuración editable
├── pages/
│   ├── politicas.html        # Políticas de envío
│   ├── devoluciones.html     # Política de devoluciones
│   └── privacidad.html       # Política de privacidad
└── README.md                 # Este archivo
```

## 🛠️ Configuración Rápida

### 1. Editar Precios y Contenido

Edita el archivo `data/config.json` para cambiar:
- Precios y cantidades
- Enlaces de pago de Stripe y MercadoPago
- Información de contacto
- Testimonios y características
- IDs de analytics

```json
{
  "pricing": [
    {
      "quantity": 1,
      "price": 199,
      "shipping": 89,
      "stripeLink": "https://buy.stripe.com/tu_enlace_aqui",
      "mercadoPagoLink": "https://mercadopago.com/tu_enlace_aqui"
    }
  ]
}
```

### 2. Configurar Enlaces de Pago

#### Para Stripe:
1. Ve a tu dashboard de Stripe
2. Crea Payment Links para cada cantidad (1, 2, 3 unidades)
3. Copia las URLs en `config.json`

#### Para MercadoPago:
1. Accede a tu cuenta de MercadoPago
2. Crea botones de pago para cada cantidad
3. Copia las URLs en `config.json`

### 3. Configurar WhatsApp

Cambia el número de WhatsApp en `config.json`:
```json
"contact": {
  "whatsapp": {
    "number": "525512345678",
    "message": "Hola! Me interesa la magnesia Summit Origins"
  }
}
```

### 4. Configurar Google Analytics

1. Crea una propiedad en Google Analytics 4
2. Copia tu Measurement ID
3. Reemplaza `"GA_MEASUREMENT_ID"` en `config.json`

## 🚀 Despliegue en GitHub Pages

### Método 1: GitHub UI (Recomendado para principiantes)

1. **Crear repositorio:**
   - Ve a GitHub.com
   - Clic en "New repository"
   - Nombre: `magnesia-store` (o el que prefieras)
   - Marca "Public"
   - Clic en "Create repository"

2. **Subir archivos:**
   - En el repositorio nuevo, clic en "uploading an existing file"
   - Arrastra todos los archivos de la carpeta `magnesia_store`
   - Escribe un commit message: "Initial store setup"
   - Clic en "Commit changes"

3. **Activar GitHub Pages:**
   - Ve a Settings > Pages
   - En "Source", selecciona "Deploy from a branch"
   - En "Branch", selecciona "main"
   - En "Folder", selecciona "/ (root)"
   - Clic en "Save"

4. **Tu sitio estará disponible en:**
   ```
   https://tu-usuario.github.io/magnesia-store
   ```

### Método 2: Git Command Line

```bash
# Clonar el repositorio vacío
git clone https://github.com/tu-usuario/magnesia-store.git
cd magnesia-store

# Copiar archivos de la tienda
cp -r /ruta/a/magnesia_store/* .

# Hacer commit y push
git add .
git commit -m "Initial store setup"
git push origin main
```

## 🎨 Personalización

### Colores y Branding

En `assets/css/styles.css`, modifica las variables CSS:

```css
:root {
    --primary-color: #2563eb;      /* Color principal */
    --accent-color: #f59e0b;       /* Color de acento */
    --success: #10b981;            /* Color de éxito */
    --whatsapp: #25d366;           /* Color de WhatsApp */
}
```

### Imágenes del Producto

Las imágenes del producto están alojadas en CDN. Para cambiarlas:

1. Sube tus nuevas imágenes a un servicio como:
   - Cloudinary
   - ImgBB
   - GitHub (en tu repositorio)

2. Reemplaza las URLs en `index.html`:
```html
<img src="TU_NUEVA_URL_AQUI" alt="Descripción del producto">
```

### Logo y Favicon

Para cambiar el logo:
1. Reemplaza el SVG en la navegación (elemento `.nav-icon`)
2. Cambia el favicon en el `<head>` de `index.html`

## 📱 Funcionalidades

### Sistema de Precios Dinámico
- Los precios se cargan desde `config.json`
- Cálculo automático de precio por unidad
- Envío gratis automático para 3+ unidades

### Integración de Pagos
- Botones que redirigen a Stripe Payment Links
- Soporte para MercadoPago
- Tracking de intentos de pago

### WhatsApp Integration
- Botón directo con mensaje pre-configurado
- Enlaces contextuales desde diferentes secciones
- Números de teléfono editables desde config

### Analytics y Tracking
- Google Analytics 4 integrado
- Event tracking para pagos e interacciones
- Performance monitoring incluido

## 🔧 Mantenimiento

### Actualizar Precios
1. Edita `data/config.json`
2. Commit y push los cambios
3. Los precios se actualizarán automáticamente

### Cambiar Contenido
- **Testimonios**: Edita el array `testimonials` en `config.json`
- **Características**: Modifica `features` en `config.json`
- **Políticas**: Edita los archivos HTML en la carpeta `pages/`

### Monitoreo
- Usa Google Analytics para ver tráfico y conversiones
- Revisa la consola del navegador para errores
- Monitorea enlaces de pago rotos

## 🐛 Solución de Problemas

### Los precios no cargan
- Verifica que `config.json` tenga sintaxis válida
- Usa un validador JSON online
- Revisa la consola del navegador para errores

### Enlaces de pago no funcionan
- Confirma que las URLs de Stripe/MercadoPago sean correctas
- Verifica que los links estén activos en tus dashboards

### Problemas de CSS
- Limpia caché del navegador (Ctrl+F5)
- Verifica que `styles.css` se esté cargando correctamente

### Analytics no funciona
- Reemplaza `GA_MEASUREMENT_ID` con tu ID real
- Verifica en Google Analytics que está recibiendo datos

## 📞 Soporte

Si necesitas ayuda con la configuración:

1. **Revisa este README** completamente
2. **Verifica los archivos de ejemplo** incluidos
3. **Usa las herramientas de desarrollo** del navegador (F12)
4. **Consulta la documentación** de GitHub Pages, Stripe, o MercadoPago

## 📄 Licencia

Este proyecto es de uso libre. Puedes modificarlo y utilizarlo para tus propios productos.

---

## 🎯 Lista de Verificación Pre-Launch

- [ ] Precios actualizados en `config.json`
- [ ] Enlaces de Stripe configurados y probados
- [ ] Enlaces de MercadoPago configurados y probados
- [ ] Número de WhatsApp correcto
- [ ] Google Analytics ID configurado
- [ ] Imágenes del producto cargando correctamente
- [ ] Políticas de envío y devoluciones actualizadas
- [ ] Sitio probado en móvil y desktop
- [ ] GitHub Pages activado y funcionando
- [ ] Dominio personalizado configurado (opcional)

¡Tu tienda web está lista para vender! 🚀

## 🔄 Actualizaciones Futuras

Para mantener la tienda actualizada:

1. **Precios estacionales**: Actualiza `config.json` según temporadas
2. **Nuevos productos**: Duplica la estructura para productos adicionales
3. **Promociones**: Añade banners temporales en `index.html`
4. **A/B Testing**: Experimenta con diferentes precios y mensajes

---

¿Necesitas más funcionalidades? Considera estas mejoras:
- Newsletter signup
- Reviews de productos
- Sistema de descuentos
- Multi-idioma
- PWA (Progressive Web App)
