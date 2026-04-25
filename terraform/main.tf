terraform {
  required_providers {
    render = {
      source  = "render-oss/render"
      version = "~> 1.4.0"
    }
  }
}

variable "render_api_key" {
  type = string
}

variable "render_owner_id" {
  type = string
}

# Conectar Terraform con tu cuenta de Render
provider "render" {
  api_key = var.render_api_key
}

# 1. Crear la Base de Datos PostgreSQL gratuita
resource "render_postgres" "cine_db" {
  name       = "cine-ticketing-db"
  plan       = "free"
  region     = "ohio" # Servidor en EE.UU.
  version    = "15"
  owner_id   = var.render_owner_id
}

# 2. Crear el Web Service (Tu API)
resource "render_web_service" "cine_api" {
  name     = "api-cine-ticketing"
  plan     = "free"
  region   = "ohio"
  owner_id = var.render_owner_id
  runtime  = "docker" # Render usará el Dockerfile que acabamos de crear

  # ⚠️ CAMBIA ESTO POR LA URL DE TU REPOSITORIO EN GITHUB
  repo_url = "https://github.com/TU-USUARIO/cine-ticketing-system"
  branch   = "main"

  # Le pasamos la conexión de la base de datos automáticamente al código
  env_vars = {
    "ConnectionStrings__DefaultConnection" = render_postgres.cine_db.connection_string
  }
}