FROM maven:3-openjdk-8
COPY . /src
WORKDIR /src
RUN mvn package



FROM openjdk:8u171-slim



EXPOSE 8091
VOLUME /tmp
#ARG JAR_FILE=target/*.jar
#COPY ${JAR_FILE} app.jar

COPY --from=0 /src/target/naturalproductsonline-*.jar app.jar

COPY inchiPet.jar /

RUN java -jar inchiPet.jar

ENTRYPOINT ["java", "-Xmx10000m","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]

