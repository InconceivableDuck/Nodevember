## Code from Slides

### 1. Installing Docker
```
$ sudo apt-get install linux-image-extra-`uname -r`
$ curl -sSL https://get.docker.com/ubuntu/ | sudo sh
$ docker run -i -t ubuntu /bin/bash
```

### 2. Run Docker
```
$ docker run -i -t ubuntu /bin/bash
```

### 3. Do Something
```
$ docker run -i -t ubuntu /bin/bash
# mkdir -p /opt/acme
# echo "Hello!" > /opt/acme/hello.txt
# exit
```

### 4. Persisting Changes
```
$ docker run -i -t ubuntu /bin/bash
// Make some changes

$ docker ps
$ docker commit [CONTAINER_ID] hello:1.0
$ docker run -i -t hello:1.0 /bin/bash
```

### 5. Push to Registry
```
$ docker login
$ docker commit [CONTAINER_ID] username/hello:1.0
$ docker push username/hello:1.0
```

### 6. Pull from Registry
```
$ docker login
$ docker pull username/hello:1.0
$ docker images
$ docker run -i -t username/hello:1.0 /bin/bash
# cat /opt/acme/hello.txt
```

### 7. The Dockerfile
```
FROM ubuntu:14.04
RUN mkdir -p /opt/acme
RUN echo "Hello" > /opt/acme/hello.txt
CMD /bin/bash
```

```
$ docker build -t inconceivableduck/hello:1.0 .
$ docker run -i -t inconceivableduck/hello:1.0
```

### Mongo, Redis, Node.js files
The Dockerfiles and config files for each specific app is located in subfolders: /redis, /mongo, /app, and /haproxy.

### 8. Running Redis
```
$ mkdir -p /mnt/data/redis
$ docker run -d -v /mnt/data:/data -p 6379:6379 redis
```

### 9. docker-bash
```
// Install
$ curl --fail -L -O https://github.com/phusion/baseimage-docker/archive/master.tar.gz && \
tar xzf master.tar.gz && \
sudo ./baseimage-docker-master/install-tools.sh

// Use
$ docker ps
$ docker-bash [CONTAINER_ID]
# supervisorctl
```

### 10. Running Mongo
```
$ mkdir -p /mnt/data/mongo
$ mkdir -p /mnt/logs
$ docker run -d -v /mnt/data:/data -v /mnt/logs:/logs -p 27017:27017 mongo
```

### 11. Running Node.js
```
$ mkdir -p /mnt/logs
$ docker run -d -v /mnt/logs:/logs -p 80:80 app
```

### 12. Running a bunch of Node.js
```
$ docker run -d -v /mnt/logs:/logs -p 81:80 app
$ docker run -d -v /mnt/logs:/logs -p 82:80 app
$ docker run -d -v /mnt/logs:/logs -p 83:80 app
$ docker run -d -v /mnt/logs:/logs -p 84:80 app
```

### 13. Running haproxy load balancer
```
$ docker run -d -v /mnt/logs:/logs -p 80:80 haproxy
```
