import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

public class MavenWrapperDownloader {
    private static final String WRAPPER_VERSION = "3.2.0";
    private static final String DEFAULT_DOWNLOAD_URL =
            "https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/" + WRAPPER_VERSION +
            "/maven-wrapper-" + WRAPPER_VERSION + ".jar";

    public static void main(String[] args) {
        System.out.println("- Downloader started");
        File baseDirectory = new File(args[0]);
        System.out.println("- Using base directory: " + baseDirectory.getAbsolutePath());
        File wrapperJar = new File(baseDirectory, ".mvn/wrapper/maven-wrapper.jar");
        if (wrapperJar.exists()) {
            System.out.println("- Wrapper jar already exists, skipping download");
            return;
        }
        String downloadUrl = DEFAULT_DOWNLOAD_URL;
        try {
            downloadFileFromURL(downloadUrl, wrapperJar);
            System.out.println("- Downloaded maven-wrapper.jar");
        } catch (Exception e) {
            System.out.println("- Error downloading maven-wrapper.jar");
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void downloadFileFromURL(String urlString, File destination) throws IOException {
        URL website = new URL(urlString);
        URLConnection connection = website.openConnection();
        connection.setReadTimeout(10000);
        connection.setConnectTimeout(10000);
        try (InputStream inputStream = connection.getInputStream();
             FileOutputStream outputStream = new FileOutputStream(destination)) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }
    }
}
