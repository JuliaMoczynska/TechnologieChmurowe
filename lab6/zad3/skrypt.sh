docker network create backend_network
docker network create frontend_network

docker run --name database --rm -d  -p  2717:27017 --network backend_network mongo
docker run --name backend --rm -d -p 3000:8000 -w /app --network frontend_network node:16 sleep 1000
docker run --name frontend --rm -d -p 80:80 --network frontend_network nginx
docker network connect backend_network backend

docker cp backend.js backend:/app/backend.js
docker cp index.html frontend:/usr/share/nginx/html/index.html

docker exec -it backend npm install express mongodb
docker exec -it backend node backend.js