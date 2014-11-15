FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y wget build-essential
RUN apt-get install -y supervisor
RUN cd /opt && wget http://download.redis.io/releases/redis-2.8.17.tar.gz
RUN cd /opt && tar -xvzf redis-2.8.17.tar.gz
RUN cd /opt/redis-2.8.17 && make
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /data
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf
ADD redis.conf /opt/redis-2.8.17/redis.conf
EXPOSE 6379
CMD "/usr/bin/supervisord"
