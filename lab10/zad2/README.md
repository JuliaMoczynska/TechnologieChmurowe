# Kubernetes Deployment for Microservices and Database

## Instrukcja
- Wykonaj komendy z pliku `commands.txt`:
   ```sh
   kubectl apply -f database/database_pv.yaml
   kubectl apply -f database/database_pvc.yaml
   kubectl apply -f database/database_deployment.yaml
   kubectl apply -f database/database_service.yaml
   kubectl apply -f microservice_a/microservice_a_deployment.yaml
   kubectl apply -f microservice_a/microservice_a_service.yaml
   kubectl apply -f microservice_b/microservice_b_deployment.yaml
   ```

## Opis

- Mikroserwis A: Skalowalny do 3 replik, dostępny z zewnątrz przez LoadBalancer.
- Mikroserwis B: Komunikuje się z bazą danych PostgreSQL.
- Baza danych: Z persistent volume dla trwałości danych.

## Konfiguracja

### Mikroserwis A

- Dockerfile i aplikacja JavaScript.
- Deployment i Service (LoadBalancer).

### Mikroserwis B

- Dockerfile i aplikacja JavaScript.
- Deployment z konfiguracją do komunikacji z bazą danych.

### Baza danych

- Dockerfile z PostgreSQL.
- Deployment, Service (ClusterIP), PersistentVolume, PersistentVolumeClaim.