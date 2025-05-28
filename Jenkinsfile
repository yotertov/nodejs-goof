pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/greenboy106/8.2CDevSecOps.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || true'
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Code Analysis') {
            steps {
                sh 'npm run lint || echo "Code analysis placeholder"'
            }
        }

        stage('Security Scan') {
            steps {
                sh 'npm audit || true'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'echo "Deploying application to staging server - placeholder"'
            }
        }

        stage('Integration Tests on Staging') {
            steps {
                sh 'echo "Running integration tests on staging - placeholder"'
            }
        }

        stage('Deploy to Production') {
            steps {
                sh 'echo "Deploying application to production server - placeholder"'
            }
        }

        stage('Generate Coverage Report') {
            steps {
                sh 'npm run coverage || true'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                script {
                    sh '''
                    set -ex
                    curl -O https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.1.0.4889-linux-aarch64.zip
                    unzip sonar-scanner-cli-7.1.0.4889-linux-aarch64.zip
                    chmod +x sonar-scanner-cli-7.1.0.4889-linux-aarch64/bin/sonar-scanner
                    ./sonar-scanner-cli-7.1.0.4889-linux-aarch64/bin/sonar-scanner \
                      -Dsonar.projectKey=e16a4a978fab88d437078b4b4252d9dd91e1f0a9 \
                      -Dsonar.organization=greenboy106 \
                      -Dsonar.host.url=https://sonarcloud.io \
                      -Dsonar.login=${SONAR_TOKEN} \
                      -Dsonar.sources=. \
                      -Dsonar.exclusions=node_modules/**,test/**
                    '''
                }
            }
        }
    }
}
