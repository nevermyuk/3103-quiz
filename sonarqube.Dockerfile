FROM sonarqube:latest

USER root
RUN apk --no-cache add nodejs
USER sonarqube