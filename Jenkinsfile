pipeline {
  agent any
  /*environment {
        // Specify your environment variables.
        APP_VERSION = '1'
    }*/
  stages {
    stage('build') {
      steps {
        bat 'docker-compose up -d'
        bat 'npm install'
      }
    }
    stage('test') {
      steps {
        echo 'Unit tests'
        bat 'npm test'
      }
    }
    stage('Push') {
        steps {
            echo 'Deploying docker images'
            bat 'docker tag diary-docker_app steven0103/diary-docker_app'
            bat 'docker push steven0103/diary-docker_app:latest'
        }
    }
  }
  post {
        always {
            bat 'docker-compose down'
        }
    }
}