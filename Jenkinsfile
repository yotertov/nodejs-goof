pipeline {
  agent any

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
  }

  post {
    always {
      emailext(
        subject: "Jenkins Build - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        body: """
        Hello,

        Jenkins has completed a build for the project: ${env.JOB_NAME}
        Result: ${currentBuild.currentResult}

        You can view the full console output here:
        ${env.BUILD_URL}console

        Regards,
        Jenkins Server
        """,
        to: "giabao157248@gmail.com"
      )
        } catch (e) {
      echo "Failed to send email: ${e.message}"
    }
  }
}
}
