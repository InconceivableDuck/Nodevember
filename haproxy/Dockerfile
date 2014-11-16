FROM ubuntu:14.04
RUN apt-get update -y && apt-get install -y curl wget supervisor build-essential
RUN mkdir -p /var/log/supervisor
RUN mkdir -p /logs
RUN cd /opt && wget http://www.haproxy.org/download/1.5/src/haproxy-1.5.3.tar.gz
RUN cd /opt && tar xzf haproxy-1.5.3.tar.gz
RUN cd /opt/haproxy-1.5.3 && make TARGET=linux2628 && make install
ADD haproxy.cfg /opt/haproxy-1.5.3/haproxy.cfg
ADD supervisor.conf /etc/supervisor/conf.d/supervisor.conf
EXPOSE 80
CMD "/usr/bin/supervisord"
