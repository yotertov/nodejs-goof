pipeline {
    agent any
    
    environment {
        SONAR_TOKEN = credentials('SONAR_TOKEN') // securely inject SonarCloud token
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/your_github_username/8.2CDevSecOps.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test || true'  // continue even if tests fail
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
            sh '''
            # Download SonarScanner CLI for macOS (Intel/M1 compatible)
            curl -sSLo sonar-scanner.zip https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-macosx.zip
            
            # Unzip (overwrite if exists)
            unzip -o sonar-scanner.zip
            
            # Run SonarScanner
            ./sonar-scanner-4.8.0.2856-macosx/bin/sonar-scanner \
              -Dsonar.projectKey=your_project_key \
              -Dsonar.organization=your_organization_name \
              -Dsonar.host.url=https://sonarcloud.io \
              -Dsonar.login=$SONAR_TOKEN \
              -Dsonar.sources=. \
              -Dsonar.exclusions=node_modules/**,test/** \
              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
            '''
        }
    }
}

    }
}
