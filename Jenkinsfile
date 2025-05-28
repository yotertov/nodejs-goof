pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')  // your SonarCloud token stored in Jenkins credentials
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/greenboy106/8.2CDevSecOps.git',
                        credentialsId: 'github-creds'
                    ]]
                ])
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Unit & Integration Tests') {
            steps {
                sh 'npm test || true'  // continue even if tests fail
            }
        }
        stage('Static Code Analysis') {
            steps {
                echo 'Static analysis placeholder - add your tool here'
            }
        }
        stage('Security Scan') {
            steps {
                sh 'npm audit --audit-level=low || true'
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo 'Deploying to staging environment...'
                // Add your real deploy commands here
            }
        }
        stage('Smoke Tests on Staging') {
            steps {
                echo 'Running smoke tests on staging...'
                // Add real smoke test commands here
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production environment...'
                // Add your real deploy commands here
            }
        }
        stage('SonarCloud Analysis') {
            steps {
                sh '''
                # Download SonarScanner CLI (skip if already downloaded)
                if [ ! -d sonar-scanner-4.8.0.2856-linux ]; then
                  wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-linux.zip
                  unzip sonar-scanner-cli-4.8.0.2856-linux.zip
                fi

                # Run SonarScanner with environment variable for token
                ./sonar-scanner-4.8.0.2856-linux/bin/sonar-scanner \
                  -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }
    }
}
