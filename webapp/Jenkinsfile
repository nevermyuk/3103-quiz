pipeline {
    agent any
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Checkout SCM') {
            steps {
                git branch:'main', url:'https://github.com/nevermyuk/3103-quiz-webapp.git'
            }
        }

        stage('OWASP DependencyCheck') {
            steps {
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'Default'
            }
        }

        stage('Code Quality Check via SonarQube') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=OWASP -Dsonar.sources=."
                    }
                }
            }
        }

        stage('Unit Test') {
            agent {
				docker {
							image 'node:16-alpine'
				}
			}
            steps {
                sh '''
                    npm install
                    npm run test
                '''
            }
            post{
                always {
                    junit checksName: 'Jest Tests', testResults: 'junit.xml'
                }
            }
        }
    }
    post {
        success {
            dependencyCheckPublisher pattern: 'dependency-check-report.xml'
        }
        always {
                        recordIssues enabledForFailure: true, tools: [sonarQube()]
        }

    }
}
