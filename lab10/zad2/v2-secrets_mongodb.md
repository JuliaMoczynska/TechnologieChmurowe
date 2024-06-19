##  microservice_b_deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mikroserwis-b
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mikroserwis-b
  template:
    metadata:
      labels:
        app: mikroserwis-b
    spec:
      containers:
        - name: mikroserwis-b
          image: mikroserwis-b:latest
          ports:
            - containerPort: 80
          imagePullPolicy: Never
          env:
            - name: MONGODB_URI
              value: "mongodb://$(MONGO_INITDB_ROOT_USERNAME):$(MONGO_INITDB_ROOT_PASSWORD)@mongodb-service:27017/mydatabase"
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mongo-secret
                  key: username
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongo-secret
                  key: password
---
apiVersion: v1
kind: Service
metadata:
  name: mikroserwis-b
spec:
  selector:
    app: mikroserwis-b
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
db.yaml

## mongodb_deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
        - name: mongodb
          image: mongo
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: mongodb-data
              mountPath: /data/db
          env:
            - name: MONGO_INITDB_ROOT_USERNAME
              valueFrom:
                secretKeyRef:
                  name: mongo-secret
                  key: username
            - name: MONGO_INITDB_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mongo-secret
                  key: password
      volumes:
        - name: mongodb-data
          persistentVolumeClaim:
            claimName: mongodb-pvc
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: mongodb-pv
spec:
  capacity:
    storage: 1Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: standard
  hostPath:
    path: /data/mongodb
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: standard
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017
      targetPort: 27017
 
## db-secret.yaml

apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: YWRtaW4=
  password: YWRtaW4=

# u: admin pass: admin