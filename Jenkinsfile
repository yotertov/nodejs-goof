pipeline {
    agent any

    environment {
        SONAR_TOKEN = credentials('sonar-token-id') // Replace with your Jenkins credential ID
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
                sh 'npm test'
            }
        }

        stage('SonarCloud Analysis') {
            steps {
                sh '''
                    # Download SonarScanner CLI for macOS
                    curl -LO https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-macosx.zip
                    
                    # Unzip scanner
                    unzip -o sonar-scanner-cli-4.8.0.2856-macosx.zip
                    
                    # Run sonar-scanner with your token
                    ./sonar-scanner-4.8.0.2856-macosx/bin/sonar-scanner -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }
    }
}
