
FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG JAVA_OPTS
ENV JAVA_OPTS=$JAVA_OPTS
ADD interview-ui.jar interview-ui.jar
EXPOSE 8081
ENTRYPOINT exec java $JAVA_OPTS -jar interview-ui.jar
# For Spring-Boot project, use the entrypoint below to reduce Tomcat startup time.
#ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar interview-ui.jar
