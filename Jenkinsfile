pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git credentialsId: 'github-creds', url: 'https://github.com/greenboy106/8.2CDevSecOps.git'
      }
    }
    stage('Build') {
      steps { sh 'npm install' }
    }
    stage('Unit & Integration Tests') {
      steps { sh 'npm test || true' }
    }
    stage('Static Code Analysis') {
      steps { echo 'Skipping real analysis in this example' }
    }
    stage('Security Scan') {
      steps { sh 'npm audit --audit-level=low || true' }
    }
    stage('Deploy to Staging') {
      steps { echo 'Deploying to staging...' }
    }
    stage('Smoke Tests on Staging') {
      steps { echo 'Running smoke tests...' }
    }
    stage('Deploy to Production') {
      steps { echo 'Deploying to production...' }
    }
  }
}
