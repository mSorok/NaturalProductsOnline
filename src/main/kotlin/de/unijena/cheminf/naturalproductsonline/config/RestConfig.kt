package de.unijena.cheminf.naturalproductsonline.config


import org.springframework.context.annotation.Configuration
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.http.HttpMethod

@Configuration
class RestConfig : RepositoryRestConfigurer {

    override fun configureRepositoryRestConfiguration(restConfig: RepositoryRestConfiguration) {
        val config = restConfig.exposureConfiguration

        config.disablePatchOnItemResources()
        config.disablePutOnItemResources()
        config.disablePutForCreation()

        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.POST) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.PUT) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.PATCH) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.DELETE) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.HEAD) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.TRACE) }
        config.withCollectionExposure { _, httpMethods -> httpMethods.disable(HttpMethod.OPTIONS) }

    }
}
