<!-- CONFIGURACIÓN DE ESTILOS PROFESIONALES PARA VISUALIZACIÓN Y TRABAJO DE FIN DE GRADO -->
<style>
  /* CONFIGURACIÓN GENERAL PROFESIONAL */
  :root {
    --primary-color: #1a365d;
    --secondary-color: #2b6cb0;
    --text-color: #2d3748;
    --light-bg: #f7fafc;
    --border-color: #e2e8f0;
    --accent-color: #3182ce;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: var(--text-color);
    background-color: #f7fafc;
    margin: 0;
    padding: 0;
  }

  /* Contenedor principal para visualización en pantalla */
  .document-container {
    max-width: 900px;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 50px 70px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  /* Encabezados */
  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    font-weight: 700;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    page-break-after: avoid;
  }

  h1 {
    font-size: 24pt;
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 8px;
    margin-top: 0;
  }

  h2 {
    font-size: 18pt;
    border-bottom: 1.5px solid var(--border-color);
    padding-bottom: 6px;
    margin-top: 40px;
  }

  h3 {
    font-size: 14pt;
    color: var(--secondary-color);
  }

  p, li {
    text-align: justify;
  }

  /* Listas */
  ul, ol {
    padding-left: 20px;
    margin-bottom: 20px;
  }

  li {
    margin-bottom: 8px;
  }

  /* Tablas profesionales */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 25px 0;
    page-break-inside: avoid;
    font-size: 10pt;
  }

  th, td {
    border: 1px solid #cbd5e0;
    padding: 10px 14px;
    text-align: left;
  }

  th {
    background-color: #ebf8ff;
    color: var(--primary-color);
    font-weight: 600;
  }

  tr:nth-child(even) {
    background-color: #fcfdfe;
  }

  /* Código */
  pre, code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 9.5pt;
    background-color: #f7fafc;
    border-radius: 6px;
  }

  code {
    padding: 2px 6px;
    border: 1px solid var(--border-color);
    background-color: #f7fafc;
    color: #c53030;
  }

  pre {
    padding: 15px;
    border: 1px solid var(--border-color);
    overflow-x: auto;
    margin-bottom: 25px;
    page-break-inside: avoid;
  }

  pre code {
    padding: 0;
    border: none;
    background-color: transparent;
    color: inherit;
  }

  /* Bloques de notas */
  blockquote {
    margin: 20px 0;
    padding: 15px 20px;
    background-color: #f8fafc;
    border-left: 4px solid var(--secondary-color);
    color: #4a5568;
    border-radius: 0 6px 6px 0;
    page-break-inside: avoid;
  }

  blockquote p {
    margin: 0;
  }

  /* Enlaces */
  a {
    color: var(--secondary-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }

  /* Salto de página para PDF */
  .page-break {
    page-break-after: always;
    break-after: page;
  }

  /* Portada elegante */
  .portada {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 80vh;
    padding: 60px 0;
    text-align: center;
    box-sizing: border-box;
  }

  .portada-header {
    font-size: 13pt;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 2px;
    line-height: 1.5;
  }

  .portada-title-container {
    margin: auto 0;
  }

  .portada-title {
    font-size: 40pt;
    font-weight: 800;
    color: var(--primary-color);
    margin: 0;
    line-height: 1.1;
    letter-spacing: 1px;
    border-bottom: none !important;
  }

  .portada-subtitle {
    font-size: 16pt;
    color: var(--secondary-color);
    margin-top: 20px;
    font-weight: 400;
    max-width: 650px;
    line-height: 1.4;
    margin-left: auto;
    margin-right: auto;
  }

  .portada-divider {
    width: 100px;
    height: 4px;
    background-color: var(--secondary-color);
    margin: 30px auto;
    border-radius: 2px;
  }

  .portada-project-type {
    font-size: 13pt;
    color: #4a5568;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .portada-footer {
    width: 100%;
    border-top: 2px solid var(--border-color);
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    font-size: 10.5pt;
    color: #4a5568;
  }

  .portada-author-col {
    text-align: left;
    line-height: 1.6;
  }

  .portada-date-col {
    text-align: right;
    line-height: 1.6;
  }

  /* ESTILOS DE LOS ESQUEMAS VISUALES EN HTML */
  
  /* 1. Stack Tecnológico */
  .tech-stack-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 25px 0;
    page-break-inside: avoid;
  }
  .tech-stack-layer {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 5px solid var(--secondary-color);
    border-radius: 6px;
    padding: 15px 20px;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .tech-stack-layer:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  .tech-stack-layer-title {
    font-weight: 700;
    font-size: 11pt;
    color: var(--primary-color);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .tech-stack-layer-desc {
    font-size: 10pt;
    color: #4a5568;
    font-weight: 500;
  }
  .tech-stack-layer-subdesc {
    font-size: 9pt;
    color: #718096;
    margin-top: 2px;
  }

  /* 2. Arquitectura de Contenedores Docker */
  .docker-compose-container {
    background-color: #f8fafc;
    border: 2px dashed #cbd5e0;
    border-radius: 8px;
    padding: 20px;
    margin: 25px 0;
    page-break-inside: avoid;
  }
  .docker-compose-title {
    font-weight: 700;
    font-size: 12pt;
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .docker-containers-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  @media (max-width: 768px) {
    .docker-containers-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 480px) {
    .docker-containers-grid {
      grid-template-columns: 1fr;
    }
  }
  .docker-container-box {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-top: 4px solid #4a5568;
    border-radius: 6px;
    padding: 15px 10px;
    text-align: center;
    position: relative;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .docker-container-box:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  }
  .edge-service { border-top-color: #3182ce; }
  .app-service { border-top-color: #38a169; }
  .db-service { border-top-color: #dd6b20; }
  .admin-service { border-top-color: #805ad5; }

  .container-badge {
    display: inline-block;
    font-size: 7.5pt;
    font-weight: 700;
    background-color: #edf2f7;
    color: #4a5568;
    padding: 2px 6px;
    border-radius: 12px;
    margin-bottom: 8px;
  }
  .container-title {
    font-weight: 700;
    font-size: 11pt;
    color: #2d3748;
    margin-bottom: 5px;
  }
  .container-desc {
    font-size: 8.5pt;
    color: #718096;
    line-height: 1.3;
    margin-bottom: 8px;
    min-height: 24px;
  }
  .container-tech {
    font-size: 8pt;
    font-weight: 600;
    color: #4a5568;
    border-top: 1px solid #edf2f7;
    padding-top: 6px;
  }
  .docker-network-bar {
    margin-top: 20px;
    background-color: #edf2f7;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
    font-size: 9pt;
    font-weight: 600;
    color: #4a5568;
  }

  /* 3. Componentes Jerárquicos */
  .component-tree {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 20px;
    margin: 25px 0;
    font-family: inherit;
    page-break-inside: avoid;
  }
  .tree-node {
    margin-left: 20px;
    position: relative;
    padding-left: 15px;
    border-left: 1px solid #cbd5e0;
    margin-top: 6px;
  }
  .tree-node.root {
    margin-left: 0;
    padding-left: 0;
    border-left: none;
  }
  .tree-node::before {
    content: "";
    position: absolute;
    top: 12px;
    left: 0;
    width: 10px;
    height: 1px;
    background-color: #cbd5e0;
  }
  .tree-node.root::before {
    display: none;
  }
  .node-name {
    font-weight: 700;
    color: var(--primary-color);
  }
  .node-file {
    font-size: 8.5pt;
    color: #718096;
    font-family: monospace;
    background-color: #edf2f7;
    padding: 1px 5px;
    border-radius: 4px;
  }
  .node-tag {
    font-size: 7.5pt;
    font-weight: 600;
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 1px 5px;
    border-radius: 4px;
    margin-left: 5px;
  }
  .tree-children {
    margin-top: 4px;
  }
  .tree-node.leaf {
    color: #4a5568;
    font-size: 9.5pt;
  }

  /* 4. Base de Datos Relacional */
  .db-schema-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 25px;
    margin: 25px 0;
    page-break-inside: avoid;
  }
  @media (max-width: 768px) {
    .db-schema-container {
      flex-direction: column;
      gap: 15px;
    }
    .db-schema-connectors {
      transform: rotate(90deg);
      margin: 10px 0;
    }
  }
  .db-table-card {
    background-color: #ffffff;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    width: 240px;
    flex-shrink: 0;
  }
  .db-table-title {
    background-color: var(--secondary-color);
    color: #ffffff;
    font-weight: 700;
    font-size: 10pt;
    padding: 8px 12px;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .db-table-columns {
    padding: 8px 0;
  }
  .db-column {
    font-size: 8.5pt;
    font-family: monospace;
    padding: 4px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #edf2f7;
  }
  .db-column:last-child {
    border-bottom: none;
  }
  .db-column-left {
    display: flex;
    align-items: center;
  }
  .db-column-left span {
    font-size: 7pt;
    font-weight: 700;
    padding: 1px 4px;
    border-radius: 3px;
    margin-right: 6px;
  }
  .db-column.pk span { background-color: #ebf8ff; color: #2b6cb0; }
  .db-column.uk span { background-color: #feebc8; color: #dd6b20; }
  .db-column.fk span { background-color: #e6fffa; color: #319795; }
  .col-type {
    color: #a0aec0;
    font-size: 8pt;
  }
  .db-schema-connectors {
    font-weight: 700;
    color: #718096;
    font-size: 9pt;
    text-align: center;
  }
  .db-tables-subgroup {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* 5. Fases del Proyecto */
  .project-phases-container {
    display: flex;
    gap: 12px;
    margin: 25px 0;
    page-break-inside: avoid;
  }
  @media (max-width: 768px) {
    .project-phases-container {
      flex-direction: column;
    }
  }
  .phase-step {
    flex: 1;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 15px;
    text-align: center;
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .phase-step:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  }
  .phase-num {
    width: 26px;
    height: 26px;
    background-color: var(--secondary-color);
    color: #ffffff;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 10px auto;
    font-size: 10pt;
  }
  .phase-name {
    font-size: 9pt;
    font-weight: 700;
    color: var(--primary-color);
    line-height: 1.3;
  }

  /* AJUSTES ESPECÍFICOS DE IMPRESIÓN */
  @media print {
    body {
      background-color: #ffffff;
      color: #000000;
      font-size: 11pt;
    }

    .document-container {
      margin: 0;
      padding: 0;
      box-shadow: none;
      border: none;
      max-width: 100%;
    }

    .portada {
      height: 95vh;
      padding: 2cm 0;
    }

    pre, code, blockquote, table, tr, img, 
    .tech-stack-layer, .docker-compose-container, .docker-container-box,
    .component-tree, .db-schema-container, .db-table-card, .phase-step {
      page-break-inside: avoid;
    }
  }
</style>

<!-- ENVOLTORIO PARA DISEÑO PROFESIONAL EN PANTALLA Y PDF -->
<div class="document-container">

<!-- PORTADA DE LA DOCUMENTACIÓN -->
<div class="portada">
  <div class="portada-header">
    PROYECTO FIN DE CICLO<br>
    TÉCNICO SUPERIOR EN DESARROLLO DE APLICACIONES WEB (DAW)
  </div>
  
  <div class="portada-title-container">
    <div class="portada-title">MR FINANCE</div>
    <div class="portada-subtitle">Sistema Multi-contenedor de Gestión y Control de Finanzas Personales con Autenticación de Doble Factor y Proxy Inverso Seguro</div>
    <div class="portada-divider"></div>
    <div class="portada-project-type">DOCKER — REACT 19 — EXPRESS 5 — MYSQL 8 — NGINX</div>
  </div>

  <div class="portada-footer">
    <div class="portada-author-col">
      <strong>Autor:</strong> Carlos Pilar<br>
      <strong>Ciclo:</strong> 2º de Desarrollo de Aplicaciones Web
    </div>
    <div class="portada-date-col">
      <strong>Fecha:</strong> Mayo 2026<br>
      <strong>Lugar:</strong> Educacyl — Palencia, España
    </div>
  </div>
</div>

<div class="page-break"></div>

<!-- ÍNDICE GENERAL -->

## Índice General

1. [Descripción del Proyecto](#1-descripción-del-proyecto)
2. [Manual de Instalación](#2-manual-de-instalación)
3. [Manual de Configuración del Servidor](#3-manual-de-configuración-del-servidor)
4. [Manual de Usuario](#4-manual-de-usuario)
5. [Documentación Técnica](#5-documentación-técnica)
6. [Referencia de la API](#6-referencia-de-la-api)
7. [Base de Datos](#7-base-de-datos)
8. [Solución de Problemas](#8-solución-de-problemas)
9. [Metodología y Planificación del Proyecto](#9-metodología-y-planificación-del-proyecto)
10. [Medidas de Seguridad Implementadas](#10-medidas-de-seguridad-implementadas)
11. [Pruebas y Control de Calidad](#11-pruebas-y-control-de-calidad)
12. [Conclusiones y Trabajo Futuro](#12-conclusiones-y-trabajo-futuro)
13. [Apéndice: Mapa de Puertos](#apéndice-mapa-de-puertos)

<div class="page-break"></div>

## 1. Descripción del Proyecto

### 1.1 ¿Qué es MR Finance?

**MR Finance** es una aplicación web avanzada de gestión de finanzas personales que permite a los usuarios registrar, visualizar y controlar exhaustivamente sus ingresos y gastos. La aplicación ofrece una interfaz moderna e intuitiva con gráficos interactivos y adaptativos para el seguimiento de la evolución financiera personal.

### 1.2 Características Principales

| Característica                      | Descripción                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| **Registro de movimientos**         | Registra ingresos y gastos con categorías personalizadas                              |
| **Gráficos interactivos**           | Visualiza la evolución de tu saldo con gráficos de área filtrable por periodo         |
| **Categorías personalizadas**       | Crea y gestiona tus propias categorías (Alimentación, Transporte, Ocio, etc.)         |
| **Autenticación segura**            | Contraseñas encriptadas de forma irreversible con el algoritmo bcrypt                 |
| **Verificación en dos pasos (2FA)** | Autenticación de doble factor vía correo electrónico mediante códigos de un solo uso  |
| **Perfil de usuario**               | Foto de perfil personalizable en formato PNG y metadatos de cuenta                    |
| **Diseño responsive**               | Interfaz adaptativa optimizada para móviles, tablets y escritorios de alta resolución |
| **Despliegue con Docker**           | Arquitectura containerizada y orquestada para garantizar portabilidad                 |
| **Certificados SSL**                | HTTPS automático y seguro con Let's Encrypt gestionado mediante Certbot               |

### 1.3 Stack Tecnológico

<div class="tech-stack-container">
  <div class="tech-stack-layer">
    <div class="tech-stack-layer-title">Cliente (Frontend)</div>
    <div class="tech-stack-layer-desc">React 19 + TypeScript + Vite 8 + TailwindCSS 4</div>
    <div class="tech-stack-layer-subdesc">Librerías de UI: Shadcn/ui + Recharts + Axios</div>
  </div>
  <div class="tech-stack-layer">
    <div class="tech-stack-layer-title">Servidor (Backend)</div>
    <div class="tech-stack-layer-desc">Node.js 24 + Express 5 + MySQL2</div>
    <div class="tech-stack-layer-subdesc">Librerías de seguridad y utilidades: bcrypt + Nodemailer + Multer</div>
  </div>
  <div class="tech-stack-layer">
    <div class="tech-stack-layer-title">Base de Datos</div>
    <div class="tech-stack-layer-desc">MySQL 8 (Motor Relacional e Integridad Referencial)</div>
  </div>
  <div class="tech-stack-layer">
    <div class="tech-stack-layer-title">Proxy y Capa SSL</div>
    <div class="tech-stack-layer-desc">Nginx + Certbot (Let's Encrypt para cifrado en tránsito HTTPS)</div>
  </div>
  <div class="tech-stack-layer">
    <div class="tech-stack-layer-title">Infraestructura de Despliegue</div>
    <div class="tech-stack-layer-desc">Docker + Docker Compose (Entornos Aislados Multi-contenedor)</div>
  </div>
</div>

### 1.4 Arquitectura de Contenedores

La aplicación se compone de **4 contenedores Docker** orquestados con Docker Compose:

<div class="docker-compose-container">
  <div class="docker-compose-title">Docker Compose (mr_finance)</div>
  <div class="docker-containers-grid">
    
    <div class="docker-container-box edge-service">
      <div class="container-badge">Puertos 80 / 443</div>
      <div class="container-title">nginx</div>
      <div class="container-desc">Proxy Inverso y gestión de cifrado HTTPS SSL</div>
      <div class="container-tech">Nginx + Certbot</div>
    </div>
    
    <div class="docker-container-box app-service">
      <div class="container-badge">Puertos 5173 / 8081</div>
      <div class="container-title">app</div>
      <div class="container-desc">Servidor de desarrollo y API del backend</div>
      <div class="container-tech">Node.js + React + Express</div>
    </div>
    
    <div class="docker-container-box db-service">
      <div class="container-badge">Puerto 3306</div>
      <div class="container-title">db</div>
      <div class="container-desc">Motor relacional de base de datos</div>
      <div class="container-tech">MySQL 8</div>
    </div>
    
    <div class="docker-container-box admin-service">
      <div class="container-badge">Puerto 8080</div>
      <div class="container-title">phpmyadmin</div>
      <div class="container-desc">Administración visual y mantenimiento de datos</div>
      <div class="container-tech">phpMyAdmin</div>
    </div>
    
  </div>
  <div class="docker-network-bar">Red Interna de Comunicación Aislada: dev_net (bridge)</div>
</div>

| Contenedor     | Imagen                        | Puertos               | Descripción                     |
| -------------- | ----------------------------- | --------------------- | ------------------------------- |
| `node_app2`    | node:24-alpine (build custom) | 3000, 5173, 8081, 587 | Frontend Vite + Backend Express |
| `nginx_server` | jonasal/nginx-certbot:latest  | 80, 443               | Proxy inverso + SSL automático  |
| `mysql2`       | mysql:latest                  | 3306                  | Base de datos MySQL             |
| `phpmyAdmin2`  | phpmyadmin:latest             | 8080                  | Administración visual de la BD  |

<div class="page-break"></div>

## 2. Manual de Instalación

### 2.1 Requisitos Previos

#### Software necesario

| Software           | Versión mínima                     | Enlace de descarga                                                       |
| ------------------ | ---------------------------------- | ------------------------------------------------------------------------ |
| **Docker Desktop** | 24.0+                              | [docker.com/get-docker](https://www.docker.com/products/docker-desktop/) |
| **Docker Compose** | v2.0+ (incluido en Docker Desktop) | Incluido en Docker Desktop                                               |
| **Git**            | 2.30+                              | [git-scm.com](https://git-scm.com/downloads)                             |

#### Requisitos del sistema

| Recurso               | Mínimo                                      | Recomendado                              |
| --------------------- | ------------------------------------------- | ---------------------------------------- |
| **RAM**               | 4 GB                                        | 8 GB                                     |
| **Disco**             | 5 GB libres                                 | 10 GB libres                             |
| **CPU**               | 2 núcleos                                   | 4 núcleos                                |
| **Sistema Operativo** | Windows 10/11 Pro, macOS 12+, Ubuntu 20.04+ | Windows 11 Pro, macOS 14+, Ubuntu 22.04+ |

> **Nota Windows:** Docker Desktop requiere **WSL 2** (Windows Subsystem for Linux 2) activado. Docker Desktop lo configura automáticamente durante la instalación.

### 2.2 Instalación paso a paso

#### Paso 1: Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO> DockerMrFinance
cd DockerMrFinance
```

#### Paso 2: Verificar la estructura del proyecto

Asegúrate de que el directorio tiene la siguiente estructura:

```
DockerMrFinance/
├── Dockerfile                 # Imagen personalizada de Node.js
├── docker-compose.yml         # Orquestación de contenedores
├── entrypoint.sh              # Script de arranque del contenedor app
├── nginx.conf                 # Configuración del proxy Nginx
├── comandoStartSrv            # Comando rápido de inicio manual
├── app/                       # Código fuente de la aplicación
│   └── mrfinance/
│       ├── client/            # Frontend (React + Vite)
│       │   ├── src/
│       │   │   ├── auth/      # Componentes de autenticación
│       │   │   ├── dashboard/ # Componentes del panel principal
│       │   │   ├── components/# Componentes UI (Shadcn)
│       │   │   ├── Login.tsx  # Página principal de login
│       │   │   └── main.tsx   # Punto de entrada
│       │   ├── public/
│       │   │   └── fotosDePerfil/  # Fotos de perfil de usuarios
│       │   └── vite.config.ts
│       └── server/            # Backend (Express)
│           ├── server.js      # Servidor principal con API REST
│           ├── authService.js # Servicio de autenticación 2FA
│           ├── mailer.js      # Configuración de envío de correos
│           └── .env           # Variables de entorno del servidor
└── db/
    └── init/
        └── 01_MrFinanceV2.sql # Script de inicialización de la BD
```

#### Paso 3: Construir y levantar los contenedores

```bash
docker compose up --build
```

> **Información:** La primera ejecución tardará unos minutos ya que Docker necesita descargar las imágenes base, compilar la imagen personalizada, instalar dependencias npm e inicializar la base de datos con el script SQL provisto.

#### Paso 4: Verificar que todos los contenedores están corriendo

```bash
docker compose ps
```

Deberías ver algo similar a:

```
NAME              SERVICE      STATUS
mysql2            db           running (healthy)
node_app2         app          running
nginx_server      nginx        running
phpmyAdmin2       phpmyadmin   running
```

#### Paso 5: Acceder a la aplicación

| Servicio                  | URL                            | Descripción                                       |
| ------------------------- | ------------------------------ | ------------------------------------------------- |
| **Frontend (desarrollo)** | http://localhost:5173          | Interfaz de usuario con HMR                       |
| **Backend API**           | http://localhost:8081          | API REST directa                                  |
| **phpMyAdmin**            | http://localhost:8080          | Administración de la base de datos                |
| **Nginx (producción)**    | https://mrfinance.freemyip.com | Producción con SSL (requiere dominio configurado) |

### 2.3 Usuarios de prueba precargados

La base de datos se inicializa con los siguientes usuarios de ejemplo:

| Nombre     | Email              | Contraseña | 2FA         |
| ---------- | ------------------ | ---------- | ----------- |
| Ana García | `ana@example.com`  | `1231`     | Desactivado |
| Luis Pérez | `luis@example.com` | `123`      | Activado    |
| Pepe       | `pepe@example.com` | `pepe`     | Desactivado |

> **Advertencia:** Estos usuarios son únicamente para pruebas. Las contraseñas se migrarán automáticamente a formato bcrypt seguro tras el primer inicio de sesión del usuario correspondiente.

### 2.4 Detener la aplicación

```bash
# Detener los contenedores (mantiene los datos intactos)
docker compose stop

# Detener y eliminar los contenedores (mantiene los volúmenes de datos)
docker compose down

# Detener, eliminar contenedores Y eliminar los datos (Advertencia: DESTRUCTIVO)
docker compose down -v
```

<div class="page-break"></div>

## 3. Manual de Configuración del Servidor

### 3.1 Configuración de Docker Compose

El archivo `docker-compose.yml` define toda la infraestructura. A continuación se detallan las variables configurables de cada servicio:

#### 3.1.1 Servicio `app` (Node.js)

```yaml
app:
  environment:
    NODE_ENV: development # Cambia a 'production' en producción
    DB_HOST: db # Nombre del servicio de BD (no cambiar si se usa Docker)
    DB_PORT: 3306 # Puerto de MySQL
    DB_USER: user # Usuario de la base de datos
    DB_PASSWORD: user # Contraseña del usuario de BD
```

**Variables de entorno del servidor** (archivo `app/mrfinance/server/.env`):

| Variable         | Descripción                                      | Valor por defecto             |
| ---------------- | ------------------------------------------------ | ----------------------------- |
| `GMAIL_USER`     | Correo Gmail para el envío de códigos 2FA        | `noreply.mrfinance@gmail.com` |
| `GMAIL_APP_PASS` | Contraseña de aplicación de Gmail (App Password) | _(ver sección 3.3)_           |

#### 3.1.2 Servicio `db` (MySQL)

```yaml
db:
  environment:
    MYSQL_ROOT_PASSWORD: root # Contraseña del usuario root
    MYSQL_DATABASE: MrFinanceV2 # Nombre de la base de datos
    MYSQL_USER: user # Usuario de la aplicación
    MYSQL_PASSWORD: user # Contraseña del usuario de la aplicación
```

> **Importante para producción:** Cambia TODAS las contraseñas por defecto antes de desplegar en un entorno expuesto a Internet.

#### 3.1.3 Servicio `nginx` (Proxy Inverso + SSL)

```yaml
nginx:
  environment:
    CERTBOT_EMAIL: noreply.mrfinance@gmail.com # Email para notificaciones de certificados
```

#### 3.1.4 Servicio `phpmyadmin` (Administración BD)

```yaml
phpmyadmin:
  environment:
    PMA_HOST: db # Host de MySQL
    PMA_PORT: 3306 # Puerto de MySQL
    PMA_USER: root # Usuario de acceso a phpMyAdmin
    PMA_PASSWORD: root # Contraseña de acceso
    UPLOAD_LIMIT: 100M # Límite de importación de archivos SQL
```

### 3.2 Configuración de Nginx

El archivo `nginx.conf` configura el proxy inverso con dos bloques `server`:

#### Bloque HTTP (puerto 80) — Redirección a HTTPS

```nginx
server {
    listen 80;
    server_name mrfinance.freemyip.com;

    # Toda petición HTTP se redirige automáticamente a HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}
```

#### Bloque HTTPS (puerto 443) — Servicio de la aplicación

```nginx
server {
    listen 443 ssl;
    server_name mrfinance.freemyip.com;

    # Certificados SSL gestionados por Certbot automáticamente
    ssl_certificate /etc/letsencrypt/live/mrfinance.freemyip.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mrfinance.freemyip.com/privkey.pem;

    # Frontend: archivos estáticos de React compilados
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;  # SPA fallback
    }

    # Backend: proxy inverso a la API Express
    location /api/ {
        proxy_pass http://app:8081/;  # La '/' final elimina el prefijo /api/
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3.3 Configuración del servicio de correo (2FA)

La verificación en dos pasos utiliza Gmail SMTP. Para configurarlo:

#### Paso 1: Habilitar la Verificación en 2 pasos en tu cuenta de Google

1. Ve a [myaccount.google.com/security](https://myaccount.google.com/security)
2. Activa la "Verificación en 2 pasos"

#### Paso 2: Generar una Contraseña de Aplicación

1. Ve a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Selecciona "Otro" y escribe "MrFinance"
3. Copia la contraseña de 16 caracteres generada

#### Paso 3: Configurar las variables de entorno

Edita el archivo `app/mrfinance/server/.env`:

```env
GMAIL_USER=tu_correo@gmail.com
GMAIL_APP_PASS=xxxx xxxx xxxx xxxx
```

<div class="page-break"></div>

## 4. Manual de Usuario

### 4.1 Acceso a la Aplicación

Abre tu navegador de preferencia y accede a:

- **Desarrollo local:** `http://localhost:5173`
- **Producción:** `https://mrfinance.freemyip.com` (o tu dominio personalizado)

### 4.2 Pantalla de Bienvenida

Al acceder, verás la pantalla de bienvenida con dos opciones claras:

- **"Iniciar sesión"** — Si ya dispones de una cuenta activa.
- **"Crear cuenta"** — Si eres un usuario nuevo en el sistema.

En escritorio, la interfaz se divide visualmente a la mitad: a la izquierda, la sección gráfica de bienvenida "Hello Thrifty" y a la derecha los formularios. En móviles, se condensa mostrando únicamente el formulario.

### 4.3 Registro de cuenta nueva

1. Pulsa **"Crear cuenta"** en la pantalla de bienvenida.
2. Introduce los siguientes datos:
   - **Nombre:** Tu nombre público de usuario.
   - **Email:** Un correo válido y único en el sistema.
   - **Contraseña:** Mínimo de **12 caracteres** para garantizar seguridad robusta.
3. Pulsa **"Registrarse"**. Tras el éxito, entrarás directamente al panel principal.

### 4.4 Iniciar sesión

1. Pulsa **"Iniciar sesión"** en la pantalla de bienvenida.
2. Introduce tu **email** y **contraseña** y haz clic en **"Entrar"**.

#### Flujo normal (sin 2FA)

Si no has activado la verificación en dos pasos, serás redirigido inmediatamente al dashboard de finanzas.

#### Flujo con 2FA activado

Si cuenta con seguridad 2FA activada:

1. Aparecerá un **modal interactivo de verificación**.
2. Recibirás de inmediato un **código de 4 dígitos** en tu correo.
3. Escribe o pega el código en el modal. Se validará automáticamente.
4. Dispones de **3 intentos** y el código expira tras **10 minutos**.

### 4.5 Panel Principal (Dashboard)

El dashboard cuenta con las siguientes secciones:

- **Portfolio:** Vista principal con gráfico interactivo y listado de transacciones.
- **Información de la Cuenta:** Configuración del perfil, cambio de imagen en formato PNG y activación de 2FA.
- **Añadir movimientos:** Formulario dinámico de ingreso o gasto con creación instantánea de categorías.

### 4.6 Vista de Portfolio (Pantalla principal)

#### Gráfico de evolución del saldo

Muestra la progresión del saldo a lo largo del tiempo.

- **Color Verde o Azul:** Si tu saldo general es positivo.
- **Color Rojo:** Si tu saldo entra en números negativos (aviso visual).
- **Filtros rápidos:** Permite visualizar periodos de 7 días, 30 días, 3 meses o histórico completo.

#### Lista de Movimientos

Muestra todas las transacciones ordenadas cronológicamente de forma descendente. Permite editar y eliminar transacciones de forma instantánea.

<div class="page-break"></div>

## 5. Documentación Técnica

### 5.1 Estructura del Frontend

El frontend está estructurado mediante un sistema de componentes React y flujos jerárquicos:

<div class="component-tree">
  <div class="tree-node root">
    <span class="node-name">LoginPage</span> <span class="node-file">Login.tsx</span>
    <div class="tree-children">
      
      <div class="tree-node">
        <span class="node-name">AuthSelector</span> <span class="node-file">auth/AuthSelector.tsx</span>
        <div class="tree-children">
          <div class="tree-node leaf">Botón "Iniciar sesión"</div>
          <div class="tree-node leaf">Botón "Crear cuenta"</div>
        </div>
      </div>
      
      <div class="tree-node">
        <span class="node-name">LoginForm</span> <span class="node-file">auth/LoginForm.tsx</span>
        <div class="tree-children">
          <div class="tree-node">
            <span class="node-name">AutenticationModal</span> <span class="node-file">auth/AuthenticationModal.tsx</span> <span class="node-tag">Seguridad 2FA</span>
          </div>
        </div>
      </div>
      
      <div class="tree-node">
        <span class="node-name">RegisterForm</span> <span class="node-file">auth/RegisterForm.tsx</span>
      </div>
      
      <div class="tree-node">
        <span class="node-name">Dashboard</span> <span class="node-file">dashboard/main.tsx</span>
        <div class="tree-children">
          <div class="tree-node leaf"><span class="node-name">Menu</span> <span class="node-file">dashboard/menu.tsx</span> <span class="node-tag">Menú Lateral</span></div>
          <div class="tree-node leaf"><span class="node-name">Cabecera</span> <span class="node-file">dashboard/cabecera.tsx</span> <span class="node-tag">Barra Superior</span></div>
          <div class="tree-node leaf"><span class="node-name">ChartAreaInteractive</span> <span class="node-file">dashboard/chart.tsx</span> <span class="node-tag">Gráfico</span></div>
          <div class="tree-node leaf">Lista de movimientos <span class="node-file">en dashboard/main.tsx</span></div>
          <div class="tree-node leaf"><span class="node-name">EditarModal</span> <span class="node-file">dashboard/editarModal.tsx</span> <span class="node-tag">Edición</span></div>
          <div class="tree-node leaf"><span class="node-name">AddFunds</span> <span class="node-file">dashboard/addfunds.tsx</span> <span class="node-tag">Movimientos</span></div>
          <div class="tree-node leaf"><span class="node-name">AccountInfo</span> <span class="node-file">dashboard/account-info.tsx</span> <span class="node-tag">Perfil</span></div>
        </div>
      </div>
      
    </div>
  </div>
</div>

### 5.2 Estructura del Backend

El backend se ejecuta sobre un servidor Express 5 rápido y seguro:

| Archivo          | Descripción                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| `server.js`      | Enrutamiento principal, middlewares de validación y control de endpoints API         |
| `authService.js` | Gestión y validación temporal en memoria de los códigos de verificación de 4 dígitos |
| `mailer.js`      | Configuración segura del transporte SMTP con pool de conexiones y cifrado TLS        |
| `.env`           | Variables de entorno confidenciales excluidas del repositorio Git                    |

### 5.3 Componentes de Interfaz (Shadcn/ui)

Toda la interfaz está basada en componentes reutilizables de **Shadcn/ui** configurados en `client/src/components/ui/` utilizando estilos utilitarios modernos y fluidos.

<div class="page-break"></div>

## 6. Referencia de la API

Todos los endpoints se encuentran protegidos tras el prefijo `/api/`.

### 6.1 Autenticación

#### `POST /login`

Inicia sesión de usuario en el sistema.

- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "email": "usuario@example.com",
    "password": "mi_contraseña_segura"
  }
  ```
- **Respuestas:**
  - `200 OK` (Sin 2FA): `{ "success": true, "user": { "id": 1, "nombre": "Ana" } }`
  - `200 OK` (Requiere 2FA): `{ "success": true, "requires2fa": true, "email": "ana@example.com" }`
  - `401 Unauthorized`: `{ "success": false, "message": "Email o contraseña incorrectos" }`

#### `POST /verify-2fa`

Valida el código temporal enviado por correo.

- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "email": "usuario@example.com",
    "codigo": "1234"
  }
  ```
- **Respuestas:**
  - `200 OK`: `{ "success": true, "user": { ... } }`
  - `401 Unauthorized`: `{ "success": false, "message": "Código incorrecto o expirado" }`

---

### 6.2 Movimientos

#### `POST /movimientos`

Lista transacciones del usuario.

- **Cuerpo de la solicitud (JSON):** `{ "userId": 1, "pass": "$2b$10$..." }`

#### `POST /add-movimiento`

Registra un nuevo ingreso o gasto.

- **Cuerpo de la solicitud (JSON):**
  ```json
  {
    "userId": 1,
    "pass": "$2b$10$...",
    "tipo": "gasto",
    "monto": 25.0,
    "fecha": "2026-05-23",
    "id_categoria": 1,
    "concepto": "Cena restaurante"
  }
  ```

<div class="page-break"></div>

## 7. Base de Datos

### 7.1 Esquema Relacional

La base de datos se denomina `MrFinanceV2` y se ejecuta sobre el motor relacional MySQL 8.

<div style="text-align: center; margin: 25px 0; page-break-inside: avoid;">
  <img src="Entidad-relacion.png" alt="Esquema Entidad-Relación de la base de datos MrFinanceV2" style="max-width: 100%; height: auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
  <p style="font-size: 9pt; color: #718096; margin-top: 10px; font-style: italic;">Figura 1: Diagrama Entidad-Relación de la base de datos MrFinanceV2</p>
</div>

### 7.2 Definición de Tablas

#### Tabla `usuarios`

- Almacena las cuentas registradas en el sistema.
- La columna `pass` almacena contraseñas cifradas irreversiblemente mediante hashing (bcrypt).

#### Tabla `categoria`

- Almacena las categorías que los usuarios crean para clasificar transacciones. Posee una relación recursiva-lógica hacia el usuario propietario.

#### Tabla `movimientos`

- Almacena los ingresos y gastos reales con una referencia clave foránea obligatoria al usuario y a la categoría asignada.

### 7.3 Triggers de Integridad Referencial

#### Trigger `trg_before_delete_usuario`

Se ejecuta antes de borrar un usuario. Elimina en cascada todos sus movimientos y categorías correspondientes en la base de datos para impedir registros huérfanos.

#### Trigger `trg_before_delete_categoria`

Impide eliminar una categoría si cuenta con movimientos asociados. Lanza un código de estado estructurado `SQLSTATE '45000'` interrumpiendo la operación de borrado y protegiendo los datos.

<div class="page-break"></div>

## 8. Solución de Problemas

### 8.1 Problemas Comunes y Soluciones Rápidas

#### 1. El contenedor `app` no consigue levantar correctamente

- **Síntoma:** El contenedor se apaga constantemente o muestra reinicios recurrentes.
- **Solución:** Ejecuta `docker compose logs app` para leer los logs en vivo. Si hay problemas en la compilación de `bcrypt`, realiza un borrado de volumen ejecutando:
  ```bash
  docker compose down
  docker volume rm mr_finance_mrfinance_server_modules
  docker compose up --build
  ```

#### 2. Error de conexión con la Base de Datos

- **Síntoma:** El log de node_app2 indica: `Error conectando a la DB`.
- **Solución:** MySQL cambia sus estados a listos unos segundos adicionales en iniciar la primera ejecución mientras crea las tablas. Asegúrate de esperar a que finalice o reconstruye los contenedores desde cero eliminando los datos previos:
  ```bash
  docker compose down -v
  docker compose up --build
  ```

#### 3. Códigos 2FA no se envían al correo

- **Síntoma:** Modal de 2FA aparece en pantalla pero el correo no llega a la bandeja de entrada.
- **Solución:** Revisa el archivo `server/.env`. Verifica que la contraseña del correo sea una **Contraseña de Aplicación de 16 dígitos** válida generada dentro de Google Account y no tu contraseña de correo normal.

<div class="page-break"></div>

## 9. Metodología y Planificación del Proyecto

Para el correcto desarrollo de **MR Finance**, se ha seguido una rigurosa planificación estructurada basada en metodologías ágiles, orientando el proyecto hacia un flujo incremental de valor constante.

### 9.1 Metodología de Desarrollo

Se ha seleccionado la metodología **Kanban** debido a su gran flexibilidad para la gestión y adaptación continua de tareas individuales en proyectos unipersonales.

- **Git / GitHub:** Control de versiones de código. Se utilizó una rama principal `main` estable y ramas de características (`feature/`) para desarrollar y testear funcionalidades aisladas (como 2FA, maquetación de componentes y proxy reverso) de forma segura.
- **Tablero Kanban:** Herramienta visual digital para monitorizar las diferentes fases de las tareas: _Por Hacer_, _En Progreso_, _Fase de Pruebas_ y _Completado_.

### 9.2 Fases del Ciclo de Vida del Software

El desarrollo se ha dividido cronológicamente en **6 fases principales**:

<div class="project-phases-container">
  <div class="phase-step">
    <div class="phase-num">1</div>
    <div class="phase-name">Análisis y Requisitos</div>
  </div>
  <div class="phase-step">
    <div class="phase-num">2</div>
    <div class="phase-name">Diseño de BD y Esquemas</div>
  </div>
  <div class="phase-step">
    <div class="phase-num">3</div>
    <div class="phase-name">Desarrollo Backend</div>
  </div>
  <div class="phase-step">
    <div class="phase-num">4</div>
    <div class="phase-name">Desarrollo Frontend</div>
  </div>
  <div class="phase-step">
    <div class="phase-num">5</div>
    <div class="phase-name">Integración Docker y SSL</div>
  </div>
  <div class="phase-step">
    <div class="phase-num">6</div>
    <div class="phase-name">Pruebas y Documentación</div>
  </div>
</div>

1. **Fase 1: Análisis y Definición de Requisitos:** Recopilación de necesidades de negocio y especificaciones de software (2FA por correo, persistencia relacional, aislamiento de credenciales).
2. **Fase 2: Diseño de Base de Datos y Maquetación:** Creación de diagramas entidad-relación y definición de restricciones y triggers de integridad referencial.
3. **Fase 3: Desarrollo de la API de Backend:** Creación del servidor Node.js/Express, configuración de Nodemailer SMTP y servicio de cifrado bcrypt.
4. **Fase 4: Desarrollo de Frontend SPA:** Creación de componentes React 19, integración de gráficos interactivos dinámicos de Recharts y control de estados de sesión.
5. **Fase 5: Integración e Infraestructura Docker:** Orquestación multi-contenedor del sistema completo, proxy inverso Nginx y generación de certificados SSL automatizados.
6. **Fase 6: Pruebas, Optimización y Documentación:** Testing manual exhaustivo de flujos extremos, rate limiting y redacción del manual del proyecto.

### 9.3 Estimación Temporal y Distribución de Esfuerzos

A continuación se presenta un desglose de las horas estimadas de dedicación para cada una de las fases del proyecto:

| Fase de Desarrollo                       | Duración Estimada (Horas) | Porcentaje de Esfuerzo |
| ---------------------------------------- | ------------------------- | ---------------------- |
| Análisis y Requisitos                    | 15 horas                  | 10%                    |
| Diseño de BD y Arquitectura              | 20 horas                  | 13%                    |
| Desarrollo Backend (API REST)            | 35 horas                  | 23%                    |
| Desarrollo Frontend (React SPA)          | 45 horas                  | 30%                    |
| Infraestructura (Docker, Nginx, SSL)     | 20 horas                  | 13%                    |
| Pruebas, Refactorización y Documentación | 15 horas                  | 10%                    |
| **TOTAL**                                | **150 horas**             | **100%**               |

<div class="page-break"></div>

## 10. Medidas de Seguridad Implementadas

La seguridad ha sido un pilar fundamental en la concepción y desarrollo de la aplicación MR Finance. Se han implementado múltiples capas de seguridad para salvaguardar la privacidad de la información financiera y credenciales de los usuarios.

### 10.1 Almacenamiento Seguro de Credenciales (Bcrypt)

Las contraseñas no se almacenan nunca en texto plano. En su lugar, el backend utiliza el algoritmo de hashing seguro **bcrypt** con un factor de coste de **10**.

- **Ventaja:** Cifrado unidireccional e irreversible resistente a ataques de fuerza bruta y de tablas de arcoíris.
- **Migración Automática:** El sistema cuenta con lógica de migración para transformar antiguas claves en texto plano a hashes bcrypt de forma totalmente invisible para el usuario final durante su primer inicio de sesión correcto.

### 10.2 Autenticación de Doble Factor (2FA) Segura

La verificación en dos pasos proporciona una capa crucial contra los accesos no autorizados:

- **Generación Robusta:** Los códigos temporales se componen de 4 dígitos numéricos generados dinámicamente en tiempo de ejecución.
- **Ciclo de Vida Corto:** Tienen una validez máxima de **10 minutos** en memoria temporal y se destruyen de inmediato tras su uso.
- **Bloqueo Brute-Force:** Se implementa un límite estricto de **3 intentos**. Si un atacante intenta adivinar el código mediante fuerza bruta, el código se invalida inmediatamente tras el tercer fallo consecutivo, obligando a iniciar el proceso de inicio de sesión completo nuevamente.

### 10.3 Prevención de Ataques de Inyección SQL

La interacción con la base de datos MySQL 8 se realiza exclusivamente mediante **sentencias preparadas** haciendo uso del conector optimizado `mysql2/promise`.

- **Mecanismo:** Los datos introducidos por el usuario final se envían separados de la estructura de la consulta SQL mediante parámetros posicionales (`?`), impidiendo que caracteres maliciosos modifiquen la lógica interna de ejecución de la base de datos.

### 10.4 Aislamiento de Secretos y Variables de Entorno

Toda la información sensible del sistema se almacena fuera del código de la aplicación:

- **Configuración Local:** Variables críticas como credenciales SMTP y accesos MySQL se definen en ficheros locales `.env` protegidos mediante reglas estrictas en el archivo de exclusión `.gitignore`.
- **Aislamiento Docker:** La comunicación interna entre contenedores (como el host de conexión `db`) se realiza mediante variables parametrizadas inyectadas de forma dinámica en tiempo de construcción y arranque.

### 10.5 Securización del Proxy Inverso Nginx y SSL/TLS

El tráfico web está cifrado de extremo a extremo utilizando los estándares del sector:

- **Cifrado de Tránsito:** Todo el canal de datos se cifra obligatoriamente bajo protocolo seguro HTTPS en el puerto 443.
- **Redirección Forzosa:** Cualquier petición entrante en el puerto estándar HTTP (puerto 80) es interceptada y redirigida con código de estado HTTP 301 de forma instantánea a HTTPS.
- **Certificados Certbot:** La imagen de Nginx renueva y gestiona los certificados de Let's Encrypt de forma automática sin requerir la intervención manual del administrador del servidor.

<div class="page-break"></div>

## 11. Pruebas y Control de Calidad

Para asegurar la robustez de los algoritmos y una experiencia de usuario sobresaliente, se ejecutó una completa matriz de pruebas funcionales y de compatibilidad.

### 11.1 Control de Calidad de la API Backend

Se realizaron baterías de pruebas manuales y simulaciones de llamadas directas utilizando clientes HTTP (Postman) para verificar la consistencia de las respuestas del servidor:

- **Control de Códigos de Estado:** Retorno correcto de estados HTTP (`200 OK` para éxito, `401 Unauthorized` para credenciales erróneas, `409 Conflict` para duplicación de datos).
- **Validación de Datos Entrantes:** Middleware interceptor en Express que rechaza de forma instantánea peticiones que no cumplan con el esquema requerido (como montos nulos, negativos o categorías inexistentes).

### 11.2 Compatibilidad e Interfaz de Usuario (UX)

Se ha validado el comportamiento gráfico del frontend mediante emulación de múltiples pantallas en las herramientas de desarrollo del navegador:

- **Diseño Fluido:** Verificación de menús adaptativos (menú lateral en pantallas grandes y barra de iconos superior en teléfonos móviles).
- **Comportamiento del Gráfico:** Comprobación del renderizado en tiempo real del área interactiva (azul/verde si el balance es positivo, y cambio dinámico a color rojo si se detectan pérdidas financieras).

### 11.3 Matriz de Pruebas Funcionales (UAT)

A continuación se detallan los casos de uso sometidos a prueba y sus resultados correspondientes:

| ID        | Módulo        | Caso de Prueba                               | Entrada de Datos                  | Comportamiento Esperado                                  | Estado       |
| --------- | ------------- | -------------------------------------------- | --------------------------------- | -------------------------------------------------------- | ------------ |
| **TP-01** | Autenticación | Registro con contraseña demasiado corta      | Contraseña de 8 caracteres        | Muestra error visual; el sistema impide el registro.     | **APROBADA** |
| **TP-02** | Autenticación | Registro correcto de nueva cuenta            | Datos válidos, clave > 12 chars   | Accede correctamente; redirige al dashboard.             | **APROBADA** |
| **TP-03** | Autenticación | Login con verificación 2FA activa            | Credenciales correctas de Luis    | Recibe código por correo; abre el modal de verificación. | **APROBADA** |
| **TP-04** | Autenticación | Error reiterado en código 2FA                | Código inválido en 3 intentos     | Invalida sesión y redirige a pantalla de login.          | **APROBADA** |
| **TP-05** | Finanzas      | Registro de transacción inválida             | Monto nulo o negativo             | El botón se deshabilita o retorna advertencia.           | **APROBADA** |
| **TP-06** | Finanzas      | Eliminar categoría con movimientos           | Clic en eliminar categoría activa | BD lanza error SQLSTATE 45000; se impide el borrado.     | **APROBADA** |
| **TP-07** | Perfil        | Cambio de foto de perfil con formato erróneo | Subida de archivo JPEG / SVG      | El validador rechaza el formato; solo permite PNG.       | **APROBADA** |

<div class="page-break"></div>

## 12. Conclusiones y Trabajo Futuro

El proyecto **MR Finance** representa una solución integral, robusta y escalable para la gestión financiera. Ha permitido unificar metodologías de desarrollo full-stack con buenas prácticas en infraestructuras y despliegues modernos.

### 12.1 Conclusiones y Aprendizaje

El desarrollo del proyecto ha aportado valiosas competencias técnicas en diversas áreas críticas:

- **Orquestación y Despliegue:** Docker Compose ha demostrado ser una herramienta excepcional para el aislamiento y unificación de entornos complejos, eliminando por completo el clásico problema del entorno local.
- **Seguridad como Criterio de Diseño:** La integración de 2FA interactivo y encriptación de datos ha permitido asimilar de forma práctica las normativas y metodologías modernas de desarrollo seguro de software.
- **Componentización Modular:** El desarrollo del frontend con React 19 y Shadcn/ui ha posibilitado la creación de una aplicación fluida, rápida y atractiva que ofrece una experiencia dinámica al usuario final.

### 12.2 Líneas de Trabajo Futuro

Como evolución natural del proyecto, se plantean los siguientes desarrollos y ampliaciones técnicas:

1. **Módulo de Planificación y Presupuestos (Budgets):** Posibilidad de establecer límites máximos de gasto mensual por categoría. El sistema enviará alertas en tiempo real al usuario si su consumo se aproxima a la cuota prefijada.
2. **Visualización de Gráficos Avanzados:** Incorporación de gráficos circulares para ver la distribución porcentual de gastos por categoría, complementando el gráfico de área temporal existente.
3. **Exportación Automatizada de Informes:** Opción de descargar listados de movimientos filtrados en formatos estándar de oficina (PDF para impresión estructurada y hojas de cálculo Excel/CSV para auditorías personales).
4. **Integración con OAuth 2.0 (Autenticación Social):** Habilitar el inicio de sesión directo con cuentas de Google, GitHub o Microsoft, facilitando la incorporación de nuevos usuarios sin comprometer la seguridad.
5. **Notificaciones Push y Recordatorios PWA:** Convertir la aplicación en Progressive Web App (PWA) e integrar notificaciones periódicas para recordar al usuario el registro regular de sus movimientos diarios.

<div class="page-break"></div>

## Apéndice: Mapa de Puertos

A continuación se detalla la correspondencia de los puertos utilizados en la arquitectura de contenedores para asegurar la correcta comunicación interna y externa del sistema:

| Puerto Host | Puerto Contenedor | Servicio Docker | Protocolo | Descripción del Servicio                               |
| ----------- | ----------------- | --------------- | --------- | ------------------------------------------------------ |
| **80**      | 80                | `nginx`         | TCP       | Servidor Web HTTP (Redirección automática a HTTPS)     |
| **443**     | 443               | `nginx`         | TCP       | Servidor Web HTTPS (Servicio Frontend y API Proxy)     |
| **3000**    | 3000              | `app`           | TCP       | Puerto reservado para flujos de prueba internos        |
| **3306**    | 3306              | `db`            | TCP       | Acceso de datos directo al motor MySQL 8               |
| **5173**    | 5173              | `app`           | TCP       | Servidor de desarrollo de Vite (Frontend local)        |
| **8080**    | 80                | `phpmyadmin`    | TCP       | Panel Web de Administración visual de la base de datos |
| **8081**    | 8081              | `app`           | TCP       | API REST de backend (Servidor Express de producción)   |
| **587**     | 587               | `app`           | TCP       | Conectividad de envío SMTP seguro (Gmail)              |

---

_Documentación ampliada, estructurada y adaptada para la conversión directa a formato PDF._  
**MR Finance © 2026. Todos los derechos reservados.**

</div>
