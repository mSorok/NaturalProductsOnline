FROM maven:3-openjdk-8
COPY . /src
WORKDIR /src
RUN mvn package

FROM openjdk:8-jre-alpine
COPY --from=0 /src/target/naturalproductsonline-*.jar app.jar

EXPOSE 8091
VOLUME /tmp
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]


