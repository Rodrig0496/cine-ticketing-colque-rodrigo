# 1. Definir el proveedor (Azure)
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 2. Crear un Grupo de Recursos (El contenedor de todo)
resource "azurerm_resource_group" "cine_rg" {
  name     = "rg-cine-ticketing-tacna"
  location = "East US"
}

# 3. Crear el Plan de Servicio (El "servidor" físico virtualizado)
resource "azurerm_service_plan" "cine_plan" {
  name                = "plan-cine-service"
  resource_group_name = azurerm_resource_group.cine_rg.name
  location            = azurerm_resource_group.cine_rg.location
  os_type             = "Linux"
  sku_name            = "F1" # Capa gratuita (Free)
}

# 4. Crear la Base de Datos PostgreSQL
resource "azurerm_postgresql_flexible_server" "cine_db_server" {
  name                   = "cine-db-server-99"
  resource_group_name    = azurerm_resource_group.cine_rg.name
  location               = azurerm_resource_group.cine_rg.location
  version                = "13"
  administrator_login    = "admincine"
  administrator_password = "PasswordSegura123!" # Usa variables en producción
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
}

# 5. Crear el App Service para el Backend (.NET)
resource "azurerm_linux_web_app" "cine_api" {
  name                = "api-cine-ticketing-system"
  resource_group_name = azurerm_resource_group.cine_rg.name
  location            = azurerm_resource_group.cine_rg.location
  service_plan_id     = azurerm_service_plan.cine_plan.id

  site_config {
    application_stack {
      dotnet_version = "8.0"
    }
  }

  app_settings = {
    "ConnectionStrings__DefaultConnection" = "Host=${azurerm_postgresql_flexible_server.cine_db_server.fqdn};Database=CineDB;Username=admincine;Password=PasswordSegura123!"
  }
}
