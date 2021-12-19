pipeline {
  agent any
  //tools {nodejs "latest"}
  stages {
    stage('build') {
      steps {
        bat 'docker-compose up'
      }
    }
    stage('test') {
      steps {
        bat 'npm test'
      }
    }
  }
}