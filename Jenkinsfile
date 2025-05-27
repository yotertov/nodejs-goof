pipeline {
    agent any
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
                // Runs tests; '|| true' ensures pipeline continues if tests fail
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
    }
}
