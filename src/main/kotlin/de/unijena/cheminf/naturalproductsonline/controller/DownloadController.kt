package de.unijena.cheminf.naturalproductsonline.controller


import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.core.io.Resource
import org.springframework.core.io.ResourceLoader
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class DownloadController(@Qualifier("webApplicationContext") val resourceLoader: ResourceLoader) {

    @GetMapping("/download/sdf")
    fun downloadFile(): ResponseEntity<Resource> {
        val resource: Resource = resourceLoader.getResource("classpath:static/np.sdf")

        val headers = HttpHeaders()
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=COCONUT_DB.sdf")

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.valueOf("chemical/x-mdl-sdfile"))
                .body(resource)
    }

}

