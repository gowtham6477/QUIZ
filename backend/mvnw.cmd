@ECHO OFF
SETLOCAL

SET BASEDIR=%~dp0
SET BASEDIR_STRIPPED=%BASEDIR:~0,-1%
SET WRAPPER_JAR=%BASEDIR%\.mvn\wrapper\maven-wrapper.jar
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

IF "%JAVA_HOME%"=="" (
  SET JAVA_EXE=java
) ELSE (
  SET JAVA_EXE=%JAVA_HOME%\bin\java
)

IF NOT EXIST "%WRAPPER_JAR%" (
  IF NOT EXIST "%BASEDIR%\.mvn\wrapper\MavenWrapperDownloader.java" (
    ECHO Missing MavenWrapperDownloader.java
    EXIT /B 1
  )
  %JAVA_EXE% "%BASEDIR%\.mvn\wrapper\MavenWrapperDownloader.java" "%BASEDIR_STRIPPED%"
)

%JAVA_EXE% -classpath "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%BASEDIR_STRIPPED%" %WRAPPER_LAUNCHER% %*
ENDLOCAL
