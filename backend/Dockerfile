# Etapa de construcción
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
# Publicar el proyecto en la carpeta /app/publish
RUN dotnet publish "CineTicketing.API/CineTicketing.API.csproj" -c Release -o /app/publish

# Etapa de producción
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
# Render usa el puerto 8080 por defecto para servicios web gratuitos
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "CineTicketing.API.dll"]