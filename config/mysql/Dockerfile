
FROM mysql:5.7

ADD my.cnf /etc/mysql/conf.d/my.cnf
ADD setup.sql /docker-entrypoint-initdb.d/

RUN chown -R mysql:root /var/lib/mysql/

ARG MYSQL_DATABASE=default_database
ARG MYSQL_USER=default_user
ARG MYSQL_PASSWORD=secret
ARG MYSQL_ROOT_PASSWORD=root

CMD ["mysqld"]
EXPOSE 3306
