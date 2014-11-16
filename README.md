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

### 8. Redis Dockerfile
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

### 9. Redis supervisor.conf
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

### 12. Mongo Dockerfile
```
FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y wget
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data
RUN mkdir -p /logs
RUN cd /opt && wget -nv http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.6.5.tgz
RUN cd /opt && tar -xvzf mongodb-linux-x86_64-2.6.5.tgz
ADD mongo.conf /opt/mongodb-linux-x86_64-2.6.5/mongo.conf
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf
EXPOSE 27017
CMD "/usr/bin/supervisord"
```

### 13. Mongo supervisor.conf
```
[supervisord]
nodaemon=true

[program:mongo]
command=/opt/mongodb-linux-x86_64-2.6.5/bin/mongod --config    /opt/mongodb-linux-x86_64-2.6.5/mongo.conf
```

### 14. Mongo mongo.conf
```
logpath = /logs/mongo.log
logappend = true
dbpath = /data/mongo
smallfiles = true
```

### 15. Running Mongo
```
$ mkdir -p /mnt/data/mongo
$ mkdir -p /mnt/logs
$ docker run -d -v /mnt/data:/data -v /mnt/logs:/logs -p 27017:27017 mongo
```

### 16. Node.js index.js
```
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('My port is ' + process.env.PORT);
}).listen(process.env.PORT);
console.log('Server running on port ' + process.env.PORT);
```

### 17. Node.js Dockerfile
```
FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y curl wget git supervisor build-essential
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data
RUN mkdir -p /logs
RUN cd /opt && git clone https://github.com/InconceivableDuck/Nodevember.git
RUN curl https://raw.githubusercontent.com/isaacs/nave/master/nave.sh > /opt/nave.sh
RUN bash /opt/nave.sh usemain 0.10.33
RUN cd /opt && wget http://www.haproxy.org/download/1.5/src/haproxy-1.5.3.tar.gz
RUN cd /opt && tar xzf haproxy-1.5.3.tar.gz
RUN cd /opt/haproxy-1.5.3 && make TARGET=linux2628 && make install
ADD haproxy.cfg /opt/haproxy-1.5.3/haproxy.cfg
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf
EXPOSE 80 8081 8082 8083
CMD "/usr/bin/supervisord"
```

### 18. Node.js supervisor.conf
```
[supervisord]
nodaemon=true

[program:app1]
command=node /opt/Nodevember/app/index.js
environment=PORT="8081"
stdout_logfile=/logs/app1.log
stdout_logfile_maxbytes=1GB
redirect_stderr=true

[program:app2]
command=node /opt/Nodevember/app/index.js
environment=PORT="8082"
stdout_logfile=/logs/app2.log
stdout_logfile_maxbytes=1GB
redirect_stderr=true

[program:app3]
command=node /opt/Nodevember/app/index.js
environment=PORT="8083"
stdout_logfile=/logs/app3.log
stdout_logfile_maxbytes=1GB
redirect_stderr=true

[program:app4]
command=node /opt/Nodevember/app/index.js
environment=PORT="8084"
stdout_logfile=/logs/app4.log
stdout_logfile_maxbytes=1GB
redirect_stderr=true

[program:haproxy]
command=haproxy -f /opt/haproxy-1.5.3/haproxy.cfg
stdout_logfile=/logs/haproxy.log
stdout_logfile_maxbytes=1GB
redirect_stderr=true
```

### 19. Node.js haproxy.cfg
```
global
    maxconn 65535
    #daemon

defaults
    mode    http
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    1d
    timeout queue           1m
    timeout connect         10s
    timeout client          10m
    timeout server          10m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 64000

listen app *:80
    mode http
    balance roundrobin
    server app1 127.0.0.1:8081
    server app2 127.0.0.1:8082
    server app3 127.0.0.1:8083
    server app4 127.0.0.1:8084
```

### 20. Running Node.js
```
$ mkdir -p /mnt/logs
$ docker run -d -v /mnt/logs:/logs -p 80:80 app
```
