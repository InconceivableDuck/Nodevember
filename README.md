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

### 8. Dockerize Redis
```
FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y wget build-essential
RUN apt-get install -y supervisor
RUN cd /opt && wget http://download.redis.io/releases/redis-2.8.17.tar.gz
RUN cd /opt && tar -xvzf redis-2.8.17.tar.gz
RUN cd /opt/redis-2.8.17 && make
RUN mkdir -p /var/log/supervisor
RUN midir -p /data
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf
ADD redis.conf /opt/redis-2.8.17/redis.conf
EXPOSE 6379
CMD "/usr/bin/supervisord"
```

### 9. Supervisor
```
[supervisord]
nodaemon=true

[program:redis]
command=/opt/redis-2.8.17/src/redis-server /opt/redis-2.8.17/redis.conf
```

### 10. Running Redis
```
$ mkdir -p /mnt/data/redis
$ docker run -d -v /mnt/data:/data -p 6379:6379 redis
```

### 11. docker-bash
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
