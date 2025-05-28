pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
              sh '''
                snyk auth $SNYK_TOKEN
                npm test
              '''
                }
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                sh '''
                    curl -LO https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-macosx.zip
                    
                    unzip -o sonar-scanner-cli-4.8.0.2856-macosx.zip
                    
                    ./sonar-scanner-4.8.0.2856-macosx/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }
    }
}
