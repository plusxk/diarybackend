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
            bat 'docker tag dairy-docker_app steven0103/docker_app'
            bat 'docker tag mongo steven0103/mongo'
            bat 'docker tag mongo-express steven0103/mongo-express'
            bat 'docker push steven0103/docker_app:latest'
            bat 'docker push steven0103/mongo:latest'
            bat 'docker push steven0103/mongo-express:latest'
        }
    }
    post {
        always {
            bat 'docker-compose down'
        }
    }
  }
}