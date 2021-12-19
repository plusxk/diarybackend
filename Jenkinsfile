pipeline {
  agent any
  //tools {nodejs "latest"}
  stages {
    stage('build') {
      steps {
        bat 'docker-compose up -d'
      }
    }
    stage('test') {
      steps {
        bat 'npm test'
      }
    }
  }
}