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
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test || true' 
            }
        }
        
        stage('Generate Coverage Report') {
            steps {
                sh 'npm run coverage || true'
            }
        }
        
        stage('NPM Audit (Security Scan)') {
            steps {
                sh 'npm audit || true'
            }
        }
        stage('SonarCloud Analysis') {
  steps {
    script {
      sh """
        curl -O https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-7.1.0.4889-linux-x86.zip
        unzip sonar-scanner-cli-7.1.0.4889-linux-x86.zip
        chmod +x sonar-scanner-cli-7.1.0.4889-linux-x86/bin/sonar-scanner
        ./sonar-scanner-cli-7.1.0.4889-linux-x86/bin/sonar-scanner \
          -Dsonar.projectKey=your_project_key \
          -Dsonar.organization=your_org \
          -Dsonar.host.url=https://sonarcloud.io \
          -Dsonar.login=${SONAR_TOKEN} \
          -Dsonar.sources=. \
          -Dsonar.exclusions=node_modules/**,test/**
      """
    }
  }
}

    }
}
