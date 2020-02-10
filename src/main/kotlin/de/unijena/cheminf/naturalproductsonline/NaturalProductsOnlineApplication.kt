package de.unijena.cheminf.naturalproductsonline

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories



@SpringBootApplication
@EnableMongoRepositories("de.unijena.cheminf.naturalproductsonline.coconutmodel.mongocollections")
class NaturalProductsOnlineApplication


fun main(args: Array<String>) {
    System.setProperty("org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH", "true")

    runApplication<NaturalProductsOnlineApplication>(*args)

}
