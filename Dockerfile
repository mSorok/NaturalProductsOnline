FROM openjdk:8u171-slim

EXPOSE 8091
VOLUME /tmp
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY inchiPet.jar /

RUN java -jar inchiPet.jar

ENTRYPOINT ["java", "-Xmx10000m","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

