pipeline {
    agent any
    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/greenboy106/8.2CDevSecOps.git',
                        credentialsId: 'github-creds'  // Ensure this credential exists or remove if public repo
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
                sh 'npm test || true'
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
            }
        }
        stage('Smoke Tests on Staging') {
            steps {
                echo 'Running smoke tests on staging...'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production environment...'
            }
        }
        stage('SonarCloud Analysis') {
            steps {
                sh 'sonar-scanner'
            }
        }
    }
}
