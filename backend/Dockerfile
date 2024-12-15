# Wybór obrazu bazowego (JDK 23)
FROM openjdk:23-jdk-slim

# Określenie katalogu roboczego w kontenerze
WORKDIR /app

# Kopiowanie pliku JAR do kontenera
COPY target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Eksponowanie portu aplikacji (np. port 8080)
EXPOSE 8080

# Uruchamianie aplikacji Spring Boot
CMD ["java", "-jar", "backend.jar"]
