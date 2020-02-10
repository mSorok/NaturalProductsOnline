package de.unijena.cheminf.naturalproductsonline.config


import org.apache.catalina.connector.Connector
import org.springframework.boot.web.embedded.tomcat.TomcatConnectorCustomizer
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.context.annotation.Bean

@Bean
fun containerCustomizer(): WebServerFactoryCustomizer<TomcatServletWebServerFactory> {
    return TomcatWebServerCustomizer()
}

private class TomcatWebServerCustomizer : WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

    override fun customize(factory: TomcatServletWebServerFactory) {
        factory.addConnectorCustomizers({ connector: Connector ->
            /*
            when using special characters not allowed by RFC 7230 and RFC 3986 (like in smiles) allow tomcat to process them,
            unfortunately this does not take effect, what am I doing wrong?
            The value may be any combination of the following characters: " < > [ \ ] ^ ` { | } . Any other characters present in the value will be ignored.
            see: https://tomcat.apache.org/tomcat-8.5-doc/config/http.html
            */

            connector.setAttribute("relaxedPathChars", "{}[]")
            connector.setAttribute("relaxedQueryChars", "{}[]")

        } as TomcatConnectorCustomizer)
    }

}
